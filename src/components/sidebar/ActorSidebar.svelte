<script>
  import StatInput from "./StatInput.svelte";
  import CPTracker from "./CPTracker.svelte";
  import SPTracker from "./SPTracker.svelte";
  import DerivedStats from "./DerivedStats.svelte";
  import { performStatRoll } from "../../rolls/BESMRoll.mjs";

  let {
    actor,
    showSP = false,
    showEP = true,
    showCV = true,
    showPilot = false,
    statsToShow = ["body", "mind", "soul"],
  } = $props();

  const statLabels = { body: "Body", mind: "Mind", soul: "Soul" };

  function updateStat(key, value) {
    actor.update({ [`system.stats.${key}.value`]: value });
  }

  function rollStat(key) {
    performStatRoll(actor, key);
  }
</script>

<div class="w-44 bg-slate-800 p-3 border-r border-slate-700 flex flex-col gap-3 overflow-y-auto">
  <!-- Name -->
  <input
    class="text-base font-bold text-slate-100 bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 w-full p-0.5 rounded"
    value={actor.name}
    onchange={(e) => actor.update({ name: e.target.value })}
  />

  <!-- Stats -->
  <div>
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Stats</div>
    <div class="flex flex-col gap-1.5">
      {#each statsToShow as key}
        {@const stat = actor.system.stats[key]}
        <StatInput
          label={statLabels[key]}
          value={stat.value}
          cpCost={stat.cpCost}
          mode={stat.mode}
          onUpdate={(v) => updateStat(key, v)}
          onRoll={() => rollStat(key)}
        />
      {/each}
    </div>
  </div>

  <!-- CP Tracker -->
  <CPTracker
    total={actor.system.cpTotal}
    spent={actor.system.cpSpent}
    remaining={actor.system.cpRemaining}
  />

  <!-- SP Tracker (character only, point-buy mode) -->
  {#if showSP && actor.system.spPool > 0}
    <SPTracker
      pool={actor.system.spPool}
      spent={actor.system.spSpent}
      remaining={actor.system.spRemaining}
    />
  {/if}

  <!-- Pilot Link (mecha only) -->
  {#if showPilot}
    <div class="border-t border-slate-700 pt-2">
      <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Pilot</div>
      <div class="text-xs text-slate-300">{actor.system.pilotId || "No pilot linked"}</div>
    </div>
  {/if}

  <!-- Derived Stats -->
  <DerivedStats
    derived={actor.system.derived}
    {showEP}
    {showCV}
  />
</div>
