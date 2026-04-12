<script>
  let { title, count = 0, headerClass = "", children } = $props();
  let open = $state(true);
</script>

<div class="mb-2">
  <button
    class="flex items-center gap-1.5 w-full py-1.5 cursor-pointer bg-transparent border-0 text-left"
    onclick={() => open = !open}
  >
    <span class="text-slate-500 text-xs">{open ? '▼' : '▶'}</span>
    <span class="text-xs font-bold uppercase tracking-wide {headerClass}">{title}</span>
    {#if count > 0}
      <span class="text-xs text-slate-500">({count})</span>
    {/if}
  </button>
  {#if open}
    {@render children()}
  {/if}
</div>
