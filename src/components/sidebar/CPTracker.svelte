<script>
  let { actor } = $props();
  let overBudget = $derived(actor.system.cpRemaining < 0);
  let hasPowerLevel = $derived("powerLevel" in actor.system);

  const powerLevelChoices = [
    { value: "", label: "Use System Default" },
    { value: "subhuman", label: "Sub-Human (0-24 CP)" },
    { value: "human", label: "Human (25-49 CP)" },
    { value: "adventurer", label: "Adventurer (50-74 CP)" },
    { value: "heroic", label: "Heroic (75-99 CP)" },
    { value: "mythical", label: "Mythical (100-149 CP)" },
    { value: "superhuman", label: "Superhuman (150-199 CP)" },
    { value: "superpowered", label: "Superpowered (200-249 CP)" },
    { value: "godlike", label: "Godlike (250+ CP)" },
  ];

  function updateCpBase(e) {
    actor.update({ "system.cpBase": Number(e.target.value) });
  }

  function updatePowerLevel(e) {
    actor.update({ "system.powerLevel": e.target.value });
  }
</script>

<div class="border-t border-slate-700 pt-2">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Character Points</div>
  <div class="flex justify-between items-center text-xs">
    <span class="text-slate-400">Base CP</span>
    <input type="number"
      class="w-14 text-right text-xs bg-slate-900 border border-slate-700 rounded text-slate-100 p-0.5"
      value={actor.system.cpBase}
      onchange={updateCpBase}
    />
  </div>
  <div class="flex justify-between text-xs">
    <span class="text-slate-400">Total</span>
    <span class="text-slate-100">{actor.system.cpTotal}</span>
  </div>
  <div class="flex justify-between text-xs">
    <span class="text-slate-400">Spent</span>
    <span class="text-slate-100">{actor.system.cpSpent}</span>
  </div>
  <div class="flex justify-between text-xs">
    <span class="text-slate-400">Remaining</span>
    <span class="font-bold {overBudget ? 'text-red-400' : 'text-emerald-400'}">{actor.system.cpRemaining}</span>
  </div>

  {#if hasPowerLevel}
    <div class="mt-2">
      <label class="text-xs text-slate-500 uppercase">Power Level</label>
      <select
        class="w-full bg-slate-900 border border-slate-700 rounded text-xs text-slate-100 p-0.5"
        value={actor.system.powerLevel}
        onchange={updatePowerLevel}
      >
        {#each powerLevelChoices as choice}
          <option value={choice.value}>{choice.label}</option>
        {/each}
      </select>
    </div>
  {/if}
</div>
