<script>
  let { actor } = $props();
  let crew = $derived(actor.system.crew ?? []);
</script>

<div class="p-3">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Crew</div>
  {#if crew.length === 0}
    <p class="text-xs text-slate-500 italic">No crew assigned.</p>
  {:else}
    {#each crew as member}
      <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
        <span class="text-slate-200">{member.actorId}</span>
        <span class="text-slate-400">{member.role}</span>
      </div>
    {/each}
  {/if}

  {#if actor.system.passengerCapacity > 0}
    <div class="mt-2 text-xs text-slate-400">
      Passenger capacity: {actor.system.passengerCapacity}
    </div>
  {/if}
</div>
