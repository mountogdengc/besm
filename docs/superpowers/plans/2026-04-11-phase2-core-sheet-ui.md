# Phase 2 — Core Sheet UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build functional Svelte 5 character sheets for all four actor types with sidebar + tabs layout, editable stats, live CP/SP trackers, derived stats display, and benchmark warnings.

**Architecture:** Each actor type gets a DocumentSheetV2 subclass that mounts a root Svelte 5 component. Shared UI components (sidebar, tabs, trackers) are composed into each sheet. The existing `updateActor` hook pattern from Phase 0 is reused for reactivity. Stat edits call `actor.update()` which triggers `prepareDerivedData()` and the hook refreshes the component.

**Tech Stack:** Svelte 5 (runes), Tailwind CSS (no preflight), Foundry VTT V14 DocumentSheetV2

**Spec:** `docs/superpowers/specs/2026-04-11-phase2-core-sheet-ui-design.md`

**Note on testing:** Svelte UI components are tested visually in Foundry. No unit tests for this phase. Each task ends with a build step; the final task is a Foundry verification script.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| **Shared UI Components** | | |
| `src/components/ui/CollapsibleSection.svelte` | Create | Collapsible section with header + toggle arrow |
| `src/components/ui/BenchmarkPanel.svelte` | Create | Amber warning panel, hidden when no warnings |
| `src/components/ui/ResourceBar.svelte` | Create | HP/EP bar with current value input |
| **Sidebar Components** | | |
| `src/components/sidebar/StatInput.svelte` | Create | Single stat with +/- buttons, number input, CP cost |
| `src/components/sidebar/CPTracker.svelte` | Create | CP total/spent/remaining display |
| `src/components/sidebar/SPTracker.svelte` | Create | SP pool/spent/remaining display |
| `src/components/sidebar/DerivedStats.svelte` | Create | Grid of derived stat values |
| `src/components/sidebar/ActorSidebar.svelte` | Create | Sidebar container composing stat/tracker/derived |
| **Tab Components** | | |
| `src/components/tabs/TabBar.svelte` | Create | Tab navigation bar |
| `src/components/tabs/AttributesTab.svelte` | Create | Collapsible attributes + defects list |
| `src/components/tabs/SkillsTab.svelte` | Create | Skill list (point-buy or group mode) |
| `src/components/tabs/PossessionsTab.svelte` | Create | Possession item list |
| `src/components/tabs/CombatTab.svelte` | Create | Combat values + HP/EP bars |
| `src/components/tabs/BiographyTab.svelte` | Create | Biography rich text + notes |
| `src/components/tabs/CrewTab.svelte` | Create | Crew list for vehicles/mecha |
| **Sheet Root Components** | | |
| `src/components/sheets/CharacterSheet.svelte` | Rewrite | Full character sheet with sidebar + tabs |
| `src/components/sheets/NPCSheet.svelte` | Create | NPC sheet |
| `src/components/sheets/VehicleSheet.svelte` | Create | Vehicle sheet |
| `src/components/sheets/MechaSheet.svelte` | Create | Mecha sheet |
| **Sheet Host Classes** | | |
| `src/sheets/BESMActorSheet.mjs` | Modify | Update to use type-specific component |
| `src/sheets/BESMNPCSheet.mjs` | Create | DocumentSheetV2 for NPC |
| `src/sheets/BESMVehicleSheet.mjs` | Create | DocumentSheetV2 for Vehicle |
| `src/sheets/BESMMechaSheet.mjs` | Create | DocumentSheetV2 for Mecha |
| **Entry Point** | | |
| `src/besm4e.mjs` | Modify | Register all four sheet classes |

---

### Task 1: Shared UI Components

**Files:**
- Create: `src/components/ui/CollapsibleSection.svelte`
- Create: `src/components/ui/BenchmarkPanel.svelte`
- Create: `src/components/ui/ResourceBar.svelte`

- [ ] **Step 1: Create CollapsibleSection.svelte**

```svelte
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
```

- [ ] **Step 2: Create BenchmarkPanel.svelte**

