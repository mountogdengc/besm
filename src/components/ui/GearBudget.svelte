<script>
  let { actor } = $props();

  let gearAttr = $derived(
    [...actor.items].find(i => i.type === "attribute" && i.name === "Gear")
  );

  let gearBudgetPerLevel = $state(5);

  $effect(() => {
    try {
      gearBudgetPerLevel = game.settings.get("besm", "gearBudgetPerLevel") ?? 5;
    } catch {}
  });

  let budget = $derived(gearAttr ? gearAttr.system.effectiveLevel * gearBudgetPerLevel : 0);

  let spent = $derived(
    gearAttr
      ? [...actor.items]
          .filter(i => i.type === "possession" && i.system.isMechanical && i.system.linkedAttributeId === gearAttr.id)
          .reduce((sum, p) => sum + p.system.budgetCost, 0)
      : 0
  );

  let remaining = $derived(budget - spent);
  let overBudget = $derived(remaining < 0);
</script>

{#if gearAttr}
  <div class="mx-2 my-2 p-2 border border-slate-700 rounded bg-slate-800/50">
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Gear Budget</div>
    <div class="flex gap-4 text-xs">
      <span class="text-slate-400">Budget: <span class="text-slate-100">{budget}</span></span>
      <span class="text-slate-400">Spent: <span class="text-slate-100">{spent}</span></span>
      <span class="text-slate-400">Remaining: <span class="font-bold {overBudget ? 'text-red-400' : 'text-emerald-400'}">{remaining}</span></span>
    </div>
  </div>
{/if}
