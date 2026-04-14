<script>
  let { actor } = $props();

  let crew = $derived(actor.system.crew ?? []);

  let passengerCount = $derived(
    crew.filter(m => m.role === "passenger").length
  );

  let newCrewId = $state("");
  let newCrewRole = $state("crew");

  function resolveActor(actorId) {
    return game.actors.get(actorId);
  }

  function cleanActorId(input) {
    let id = input.trim();
    if (id.startsWith("Actor.")) id = id.slice(6);
    return id;
  }

  async function addCrew() {
    const id = cleanActorId(newCrewId);
    if (!id) return;
    const resolved = game.actors.get(id);
    if (!resolved) {
      ui.notifications.warn("Actor not found with that ID.");
      return;
    }
    const updated = [...crew, { actorId: id, role: newCrewRole }];
    await actor.update({ "system.crew": updated });
    newCrewId = "";
    newCrewRole = "crew";
  }

  async function removeCrew(index) {
    const updated = crew.filter((_, i) => i !== index);
    await actor.update({ "system.crew": updated });
  }

  async function changeRole(index, role) {
    const updated = crew.map((m, i) => i === index ? { ...m, role } : m);
    await actor.update({ "system.crew": updated });
  }

  function openCrewSheet(actorId) {
    const crewActor = game.actors.get(actorId);
    if (crewActor) crewActor.sheet.render(true);
  }
</script>

<div class="p-3">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Crew</div>

  {#if crew.length === 0}
    <p class="text-xs text-slate-500 italic mb-3">No crew assigned.</p>
  {:else}
    {#each crew as member, i}
      {@const crewActor = resolveActor(member.actorId)}
      <div class="flex items-center gap-2 px-2 py-1.5 border-b border-slate-800 text-xs">
        <span class="text-slate-200 flex-1">
          {crewActor?.name ?? "Unknown Actor"}
        </span>
        <select
          class="bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-0.5"
          value={member.role}
          onchange={(e) => changeRole(i, e.target.value)}
        >
          <option value="crew">Crew</option>
          <option value="pilot">Pilot</option>
          <option value="gunner">Gunner</option>
          <option value="passenger">Passenger</option>
        </select>
        <button type="button"
          class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs"
          onclick={() => openCrewSheet(member.actorId)}
        >Open</button>
        <button type="button"
          class="text-red-400 hover:text-red-200 bg-transparent border-0 cursor-pointer text-xs"
          onclick={() => removeCrew(i)}
        >Remove</button>
      </div>
    {/each}
  {/if}

  {#if actor.system.passengerCapacity > 0}
    <div class="mt-2 mb-3 text-xs text-slate-400">
      Passengers: {passengerCount} / {actor.system.passengerCapacity}
    </div>
  {/if}

  <!-- Add Crew -->
  <div class="border-t border-slate-700 pt-2 mt-2">
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Add Crew Member</div>
    <div class="flex gap-2 items-end">
      <div class="flex-1">
        <input
          class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"
          placeholder="Actor ID..."
          bind:value={newCrewId}
        />
      </div>
      <select
        class="bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"
        bind:value={newCrewRole}
      >
        <option value="crew">Crew</option>
        <option value="pilot">Pilot</option>
        <option value="gunner">Gunner</option>
        <option value="passenger">Passenger</option>
      </select>
      <button type="button"
        class="px-2 py-1 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600"
        onclick={addCrew}
      >Add</button>
    </div>
  </div>
</div>