```svelte
<script>
  let { warnings = [] } = $props();
</script>

{#if warnings.length > 0}
  <div class="mx-3 my-2 p-2 border border-amber-600 rounded bg-amber-950/30">
    <div class="text-xs font-bold text-amber-400">
      Benchmark Recommendations ({warnings.length})
    </div>
    <ul class="mt-1 text-xs text-amber-300 list-none p-0 m-0">
      {#each warnings as w}
        <li class="py-0.5">{w}</li>
      {/each}
    </ul>
    <p class="mt-1 text-xs text-stone-500 italic">
      These are recommendations, not restrictions.
    </p>
  </div>
{/if}
```

- [ ] **Step 3: Create ResourceBar.svelte**

```svelte
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
  <span class="text-xs text-slate-400 w-6">{label}</span>
  <div class="flex-1 h-4 bg-slate-900 rounded overflow-hidden border border-slate-700">
    <div
      class="h-full bg-emerald-700 transition-all"
      style="width: {max > 0 ? (current / max) * 100 : 0}%"
    ></div>
  </div>
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
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/CollapsibleSection.svelte src/components/ui/BenchmarkPanel.svelte src/components/ui/ResourceBar.svelte
git commit -m "feat: add CollapsibleSection, BenchmarkPanel, and ResourceBar UI components"
```

---

### Task 2: Sidebar Components

**Files:**
- Create: `src/components/sidebar/StatInput.svelte`
- Create: `src/components/sidebar/CPTracker.svelte`
- Create: `src/components/sidebar/SPTracker.svelte`
- Create: `src/components/sidebar/DerivedStats.svelte`
- Create: `src/components/sidebar/ActorSidebar.svelte`

- [ ] **Step 1: Create StatInput.svelte**

```svelte
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
```

- [ ] **Step 2: Create CPTracker.svelte**

```svelte
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
```

- [ ] **Step 3: Create SPTracker.svelte**

```svelte
<script>
  let { pool, spent, remaining } = $props();
  let overBudget = $derived(remaining < 0);
</script>

<div class="border-t border-slate-700 pt-2">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Skill Points</div>
  <div class="flex justify-between text-xs">
    <span class="text-slate-400">Pool</span>
    <span class="text-slate-100">{pool}</span>
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
```

- [ ] **Step 4: Create DerivedStats.svelte**

```svelte
<script>
  let { derived, showEP = true, showCV = true, showMovement = false } = $props();
</script>

<div class="border-t border-slate-700 pt-2">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Derived</div>
  <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
    {#if derived.hpApplicable}
      <span class="text-slate-400">HP</span>
      <span class="text-slate-100 text-right">{derived.currentHp}/{derived.hpMax}</span>
    {/if}
    {#if showEP && derived.epApplicable}
      <span class="text-slate-400">EP</span>
      <span class="text-slate-100 text-right">{derived.currentEp}/{derived.epMax}</span>
    {/if}
    {#if showCV}
      <span class="text-slate-400">ACV</span>
      <span class="text-slate-100 text-right">{derived.acv}</span>
      <span class="text-slate-400">DCV</span>
      <span class="text-slate-100 text-right">{derived.dcv}</span>
    {/if}
    {#if derived.hpApplicable}
      <span class="text-slate-400">SV</span>
      <span class="text-slate-100 text-right">{derived.sv}</span>
    {/if}
    <span class="text-slate-400">DM</span>
    <span class="text-slate-100 text-right">{derived.damageMultiplier}/{derived.meleeDamageMultiplier}</span>
    <span class="text-slate-400">AR</span>
    <span class="text-slate-100 text-right">{derived.ar}</span>
  </div>
</div>
```

- [ ] **Step 5: Create ActorSidebar.svelte**

```svelte
<script>
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

```

**IMPORTANT:** The full `ActorSidebar.svelte` `<script>` block should start with imports, then props. Here is the complete `<script>` block — use this instead of the snippet above:

```svelte
<script>
  import StatInput from "./StatInput.svelte";
  import CPTracker from "./CPTracker.svelte";
  import SPTracker from "./SPTracker.svelte";
  import DerivedStats from "./DerivedStats.svelte";

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
</script>
```

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 7: Commit**

