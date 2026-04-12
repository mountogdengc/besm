<script>
  let { warnings = [] } = $props();
</script>

{#if warnings.length > 0}
  <div class="mx-3 my-2 p-2 border border-amber-600 rounded bg-amber-950/30">
    <div class="text-xs font-bold text-amber-400">
      Benchmark Recommendations ({warnings.length})
    </div>
    <ul class="mt-1 text-xs text-amber-300 list-none p-0 m-0">
      {#each warnings as w}
        <li class="py-0.5">{w}</li>
      {/each}
    </ul>
    <p class="mt-1 text-xs text-stone-500 italic">
      These are recommendations, not restrictions.
    </p>
  </div>
{/if}
