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

  let pilotActor = $derived(
    showPilot && actor.system.pilotId
      ? game.actors.get(actor.system.pilotId)
      : null
  );

  let pilotIdInput = $state("");

  let availablePilots = $derived(
    showPilot
      ? game.actors
          .filter(a => a.id !== actor.id && a.type === "character")
          .sort((a, b) => a.name.localeCompare(b.name))
      : []
  );

  function openPilotSheet() {
    if (pilotActor) pilotActor.sheet.render(true);
  }

  async function linkPilot() {
    if (!pilotIdInput) return;
    await actor.update({ "system.pilotId": pilotIdInput });
    pilotIdInput = "";
  }

  async function unlinkPilot() {
    await actor.update({ "system.pilotId": "" });
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
      {#if pilotActor}
        <div class="flex flex-col gap-1">
          <span class="text-xs text-slate-200">{pilotActor.name}</span>
          <div class="flex gap-1">
            <button type="button"
              class="px-1.5 py-0.5 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600"
              onclick={openPilotSheet}
            >Open</button>
            <button type="button"
              class="px-1.5 py-0.5 bg-slate-700 text-slate-300 rounded border-0 cursor-pointer text-xs hover:bg-slate-600"
              onclick={unlinkPilot}
            >Unlink</button>
          </div>
        </div>
      {:else}
        <div class="flex flex-col gap-1">
          <span class="text-xs text-slate-400">No pilot linked</span>
          <select
            class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"
            bind:value={pilotIdInput}
          >
            <option value="">— Select Pilot —</option>
            {#each availablePilots as p}
              <option value={p.id}>{p.name}</option>
            {/each}
          </select>
          <button type="button"
            class="px-1.5 py-0.5 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600 self-start"
            onclick={linkPilot}
          >Link</button>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Derived Stats -->
  <DerivedStats
    derived={actor.system.derived}
    {showEP}
    {showCV}
  />
</div>
