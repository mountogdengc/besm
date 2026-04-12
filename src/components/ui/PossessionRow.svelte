<script>
  let { possession, actor } = $props();

  let linkedAttrName = $derived(() => {
    if (!possession.system.linkedAttributeId) return null;
    const attr = [...actor.items].find(i => i.id === possession.system.linkedAttributeId);
    return attr?.name ?? null;
  });

  function openSheet() {
    possession.sheet.render(true);
  }
</script>

<div
  class="flex items-center gap-3 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-slate-200 font-medium">{possession.name}</span>

  <span class="px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 text-xs">{possession.system.category}</span>

  <span class="px-1.5 py-0.5 rounded text-xs {possession.system.isMechanical ? 'bg-blue-900 text-blue-300' : 'bg-slate-700 text-slate-400'}">
    {possession.system.isMechanical ? 'mechanical' : 'flavor'}
  </span>

  {#if possession.system.isMechanical && possession.system.budgetCost > 0}
    <span class="text-slate-400">Cost: {possession.system.budgetCost}</span>
  {/if}

  {#if linkedAttrName()}
    <span class="text-slate-500 italic">via {linkedAttrName()}</span>
  {/if}
</div>