```bash
git add src/components/sidebar/
git commit -m "feat: add sidebar components — StatInput, CPTracker, SPTracker, DerivedStats, ActorSidebar"
```

---

### Task 3: Tab Components

**Files:**
- Create: `src/components/tabs/TabBar.svelte`
- Create: `src/components/tabs/AttributesTab.svelte`
- Create: `src/components/tabs/SkillsTab.svelte`
- Create: `src/components/tabs/PossessionsTab.svelte`
- Create: `src/components/tabs/CombatTab.svelte`
- Create: `src/components/tabs/BiographyTab.svelte`
- Create: `src/components/tabs/CrewTab.svelte`

- [ ] **Step 1: Create TabBar.svelte**

```svelte
<script>
  let { tabs, activeTab, onSelect } = $props();
</script>

<div class="flex border-b border-slate-700 bg-slate-950">
  {#each tabs as tab}
    <button
      class="px-3.5 py-2 text-xs border-0 cursor-pointer bg-transparent
             {activeTab === tab.id
               ? 'text-slate-100 border-b-2 border-b-blue-500'
               : 'text-slate-500 hover:text-slate-300'}"
      onclick={() => onSelect(tab.id)}
    >
      {tab.label}
    </button>
  {/each}
</div>
```

- [ ] **Step 2: Create AttributesTab.svelte**

```svelte
<script>
  import CollapsibleSection from "../ui/CollapsibleSection.svelte";

  let { actor } = $props();

  let attributes = $derived(
    [...actor.items].filter(i => i.type === "attribute")
  );
  let defects = $derived(
    [...actor.items].filter(i => i.type === "defect")
  );
</script>

<div class="p-3">
  <CollapsibleSection title="Attributes" count={attributes.length} headerClass="text-slate-100">
    {#if attributes.length === 0}
      <p class="text-xs text-slate-500 italic px-2">No attributes. Drag from compendium to add.</p>
    {:else}
      {#each attributes as attr}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-slate-200">{attr.name}</span>
          <span class="text-slate-400">
            Lv {attr.system.purchasedLevel}
            {#if attr.system.purchasedLevel !== attr.system.effectiveLevel}
              <span class="text-amber-400">→ Eff {attr.system.effectiveLevel}</span>
            {/if}
          </span>
          <span class="text-slate-400">{attr.system.totalCost} CP</span>
        </div>
      {/each}
    {/if}
  </CollapsibleSection>

  <CollapsibleSection title="Defects" count={defects.length} headerClass="text-red-400">
    {#if defects.length === 0}
      <p class="text-xs text-slate-500 italic px-2">No defects.</p>
    {:else}
      {#each defects as defect}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-red-300">{defect.name}</span>
          <span class="text-slate-400">Rank {defect.system.rankLevel}</span>
          <span class="text-emerald-400">+{defect.system.cpGranted} CP</span>
        </div>
      {/each}
    {/if}
  </CollapsibleSection>
</div>
```

- [ ] **Step 3: Create SkillsTab.svelte**

```svelte
<script>
  let { actor } = $props();

  let skills = $derived(
    [...actor.items].filter(i => i.type === "skill")
  );
  let skillGroups = $derived(
    [...actor.items].filter(i => i.type === "attribute" && i.system.isSkillGroup)
  );

  let isPointBuy = $derived(actor.system.skillMode === "pointbuy");
</script>

<div class="p-3">
  {#if isPointBuy}
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skills (Point Buy)</div>
    {#if skills.length === 0}
      <p class="text-xs text-slate-500 italic">No skills. Drag from compendium to add.</p>
    {:else}
      {#each skills as skill}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-slate-200 {skill.system.isFlavor ? 'italic' : ''}">
            {skill.name}
            {#if skill.system.isFlavor}
              <span class="text-slate-500">(flavor)</span>
            {/if}
          </span>
          <span class="text-slate-400">Rank {skill.system.rank}</span>
          <span class="text-slate-400">{skill.system.linkedStat}</span>
          <span class="text-slate-400">{skill.system.totalSpCost} SP</span>
        </div>
      {/each}
    {/if}
  {:else}
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skill Groups</div>
    {#if skillGroups.length === 0}
      <p class="text-xs text-slate-500 italic">No skill groups. Drag from compendium to add.</p>
    {:else}
      {#each skillGroups as group}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-slate-200">{group.name}</span>
          <span class="text-slate-400">Lv {group.system.purchasedLevel}</span>
          <span class="text-slate-400">{group.system.skillGroupCategory}</span>
          <span class="text-slate-400">{group.system.totalCost} CP</span>
        </div>
      {/each}
    {/if}
  {/if}
</div>
```

