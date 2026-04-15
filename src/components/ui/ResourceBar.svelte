<script>
  let { label, current, max, onUpdate } = $props();
  let editValue = $state(current);

  function commit() {
    const val = Math.max(0, Math.min(max, Math.floor(editValue)));
    if (val !== current) onUpdate(val);
  }

  $effect(() => {
    editValue = current;
  });
</script>

<div class="flex items-center gap-2">
  <span class="text-xs text-slate-400 whitespace-nowrap">{label}</span>
  <input
    type="number"
    class="w-12 text-center text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 p-0.5"
    bind:value={editValue}
    onblur={commit}
    min="0"
    {max}
  />
  <span class="text-xs text-slate-500">/ {max}</span>
</div>
