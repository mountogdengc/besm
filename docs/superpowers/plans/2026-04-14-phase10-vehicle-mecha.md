# Phase 10 — Vehicle & Mecha Specialized Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade vehicle and mecha sheets with interactive crew management, pilot linking with resolved names and open/link/unlink buttons, and mecha pilot stat fusion for combat values.

**Architecture:** CrewTab rewritten with actor name resolution and CRUD operations. ActorSidebar pilot section upgraded with resolved name and action buttons. MechaData.prepareDerivedData() updated to fuse pilot stats into CV calculation when a pilot is linked.

**Tech Stack:** Svelte 5, Foundry VTT V14

**Spec:** `docs/superpowers/specs/2026-04-14-phase10-vehicle-mecha-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/tabs/CrewTab.svelte` | Rewrite | Interactive crew management |
| `src/components/sidebar/ActorSidebar.svelte` | Modify | Upgrade pilot link section |
| `src/models/actors/MechaData.mjs` | Modify | Pilot stat fusion in prepareDerivedData() |

---

### Task 1: Rewrite CrewTab

**Files:**
- Modify: `src/components/tabs/CrewTab.svelte`

- [ ] **Step 1: Read the current file**

Read `src/components/tabs/CrewTab.svelte`.

- [ ] **Step 2: Rewrite CrewTab.svelte**

Replace the entire file:

```svelte
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

  async function addCrew() {
    if (!newCrewId.trim()) return;
    const resolved = game.actors.get(newCrewId.trim());
    if (!resolved) {
      ui.notifications.warn("Actor not found with that ID.");
      return;
    }
    const updated = [...crew, { actorId: newCrewId.trim(), role: newCrewRole }];
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
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/tabs/CrewTab.svelte
git commit -m "feat: rewrite CrewTab with interactive crew management"
```

---

### Task 2: Upgrade Pilot Link in ActorSidebar

**Files:**
- Modify: `src/components/sidebar/ActorSidebar.svelte`

- [ ] **Step 1: Read the file**

Read `src/components/sidebar/ActorSidebar.svelte`.

- [ ] **Step 2: Update the pilot section**

In the `<script>` block, add after the existing `updateStat` function:

```js
  let pilotActor = $derived(
    showPilot && actor.system.pilotId
      ? game.actors.get(actor.system.pilotId)
      : null
  );

  let pilotIdInput = $state("");

  function openPilotSheet() {
    if (pilotActor) pilotActor.sheet.render(true);
  }

  async function linkPilot() {
    if (!pilotIdInput.trim()) return;
    const resolved = game.actors.get(pilotIdInput.trim());
    if (!resolved) {
      ui.notifications.warn("Pilot actor not found.");
      return;
    }
    await actor.update({ "system.pilotId": pilotIdInput.trim() });
    pilotIdInput = "";
  }

  async function unlinkPilot() {
    await actor.update({ "system.pilotId": "" });
  }
```

Replace the pilot link template section (the `{#if showPilot}` block) with:

```svelte
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
          <span class="text-xs text-slate-400">{actor.system.pilotId ? "Pilot not found" : "No pilot linked"}</span>
          <div class="flex gap-1">
            <input
              class="flex-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"
              placeholder="Actor ID..."
              bind:value={pilotIdInput}
            />
            <button type="button"
              class="px-1.5 py-0.5 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600"
              onclick={linkPilot}
            >Link</button>
          </div>
        </div>
      {/if}
    </div>
  {/if}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/sidebar/ActorSidebar.svelte
git commit -m "feat: upgrade mecha pilot link with resolved name and open/link/unlink buttons"
```

---

### Task 3: Mecha Pilot Stat Fusion

**Files:**
- Modify: `src/models/actors/MechaData.mjs`

- [ ] **Step 1: Read the file**

Read `src/models/actors/MechaData.mjs`.

- [ ] **Step 2: Update prepareDerivedData()**

Replace the CV calculation section (the lines starting with `const bv = resolveStatValue(this.stats.body)` through `this.derived.dcv = ...`) with:

```js
    const bv = resolveStatValue(this.stats.body);
    const mv = resolveStatValue(this.stats.mind);
    const sv = resolveStatValue(this.stats.soul);

    // Pilot stat fusion — if a pilot is linked, combine stats for CV
    let cvBody = bv;
    let cvMind = mv;
    let cvSoul = sv;

    try {
      if (this.pilotId) {
        const pilot = game.actors.get(this.pilotId);
        if (pilot) {
          const pilotBody = pilot.system.stats.body.mode !== "missing" ? pilot.system.stats.body.value : null;
          const pilotMind = pilot.system.stats.mind.mode !== "missing" ? pilot.system.stats.mind.value : null;
          const pilotSoul = pilot.system.stats.soul.mode !== "missing" ? pilot.system.stats.soul.value : null;

          // Store pilot bonus for display
          this.pilotBonus.body = pilotBody ?? 0;
          this.pilotBonus.mind = pilotMind ?? 0;
          this.pilotBonus.soul = pilotSoul ?? 0;

          // Fuse: mecha Body + pilot stats for CV
          cvBody = (bv ?? 0) + (pilotBody ?? 0);
          cvMind = pilotMind;
          cvSoul = pilotSoul;
        }
      }
    } catch { /* game not ready during init */ }

    this.derived.baseCv = computeBaseCv(cvBody, cvMind, cvSoul);
```

Leave the rest of prepareDerivedData() unchanged (attackMastery, defenceMastery, HP, AR, DM all still use the same pattern).

- [ ] **Step 3: Build and test**

Run: `npm run build && npx vitest run`
Expected: Build succeeds, all tests pass

- [ ] **Step 4: Commit**

```bash
git add src/models/actors/MechaData.mjs
git commit -m "feat: add pilot stat fusion to mecha CV calculation"
```

---

### Task 4: Foundry Verification

**Files:**
- None — manual testing

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Create test actors**

Create a pilot character and a mecha:
1. Create a character named "Pilot" with Body 6, Mind 7, Soul 5
2. Create a mecha named "Gundam" with Body 10
3. Note the Pilot actor's ID (right-click → Copy ID in the sidebar)

- [ ] **Step 3: Test pilot linking**

Open the Gundam mecha sheet. In the sidebar, paste the Pilot's actor ID into the pilot link field, click "Link".

Check:
- Pilot name "Pilot" appears in sidebar
- "Open" and "Unlink" buttons visible
- Click "Open" → Pilot's character sheet opens
- Gundam's ACV/DCV should now reflect fused stats (Body 10 + Pilot 6 = 16, Mind 7, Soul 5)

- [ ] **Step 4: Test crew management**

Open the Gundam sheet → Crew tab.
1. Paste the Pilot's actor ID into the "Add Crew Member" field
2. Select role "pilot", click "Add"
3. Check: Pilot appears in crew list with name resolved, role dropdown, Open/Remove buttons
4. Change role to "gunner" via dropdown
5. Click "Open" → Pilot sheet opens
6. Click "Remove" → Pilot removed from crew list

- [ ] **Step 5: Test unlinking pilot**

In the sidebar, click "Unlink" on the pilot.

Check:
- Pilot section shows "No pilot linked" with ID input field
- Mecha's ACV/DCV revert to mecha-only stats

- [ ] **Step 6: Clean up**

```js
for(const a of game.actors)await a.delete();
```