- [ ] **Step 4: Create PossessionsTab.svelte**

```svelte
<script>
  let { actor } = $props();

  let possessions = $derived(
    [...actor.items].filter(i => i.type === "possession")
  );
</script>

<div class="p-3">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Possessions</div>
  {#if possessions.length === 0}
    <p class="text-xs text-slate-500 italic">No possessions.</p>
  {:else}
    {#each possessions as item}
      <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
        <span class="text-slate-200">{item.name}</span>
        <span class="text-slate-400">{item.system.category}</span>
        <span class="text-xs px-1.5 py-0.5 rounded {item.system.isMechanical ? 'bg-blue-900 text-blue-300' : 'bg-slate-700 text-slate-400'}">
          {item.system.isMechanical ? 'mechanical' : 'flavor'}
        </span>
      </div>
    {/each}
  {/if}
</div>
```

- [ ] **Step 5: Create CombatTab.svelte**

```svelte
<script>
  import ResourceBar from "../ui/ResourceBar.svelte";

  let { actor } = $props();
  let d = $derived(actor.system.derived);

  function updateCurrentHp(val) {
    actor.update({ "system.derived.currentHp": val });
  }

  function updateCurrentEp(val) {
    actor.update({ "system.derived.currentEp": val });
  }
</script>

<div class="p-3 flex flex-col gap-4">
  <!-- Resource Bars -->
  <div class="flex flex-col gap-2">
    {#if d.hpApplicable}
      <ResourceBar label="HP" current={d.currentHp} max={d.hpMax} onUpdate={updateCurrentHp} />
    {/if}
    {#if d.epApplicable}
      <ResourceBar label="EP" current={d.currentEp} max={d.epMax} onUpdate={updateCurrentEp} />
    {/if}
  </div>

  <!-- Combat Values Grid -->
  <div class="grid grid-cols-3 gap-3">
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">ACV</div>
      <div class="text-2xl font-bold text-slate-100">{d.acv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">DCV</div>
      <div class="text-2xl font-bold text-slate-100">{d.dcv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">Init</div>
      <div class="text-2xl font-bold text-slate-100">{d.initiative}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">SV</div>
      <div class="text-lg font-bold text-slate-100">{d.sv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">DM</div>
      <div class="text-lg font-bold text-slate-100">{d.damageMultiplier}</div>
      <div class="text-xs text-slate-500">melee {d.meleeDamageMultiplier}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">AR</div>
      <div class="text-lg font-bold text-slate-100">{d.ar}</div>
    </div>
  </div>
</div>
```

- [ ] **Step 6: Create BiographyTab.svelte**

```svelte
<script>
  let { actor } = $props();
  let notes = $state(actor.system.notes ?? "");

  function saveNotes() {
    actor.update({ "system.notes": notes });
  }
</script>

<div class="p-3 flex flex-col gap-3">
  <div>
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Biography</div>
    <div class="text-xs text-slate-400 italic">
      Biography editing requires the full Foundry editor (coming in a future phase).
      Current content is displayed below.
    </div>
    <div class="mt-2 p-2 bg-slate-900 rounded border border-slate-700 text-xs text-slate-300 min-h-16">
      {@html actor.system.biography || "<em class='text-slate-500'>No biography.</em>"}
    </div>
  </div>

  <div>
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Notes</div>
    <textarea
      class="w-full h-24 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200 p-2 resize-y"
      bind:value={notes}
      onblur={saveNotes}
    ></textarea>
  </div>
</div>
```

