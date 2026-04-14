<script>
  let { document: itemDocument } = $props();
  let item = $state(itemDocument);

  $effect(() => {
    const hookId = Hooks.on("updateItem", (updatedItem) => {
      if (updatedItem.id === item.id) item = updatedItem;
    });
    return () => Hooks.off("updateItem", hookId);
  });

  function update(path, value) {
    item.update({ [path]: value });
  }

  let entries = $derived(item.system.entries ?? []);

  function addItemEntry() {
    const newEntries = [...entries, {
      entryType: "item",
      name: "New Attribute",
      itemType: "attribute",
      systemData: { baseCostPerLevel: 1, purchasedLevel: 1 },
    }];
    item.update({ "system.entries": newEntries });
  }

  function addTemplateEntry() {
    const newEntries = [...entries, {
      entryType: "template",
      templateId: "",
      templateName: "Nested Template",
    }];
    item.update({ "system.entries": newEntries });
  }

  function removeEntry(index) {
    const newEntries = entries.filter((_, i) => i !== index);
    item.update({ "system.entries": newEntries });
  }

  function updateEntry(index, field, value) {
    const newEntries = entries.map((e, i) => {
      if (i !== index) return e;
      return { ...e, [field]: value };
    });
    item.update({ "system.entries": newEntries });
  }

  function updateEntrySystemData(index, value) {
    try {
      const parsed = JSON.parse(value);
      const newEntries = entries.map((e, i) => {
        if (i !== index) return e;
        return { ...e, systemData: parsed };
      });
      item.update({ "system.entries": newEntries });
    } catch {
      ui.notifications.warn("Invalid JSON for system data.");
    }
  }
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <!-- Name -->
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => item.update({ name: e.target.value })}
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
    <div class="text-xs text-slate-500 uppercase mb-1">Entries ({entries.length})</div>

    {#each entries as entry, i}
      <div class="border border-slate-700 rounded p-2 mb-2">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold {entry.entryType === 'item' ? 'text-blue-400' : 'text-purple-400'}">
            {entry.entryType === "item" ? "Item" : "Template Ref"}
          </span>
          <button class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs"
            onclick={() => removeEntry(i)}>Remove</button>
        </div>

        {#if entry.entryType === "item"}
          <div class="grid grid-cols-2 gap-1 text-xs">
            <input class="bg-slate-800 border border-slate-700 rounded p-1 text-slate-100"
              placeholder="Name"
              value={entry.name}
              onchange={(e) => updateEntry(i, "name", e.target.value)}
            />
            <select class="bg-slate-800 border border-slate-700 rounded p-1 text-slate-100"
              value={entry.itemType}
              onchange={(e) => updateEntry(i, "itemType", e.target.value)}
            >
              <option value="attribute">Attribute</option>
              <option value="defect">Defect</option>
            </select>
          </div>
          <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 p-1 mt-1 h-12 resize-y font-mono"
            placeholder='{"baseCostPerLevel": 1, "purchasedLevel": 1}'
            value={JSON.stringify(entry.systemData ?? {}, null, 2)}
            onchange={(e) => updateEntrySystemData(i, e.target.value)}
          ></textarea>
        {:else}
          <input class="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-slate-100"
            placeholder="Template UUID"
            value={entry.templateId ?? ""}
            onchange={(e) => updateEntry(i, "templateId", e.target.value)}
          />
          <input class="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-slate-100 mt-1"
            placeholder="Display name"
            value={entry.templateName ?? ""}
            onchange={(e) => updateEntry(i, "templateName", e.target.value)}
          />
        {/if}
      </div>
    {/each}

    <div class="flex gap-2">
      <button class="px-2 py-1 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600"
        onclick={addItemEntry}>Add Item Entry</button>
      <button class="px-2 py-1 bg-purple-700 text-purple-100 rounded border-0 cursor-pointer text-xs hover:bg-purple-600"
        onclick={addTemplateEntry}>Add Template Ref</button>
    </div>
  </div>
</div>
