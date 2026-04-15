<script>
  let { document: itemDocument } = $props();
  let version = $state(0);
  let item = $derived.by(() => { version; return itemDocument; });

  $effect(() => {
    const hookId = Hooks.on("updateItem", (updatedItem) => {
      if (updatedItem.id === itemDocument.id) version++;
    });
    return () => Hooks.off("updateItem", hookId);
  });

  function update(path, value) {
    itemDocument.update({ [path]: value });
  }

  let entries = $derived.by(() => { version; return itemDocument.system.entries ?? []; });
  let isPowerPack = $derived(item.system.templateType === "powerpack");
  let isBundle = $derived(item.system.templateType === "bundle");
  let isCharacterTemplate = $derived(["race", "class", "size"].includes(item.system.templateType));

  function removeEntry(index) {
    const newEntries = entries.filter((_, i) => i !== index);
    itemDocument.update({ "system.entries": newEntries });
  }

  function updateEntryLevel(index, value) {
    const newEntries = entries.map((e, i) => {
      if (i !== index) return e;
      const systemData = { ...e.systemData };
      if (e.itemType === "attribute") {
        systemData.purchasedLevel = value;
      } else if (e.itemType === "defect") {
        systemData.rankLevel = value;
      } else if (e.itemType === "enhancement" || e.itemType === "limiter") {
        systemData.levels = value;
      }
      return { ...e, systemData };
    });
    itemDocument.update({ "system.entries": newEntries });
  }

  async function handleDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch { return; }

    if (data.type !== "Item") return;
    const droppedItem = await fromUuid(data.uuid);
    if (!droppedItem) return;

    // Power packs accept enhancements and limiters
    if (isPowerPack) {
      if (["enhancement", "limiter"].includes(droppedItem.type)) {
        const newEntries = [...entries, {
          entryType: "item",
          name: droppedItem.name,
          itemType: droppedItem.type,
          systemData: { levels: droppedItem.system.levels ?? 1 },
        }];
        itemDocument.update({ "system.entries": newEntries });
      }
      return;
    }

    // Character templates and bundles accept attributes, defects, and nested templates
    if (droppedItem.type === "besm4eTemplate") {
      const newEntries = [...entries, {
        entryType: "template",
        templateId: data.uuid,
        templateName: droppedItem.name,
      }];
      itemDocument.update({ "system.entries": newEntries });
    } else if (["attribute", "defect"].includes(droppedItem.type)) {
      const systemData = {};
      if (droppedItem.type === "attribute") {
        systemData.baseCostPerLevel = droppedItem.system.baseCostPerLevel;
        systemData.purchasedLevel = droppedItem.system.purchasedLevel;
        if (droppedItem.system.isWeapon) systemData.isWeapon = true;
        if (droppedItem.system.isSkillGroup) {
          systemData.isSkillGroup = true;
          systemData.skillGroupCategory = droppedItem.system.skillGroupCategory;
        }
      } else if (droppedItem.type === "defect") {
        systemData.rankLevel = droppedItem.system.rankLevel ?? 1;
        systemData.cpGranted = droppedItem.system.cpGranted ?? 1;
      }

      const newEntries = [...entries, {
        entryType: "item",
        name: droppedItem.name,
        itemType: droppedItem.type,
        systemData,
      }];
      itemDocument.update({ "system.entries": newEntries });
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full"
  ondragover={handleDragOver}
  ondrop={handleDrop}
>
  <!-- Name -->
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => itemDocument.update({ name: e.target.value })}
  />

  <!-- Core Fields -->
  <div class="grid grid-cols-2 gap-2">
    <div>
      <label class="text-xs text-slate-500 uppercase">Template Type</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.templateType}
        onchange={(e) => update("system.templateType", e.target.value)}
      >
        <option value="race">Race</option>
        <option value="class">Class</option>
        <option value="size">Size</option>
        <option value="bundle">Power Bundle</option>
        <option value="powerpack">Power Pack</option>
      </select>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Point Total (info only)</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.pointTotal}
        onchange={(e) => update("system.pointTotal", Number(e.target.value))}
      />
    </div>
  </div>

  {#if item.system.templateType === "size"}
    <div>
      <label class="text-xs text-slate-500 uppercase">Size Rank</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.sizeRank ?? 0}
        onchange={(e) => update("system.sizeRank", Number(e.target.value))}
      />
    </div>
  {/if}

  {#if isBundle || isPowerPack}
    <div>
      <label class="text-xs text-slate-500 uppercase">Tradition</label>
      <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        placeholder="e.g. Conjuration, Divine, Psi, Ritualist..."
        value={item.system.tradition ?? ""}
        onchange={(e) => update("system.tradition", e.target.value)}
      />
    </div>
  {/if}

  <!-- Stat Modifiers (character templates and bundles) -->
  {#if isCharacterTemplate || isBundle}
    <div>
      <div class="text-xs text-slate-500 uppercase mb-1">Stat Modifiers</div>
      <div class="grid grid-cols-3 gap-2">
        <div>
          <label class="text-xs text-slate-400">Body</label>
          <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1 text-center"
            value={item.system.statModifiers?.body ?? 0}
            onchange={(e) => update("system.statModifiers.body", Number(e.target.value))}
          />
        </div>
        <div>
          <label class="text-xs text-slate-400">Mind</label>
          <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1 text-center"
            value={item.system.statModifiers?.mind ?? 0}
            onchange={(e) => update("system.statModifiers.mind", Number(e.target.value))}
          />
        </div>
        <div>
          <label class="text-xs text-slate-400">Soul</label>
          <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1 text-center"
            value={item.system.statModifiers?.soul ?? 0}
            onchange={(e) => update("system.statModifiers.soul", Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  {/if}

  <!-- Description -->
  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>

  <!-- Entries -->
  <div>
    <div class="text-xs text-slate-500 uppercase mb-1">
      {isPowerPack ? "Enhancements & Limiters" : "Entries"} ({entries.length})
    </div>
    <p class="text-xs text-slate-500 italic mb-2">
      {#if isPowerPack}
        Drop enhancements and limiters here. Drop this pack onto an attribute to apply all at once.
      {:else}
        Drop attributes, defects, or other templates here to add them.
      {/if}
    </p>

    {#each entries as entry, i}
      <div class="flex items-center gap-2 px-2 py-1.5 border-b border-slate-800 text-xs">
        {#if entry.entryType === "item"}
          {#if entry.itemType === "enhancement"}
            <span class="px-1 py-0.5 rounded bg-sky-900 text-sky-300 text-xs">Enh</span>
            <span class="text-slate-200 flex-1">{entry.name}</span>
            <label class="text-slate-400">×</label>
            <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs"
              value={entry.systemData?.levels ?? 1}
              min="1"
              onchange={(e) => updateEntryLevel(i, Number(e.target.value))}
            />
          {:else if entry.itemType === "limiter"}
            <span class="px-1 py-0.5 rounded bg-violet-900 text-violet-300 text-xs">Lim</span>
            <span class="text-slate-200 flex-1">{entry.name}</span>
            <label class="text-slate-400">×</label>
            <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs"
              value={entry.systemData?.levels ?? 1}
              min="1"
              onchange={(e) => updateEntryLevel(i, Number(e.target.value))}
            />
          {:else if entry.itemType === "attribute"}
            <span class="px-1 py-0.5 rounded bg-blue-900 text-blue-300 text-xs">Attr</span>
            <span class="text-slate-200 flex-1">{entry.name}</span>
            <label class="text-slate-400">Lv</label>
            <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs"
              value={entry.systemData?.purchasedLevel ?? 1}
              min="0"
              onchange={(e) => updateEntryLevel(i, Number(e.target.value))}
            />
            <span class="text-slate-500">{entry.systemData?.baseCostPerLevel ?? 0} CP/Lv</span>
          {:else}
            <span class="px-1 py-0.5 rounded bg-red-900 text-red-300 text-xs">Defect</span>
            <span class="text-slate-200 flex-1">{entry.name}</span>
            <label class="text-slate-400">Rank</label>
            <input type="number" class="w-10 text-center bg-slate-800 border border-slate-700 rounded text-slate-100 p-0.5 text-xs"
              value={entry.systemData?.rankLevel ?? 1}
              min="1"
              onchange={(e) => updateEntryLevel(i, Number(e.target.value))}
            />
          {/if}
        {:else}
          <span class="px-1 py-0.5 rounded bg-purple-900 text-purple-300 text-xs">Template</span>
          <span class="text-slate-200 flex-1">{entry.templateName}</span>
        {/if}
        <button type="button"
          class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs p-0"
          onclick={() => removeEntry(i)}
        >×</button>
      </div>
    {/each}
  </div>
</div>
