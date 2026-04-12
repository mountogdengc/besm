<script>
  let { skill } = $props();

  let unavailable = $derived(!skill.system.isAvailable);
  let specialisations = $derived(skill.system.specialisations ?? []);

  function openSheet() {
    skill.sheet.render(true);
  }
</script>

<div
  class="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50 {unavailable ? 'opacity-40 line-through' : ''}"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-slate-200 font-medium {skill.system.isFlavor ? 'italic' : ''}">
    {skill.name}
    {#if skill.system.isFlavor}
      <span class="text-slate-500 no-underline">(flavor)</span>
    {/if}
  </span>

  <span class="text-slate-400">Rank {skill.system.rank}</span>
  <span class="text-slate-500">{skill.system.linkedStat}</span>

  {#each specialisations as spec}
    <span class="inline-flex items-center px-1 py-0.5 rounded text-xs {spec.isFree ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}">
      {spec.name}
      {#if spec.isFree}
        <span class="ml-0.5 text-emerald-500">(free)</span>
      {:else}
        <span class="ml-0.5 text-amber-500">({spec.spCost} SP)</span>
      {/if}
    </span>
  {/each}

  <span class="text-slate-400 ml-auto">{skill.system.totalSpCost} SP</span>
</div>
