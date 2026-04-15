<script>
  let { actor } = $props();

  let badges = $derived(actor.system.appliedTemplates ?? []);

  const typeColors = {
    race: "bg-emerald-900 text-emerald-300",
    class: "bg-blue-900 text-blue-300",
    size: "bg-amber-900 text-amber-300",
    bundle: "bg-purple-900 text-purple-300",
    powerpack: "bg-cyan-900 text-cyan-300",
  };
</script>

{#if badges.length > 0}
  <div class="flex flex-wrap gap-1 px-3 py-1.5 border-b border-slate-700">
    {#each badges as badge}
      <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs {typeColors[badge.type] ?? 'bg-slate-700 text-slate-300'}">
        <span class="font-medium capitalize">{badge.type}:</span>
        {badge.name}
      </span>
    {/each}
  </div>
{/if}
