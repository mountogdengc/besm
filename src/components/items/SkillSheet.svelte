<script>
  let { document: itemDocument } = $props();
  let item = $state(itemDocument);
  let newSpecName = $state("");

  $effect(() => {
    const hookId = Hooks.on("updateItem", (updatedItem) => {
      if (updatedItem.id === item.id) item = updatedItem;
    });
    return () => Hooks.off("updateItem", hookId);
  });

  function update(path, value) {
    item.update({ [path]: value });
  }

  let specialisations = $derived(item.system.specialisations ?? []);

  function addSpecialisation() {
    if (!newSpecName.trim()) return;
    const specs = [...specialisations];
    const isFree = specs.length === 0;
    specs.push({ name: newSpecName.trim(), isFree, spCost: isFree ? 0 : 1 });
    item.update({ "system.specialisations": specs });
    newSpecName = "";
  }

  function removeSpecialisation(index) {
    let specs = specialisations.filter((_, i) => i !== index);
    // If the free one was removed and others exist, make the first one free
    if (specs.length > 0 && !specs.some(s => s.isFree)) {
      specs[0] = { ...specs[0], isFree: true, spCost: 0 };
    }
    item.update({ "system.specialisations": specs });
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
      <label class="text-xs text-slate-500 uppercase">Rank</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.rank}
        onchange={(e) => update("system.rank", Number(e.target.value))}
        min="0"
      />
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Cost Class</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.costClass}
        onchange={(e) => update("system.costClass", e.target.value)}
      >
        <option value="framework">Framework (1 SP)</option>
        <option value="adventure">Adventure (2 SP)</option>
        <option value="genre">Genre (3 SP)</option>
      </select>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Linked Stat</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.linkedStat}
        onchange={(e) => update("system.linkedStat", e.target.value)}
      >
        <option value="body">Body</option>
        <option value="mind">Mind</option>
        <option value="soul">Soul</option>
        <option value="bodyMind">Body+Mind</option>
        <option value="bodySoul">Body+Soul</option>
        <option value="mindSoul">Mind+Soul</option>
        <option value="avg">Average</option>
      </select>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">SP Cost</label>
      <span class="block text-sm text-slate-300 p-1">{item.system.totalSpCost}</span>
    </div>
  </div>

  <!-- Flags -->
  <div class="flex gap-3 text-xs">
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isFlavor}
        onchange={(e) => update("system.isFlavor", e.target.checked)} />
      Flavor (no SP cost)
    </label>
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isGeniusSkill}
        onchange={(e) => update("system.isGeniusSkill", e.target.checked)} />
      Genius Skill
    </label>
  </div>

  <!-- Specialisations -->
  <div>
    <div class="text-xs text-slate-500 uppercase mb-1">Specialisations ({specialisations.length})</div>
    {#if specialisations.length === 0}
      <p class="text-xs text-slate-500 italic mb-2">None. First specialisation is free.</p>
    {:else}
      {#each specialisations as spec, i}
        <div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs">
          <span class="text-slate-200">{spec.name}</span>
          <span class="{spec.isFree ? 'text-emerald-400' : 'text-amber-400'}">
            {spec.isFree ? 'free' : `${spec.spCost} SP`}
          </span>
          <button type="button"  class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs"
            onclick={() => removeSpecialisation(i)}>Remove</button>
        </div>
      {/each}
    {/if}
    <div class="flex gap-2 mt-2">
      <input
        class="flex-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        placeholder="Specialisation name..."
        bind:value={newSpecName}
        onkeydown={(e) => { if (e.key === "Enter") addSpecialisation(); }}
      />
      <button
        class="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs border-0 cursor-pointer hover:bg-slate-600"
        onclick={addSpecialisation}
      >Add</button>
    </div>
  </div>

  <!-- Description -->
  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>
</div>
