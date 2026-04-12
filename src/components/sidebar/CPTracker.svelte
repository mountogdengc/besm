<script>
  let { total, spent, remaining } = $props();
  let overBudget = $derived(remaining < 0);
</script>

<div class="border-t border-slate-700 pt-2">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Character Points</div>
  <div class="flex justify-between text-xs">
    <span class="text-slate-400">Total</span>
    <span class="text-slate-100">{total}</span>
  </div>
  <div class="flex justify-between text-xs">
    <span class="text-slate-400">Spent</span>
    <span class="text-slate-100">{spent}</span>
  </div>
  <div class="flex justify-between text-xs">
    <span class="text-slate-400">Remaining</span>
    <span class="font-bold {overBudget ? 'text-red-400' : 'text-emerald-400'}">{remaining}</span>
  </div>
</div>