- [ ] **Step 7: Create CrewTab.svelte**

```svelte
<script>
  let { actor } = $props();
  let crew = $derived(actor.system.crew ?? []);
</script>

<div class="p-3">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Crew</div>
  {#if crew.length === 0}
    <p class="text-xs text-slate-500 italic">No crew assigned.</p>
  {:else}
    {#each crew as member}
      <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
        <span class="text-slate-200">{member.actorId}</span>
        <span class="text-slate-400">{member.role}</span>
      </div>
    {/each}
  {/if}

  {#if actor.system.passengerCapacity > 0}
    <div class="mt-2 text-xs text-slate-400">
      Passenger capacity: {actor.system.passengerCapacity}
    </div>
  {/if}
</div>
```

- [ ] **Step 8: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 9: Commit**

```bash
git add src/components/tabs/
git commit -m "feat: add tab components — TabBar, Attributes, Skills, Possessions, Combat, Biography, Crew"
```

---

### Task 4: Character Sheet Root Component

**Files:**
- Rewrite: `src/components/sheets/CharacterSheet.svelte`

- [ ] **Step 1: Rewrite CharacterSheet.svelte**

Replace the entire file:

```svelte
<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import BenchmarkPanel from "../ui/BenchmarkPanel.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import SkillsTab from "../tabs/SkillsTab.svelte";
  import PossessionsTab from "../tabs/PossessionsTab.svelte";
  import CombatTab from "../tabs/CombatTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";

  let { document: actorDocument } = $props();
  let actor = $state(actorDocument);
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "skills", label: "Skills" },
    { id: "possessions", label: "Possessions" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) {
        actor = updatedActor;
      }
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>

<div class="flex h-full bg-slate-900 text-slate-100">
  <ActorSidebar {actor} showSP={true} showEP={true} showCV={true} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />
    <BenchmarkPanel warnings={actor.system.benchmarkWarnings} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "skills"}
        <SkillsTab {actor} />
      {:else if activeTab === "possessions"}
        <PossessionsTab {actor} />
      {:else if activeTab === "combat"}
        <CombatTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/sheets/CharacterSheet.svelte
git commit -m "feat: rewrite CharacterSheet with sidebar + tabs layout"
```

---

### Task 5: NPC, Vehicle, and Mecha Sheet Components

**Files:**
- Create: `src/components/sheets/NPCSheet.svelte`
- Create: `src/components/sheets/VehicleSheet.svelte`
- Create: `src/components/sheets/MechaSheet.svelte`

- [ ] **Step 1: Create NPCSheet.svelte**

```svelte
<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import BenchmarkPanel from "../ui/BenchmarkPanel.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import CombatTab from "../tabs/CombatTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";

  let { document: actorDocument } = $props();
  let actor = $state(actorDocument);
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) actor = updatedActor;
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>

<div class="flex h-full bg-slate-900 text-slate-100">
  <ActorSidebar {actor} showSP={false} showEP={true} showCV={true} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />
    <BenchmarkPanel warnings={actor.system.benchmarkWarnings ?? []} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "combat"}
        <CombatTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
```

- [ ] **Step 2: Create VehicleSheet.svelte**

```svelte
<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import CrewTab from "../tabs/CrewTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";

  let { document: actorDocument } = $props();
  let actor = $state(actorDocument);
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "crew", label: "Crew" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) actor = updatedActor;
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>

<div class="flex h-full bg-slate-900 text-slate-100">
  <ActorSidebar {actor} showSP={false} showEP={false} showCV={false} statsToShow={["body"]} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "crew"}
        <CrewTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
```

- [ ] **Step 3: Create MechaSheet.svelte**

```svelte
<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import CrewTab from "../tabs/CrewTab.svelte";
  import CombatTab from "../tabs/CombatTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";

  let { document: actorDocument } = $props();
  let actor = $state(actorDocument);
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "crew", label: "Crew" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) actor = updatedActor;
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>

<div class="flex h-full bg-slate-900 text-slate-100">
  <ActorSidebar {actor} showSP={false} showEP={false} showCV={true} showPilot={true} statsToShow={["body"]} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "crew"}
        <CrewTab {actor} />
      {:else if activeTab === "combat"}
        <CombatTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/sheets/NPCSheet.svelte src/components/sheets/VehicleSheet.svelte src/components/sheets/MechaSheet.svelte
git commit -m "feat: add NPC, Vehicle, and Mecha sheet components"
```

