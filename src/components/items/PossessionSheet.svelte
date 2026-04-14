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
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => itemDocument.update({ name: e.target.value })}
  />

  <div>
    <label class="text-xs text-slate-500 uppercase">Category</label>
    <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
      value={item.system.category}
      onchange={(e) => update("system.category", e.target.value)}
    >
      <option value="gear">Gear</option>
      <option value="feature">Feature</option>
      <option value="other">Other</option>
    </select>
  </div>

  <label class="flex items-center gap-1 text-xs text-slate-400">
    <input type="checkbox" checked={item.system.isMechanical}
      onchange={(e) => update("system.isMechanical", e.target.checked)} />
    Mechanical (has budget cost)
  </label>

  {#if item.system.isMechanical}
    <div>
      <label class="text-xs text-slate-500 uppercase">Budget Cost</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.budgetCost}
        onchange={(e) => update("system.budgetCost", Number(e.target.value))}
      />
    </div>
  {/if}

  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>
</div>
