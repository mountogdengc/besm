<script>
  let { label, value, cpCost, mode, onUpdate, onModeChange } = $props();

  function increment() {
    if (mode === "missing" || mode === "zero") return;
    onUpdate(value + 1);
  }

  function decrement() {
    if (mode === "missing" || mode === "zero") return;
    if (value > 0) onUpdate(value - 1);
  }

  function handleInput(e) {
    const val = Math.max(0, Math.floor(Number(e.target.value) || 0));
    onUpdate(val);
  }
</script>

{#if mode !== "missing"}
  <div class="flex items-center justify-between">
    <span class="text-xs text-slate-400 w-9">{label}</span>
    <div class="flex items-center gap-1">
      <button
        class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 disabled:opacity-30"
        onclick={decrement}
        disabled={mode === "zero"}
      >−</button>
      {#if mode === "zero"}
        <span class="w-8 text-center text-sm font-bold text-slate-500">0</span>
      {:else}
        <input
          type="number"
          class="w-8 text-center bg-slate-900 border border-slate-700 text-slate-100 rounded text-sm font-bold p-0.5"
          value={value}
          onchange={handleInput}
          min="0"
        />
      {/if}
      <button
        class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 disabled:opacity-30"
        onclick={increment}
        disabled={mode === "zero"}
      >+</button>
    </div>
    <span class="text-xs text-slate-500 w-8 text-right">{cpCost}cp</span>
  </div>
{/if}