---

### Task 6: DocumentSheetV2 Host Classes + Registration

**Files:**
- Create: `src/sheets/BESMNPCSheet.mjs`
- Create: `src/sheets/BESMVehicleSheet.mjs`
- Create: `src/sheets/BESMMechaSheet.mjs`
- Modify: `src/sheets/BESMActorSheet.mjs`
- Modify: `src/besm4e.mjs`

- [ ] **Step 1: Create BESMNPCSheet.mjs**

```js
import { mount, unmount } from "svelte";
import NPCSheet from "../components/sheets/NPCSheet.svelte";

export class BESMNPCSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "actor-sheet", "npc-sheet"],
    position: { width: 700, height: 550 },
    window: { resizable: true },
  };

  #svelteComponent = null;

  async _renderHTML(context, options) {
    const el = document.createElement("div");
    el.classList.add("svelte-mount");
    return el;
  }

  _replaceHTML(element, html, options) {
    super._replaceHTML(element, html, options);
    if (!this.#svelteComponent) {
      this.#svelteComponent = mount(NPCSheet, {
        target: html,
        props: { document: this.document, sheet: this },
      });
    }
  }

  async close(options) {
    if (this.#svelteComponent) {
      unmount(this.#svelteComponent);
      this.#svelteComponent = null;
    }
    return super.close(options);
  }
}
```

- [ ] **Step 2: Create BESMVehicleSheet.mjs**

```js
import { mount, unmount } from "svelte";
import VehicleSheet from "../components/sheets/VehicleSheet.svelte";

export class BESMVehicleSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "actor-sheet", "vehicle-sheet"],
    position: { width: 700, height: 500 },
    window: { resizable: true },
  };

  #svelteComponent = null;

  async _renderHTML(context, options) {
    const el = document.createElement("div");
    el.classList.add("svelte-mount");
    return el;
  }

  _replaceHTML(element, html, options) {
    super._replaceHTML(element, html, options);
    if (!this.#svelteComponent) {
      this.#svelteComponent = mount(VehicleSheet, {
        target: html,
        props: { document: this.document, sheet: this },
      });
    }
  }

  async close(options) {
    if (this.#svelteComponent) {
      unmount(this.#svelteComponent);
      this.#svelteComponent = null;
    }
    return super.close(options);
  }
}
```

- [ ] **Step 3: Create BESMMechaSheet.mjs**

```js
import { mount, unmount } from "svelte";
import MechaSheet from "../components/sheets/MechaSheet.svelte";

export class BESMMechaSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "actor-sheet", "mecha-sheet"],
    position: { width: 700, height: 550 },
    window: { resizable: true },
  };

  #svelteComponent = null;

  async _renderHTML(context, options) {
    const el = document.createElement("div");
    el.classList.add("svelte-mount");
    return el;
  }

  _replaceHTML(element, html, options) {
    super._replaceHTML(element, html, options);
    if (!this.#svelteComponent) {
      this.#svelteComponent = mount(MechaSheet, {
        target: html,
        props: { document: this.document, sheet: this },
      });
    }
  }

  async close(options) {
    if (this.#svelteComponent) {
      unmount(this.#svelteComponent);
      this.#svelteComponent = null;
    }
    return super.close(options);
  }
}
```

- [ ] **Step 4: Update besm4e.mjs**

Read `src/besm4e.mjs`. Add imports for the three new sheet classes after the existing `BESMActorSheet` import:

```js
import { BESMNPCSheet } from "./sheets/BESMNPCSheet.mjs";
import { BESMVehicleSheet } from "./sheets/BESMVehicleSheet.mjs";
import { BESMMechaSheet } from "./sheets/BESMMechaSheet.mjs";
```

