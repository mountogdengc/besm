<script>
  let { actor } = $props();

  let possessions = $derived(
    [...actor.items].filter(i => i.type === "possession")
  );
</script>

<div class="p-3">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Possessions</div>
  {#if possessions.length === 0}
    <p class="text-xs text-slate-500 italic">No possessions.</p>
  {:else}
    {#each possessions as item}
      <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
        <span class="text-slate-200">{item.name}</span>
        <span class="text-slate-400">{item.system.category}</span>
        <span class="text-xs px-1.5 py-0.5 rounded {item.system.isMechanical ? 'bg-blue-900 text-blue-300' : 'bg-slate-700 text-slate-400'}">
          {item.system.isMechanical ? 'mechanical' : 'flavor'}
        </span>
      </div>
    {/each}
  {/if}
</div>