Then after the existing `Actors.registerSheet` call for character, add:

```js
  foundry.documents.collections.Actors.registerSheet("besm", BESMNPCSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "BESM4e.SheetNPC",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMVehicleSheet, {
    types: ["vehicle"],
    makeDefault: true,
    label: "BESM4e.SheetVehicle",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMMechaSheet, {
    types: ["mecha"],
    makeDefault: true,
    label: "BESM4e.SheetMecha",
  });
```

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/sheets/ src/besm4e.mjs
git commit -m "feat: add NPC, Vehicle, Mecha sheet hosts and register all four sheets"
```

---

### Task 7: Foundry Visual Verification

**Files:**
- None — manual testing in Foundry VTT V14

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Run verification script**

Paste this single block into the browser console:

```js
(async () => {
  // Create character with stats and items
  let char = await Actor.create({name: "UI Test Character", type: "character"});
  await char.update({
    "system.stats.body.value": 5,
    "system.stats.mind.value": 7,
    "system.stats.soul.value": 6,
  });
  await char.createEmbeddedDocuments("Item", [
    {name: "Superstrength", type: "attribute", system: {baseCostPerLevel: 4, purchasedLevel: 3}},
    {name: "Armour", type: "attribute", system: {baseCostPerLevel: 3, purchasedLevel: 2}},
    {name: "Fragile", type: "defect", system: {cpGranted: 2, rankLevel: 1}},
    {name: "Skills", type: "attribute", system: {baseCostPerLevel: 2, purchasedLevel: 4, isSkillsAttribute: true}},
    {name: "Acrobatics", type: "skill", system: {rank: 3, costClass: "framework", linkedStat: "body"}},
    {name: "Sword", type: "possession", system: {category: "gear", isMechanical: true}},
  ]);

  // Create NPC
  await Actor.create({name: "UI Test NPC", type: "npc"});

  // Create Vehicle
  let vehicle = await Actor.create({name: "UI Test Vehicle", type: "vehicle"});
  await vehicle.update({"system.stats.body.value": 8});

  // Create Mecha
  let mecha = await Actor.create({name: "UI Test Mecha", type: "mecha"});
  await mecha.update({"system.stats.body.value": 12});

  console.log("Done — open each actor sheet to verify the UI");
  console.log("Character: sidebar with 3 stats, CP/SP trackers, derived stats, 5 tabs");
  console.log("NPC: sidebar with 3 stats, CP tracker (no SP), 3 tabs");
  console.log("Vehicle: sidebar with Body only, CP tracker, HP/AR derived, 3 tabs");
  console.log("Mecha: sidebar with Body, pilot link, CV + DM derived, 4 tabs");
})();
```

- [ ] **Step 3: Visual checks**

Open each actor sheet and verify:

**Character sheet:**
- Sidebar shows Body (5, 10cp), Mind (7, 14cp), Soul (6, 12cp)
- CP Tracker shows total/spent/remaining
- SP Tracker shows 40/3/37
- Derived stats grid shows HP, EP, ACV, DCV, SV, DM, AR
- Attributes tab shows Superstrength (Lv 3, 12 CP), Armour (Lv 2, 6 CP)
- Defects section shows Fragile (Rank 1, +2 CP) in red
- Skills tab shows Acrobatics (Rank 3, body, 3 SP)
- Possessions tab shows Sword (gear, mechanical badge)
- Combat tab shows combat values and HP/EP bars
- Click +/- buttons on stats — values change, derived stats update
- Type a new stat value — derived stats update

**NPC sheet:**
- Same sidebar layout, no SP tracker
- Only 3 tabs: Attributes, Combat, Biography

**Vehicle sheet:**
- Only Body stat shown in sidebar (Mind/Soul hidden)
- Only HP and AR in derived section
- Tabs: Attributes, Crew, Biography

**Mecha sheet:**
- Body stat + pilot link in sidebar
- ACV, DCV, DM shown in derived section
- Tabs: Attributes, Crew, Combat, Biography

- [ ] **Step 4: Clean up**

```js
for (const a of game.actors) await a.delete();
for (const i of game.items) await i.delete();
```
