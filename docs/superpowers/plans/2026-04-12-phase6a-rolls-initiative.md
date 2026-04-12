# Phase 6a — Roll Engine, Chat Messages, Initiative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement stat rolls, skill rolls, and initiative with formatted chat messages and roll buttons on the character sheet.

**Architecture:** Pure roll calculation helpers in `src/engine/rolls.mjs` (testable via Vitest). Roll execution and chat posting in `src/rolls/BESMRoll.mjs` (uses Foundry API). A `RollButton` Svelte component added to stat inputs and skill rows. Initiative formula override in the init hook.

**Tech Stack:** Vitest, Foundry VTT V14 Roll API, ChatMessage API, DialogV2, Svelte 5

**Spec:** `docs/superpowers/specs/2026-04-12-phase6a-rolls-initiative-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/engine/rolls.mjs` | Create | Pure roll helpers (testable) |
| `tests/engine/rolls.test.mjs` | Create | Tests for pure roll helpers |
| `src/rolls/BESMRoll.mjs` | Create | Roll execution + chat messages (Foundry API) |
| `src/components/ui/RollButton.svelte` | Create | Dice icon button |
| `src/components/sidebar/StatInput.svelte` | Modify | Add optional roll button |
| `src/components/sidebar/ActorSidebar.svelte` | Modify | Pass roll handlers to StatInput |
| `src/components/ui/SkillRow.svelte` | Modify | Add roll button |
| `src/besm4e.mjs` | Modify | Register initiative formula |

---

### Task 1: Pure Roll Helpers (TDD)

**Files:**
- Create: `tests/engine/rolls.test.mjs`
- Create: `src/engine/rolls.mjs`

- [ ] **Step 1: Write failing tests**

Create `tests/engine/rolls.test.mjs`:

```js
import { describe, it, expect } from "vitest";
import { resolveRollTotal, resolveEdgeFormula, formatRollBreakdown } from "../../src/engine/rolls.mjs";

describe("resolveRollTotal", () => {
  it("sums dice total with modifiers", () => {
    expect(resolveRollTotal(7, 5, 3)).toBe(15);
  });

  it("returns dice total with no modifiers", () => {
    expect(resolveRollTotal(7)).toBe(7);
  });

  it("handles single modifier", () => {
    expect(resolveRollTotal(8, 4)).toBe(12);
  });

  it("handles zero modifiers", () => {
    expect(resolveRollTotal(6, 0, 0)).toBe(6);
  });
});

describe("resolveEdgeFormula", () => {
  it("returns 2d6 for no edge", () => {
    expect(resolveEdgeFormula(null)).toBe("2d6");
  });

  it("returns 3d6kl2 for minor edge", () => {
    expect(resolveEdgeFormula("minor")).toBe("3d6kl2");
  });

  it("returns 4d6kl2 for major edge", () => {
    expect(resolveEdgeFormula("major")).toBe("4d6kl2");
  });
});

describe("formatRollBreakdown", () => {
  it("formats a stat roll", () => {
    const html = formatRollBreakdown("stat", { dice: [3, 4], diceTotal: 7 }, [
      { label: "Body", value: 5 },
    ], 12);
    expect(html).toContain("Stat Roll");
    expect(html).toContain("3");
    expect(html).toContain("4");
    expect(html).toContain("Body");
    expect(html).toContain("+5");
    expect(html).toContain("12");
  });

  it("formats a skill roll with multiple modifiers", () => {
    const html = formatRollBreakdown("skill", { dice: [5, 2], diceTotal: 7 }, [
      { label: "Mind", value: 6 },
      { label: "Acrobatics", value: 3 },
    ], 16);
    expect(html).toContain("Skill Roll");
    expect(html).toContain("Mind");
    expect(html).toContain("Acrobatics");
    expect(html).toContain("16");
  });

  it("formats an initiative roll", () => {
    const html = formatRollBreakdown("initiative", { dice: [4, 6], diceTotal: 10 }, [
      { label: "ACV", value: 5 },
    ], 15);
    expect(html).toContain("Initiative");
    expect(html).toContain("15");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/engine/rolls.test.mjs`
Expected: FAIL — cannot find module

- [ ] **Step 3: Implement rolls.mjs**

Create `src/engine/rolls.mjs`:

```js
export function resolveRollTotal(diceTotal, ...modifiers) {
  return modifiers.reduce((sum, mod) => sum + mod, diceTotal);
}

export function resolveEdgeFormula(edge) {
  if (edge === "minor") return "3d6kl2";
  if (edge === "major") return "4d6kl2";
  return "2d6";
}

const ROLL_TYPE_LABELS = {
  stat: "Stat Roll",
  skill: "Skill Roll",
  initiative: "Initiative",
};

export function formatRollBreakdown(type, rollData, modifiers, total) {
  const label = ROLL_TYPE_LABELS[type] ?? "Roll";
  const diceStr = rollData.dice.map(d => `<span class="besm-die">${d}</span>`).join(" + ");
  const modStr = modifiers
    .filter(m => m.value !== 0)
    .map(m => `<span class="besm-mod">+${m.value} ${m.label}</span>`)
    .join(" ");

  return `<div class="besm-roll">
  <div class="besm-roll-header">${label}</div>
  <div class="besm-roll-dice">${diceStr} = ${rollData.diceTotal}</div>
  ${modStr ? `<div class="besm-roll-mods">${modStr}</div>` : ""}
  <div class="besm-roll-total">Total: ${total}</div>
</div>`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/engine/rolls.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/engine/rolls.mjs tests/engine/rolls.test.mjs
git commit -m "feat: add pure roll calculation helpers with tests"
```

---

### Task 2: BESMRoll — Roll Execution and Chat Messages

**Files:**
- Create: `src/rolls/BESMRoll.mjs`

- [ ] **Step 1: Create BESMRoll.mjs**

```js
import { resolveRollTotal, resolveEdgeFormula, formatRollBreakdown } from "../engine/rolls.mjs";

function extractDice(roll) {
  const terms = roll.terms ?? [];
  const diceTerm = terms.find(t => t.results);
  if (!diceTerm) return { dice: [], diceTotal: roll.total };
  const dice = diceTerm.results.map(r => r.result);
  const diceTotal = dice.reduce((s, d) => s + d, 0);
  return { dice, diceTotal };
}

export async function resolveStatForRoll(actor, nominalStat) {
  const stat = actor.system.stats[nominalStat];
  if (stat.mode !== "missing") {
    return { value: stat.mode === "zero" ? 0 : stat.value, label: nominalStat };
  }

  const available = ["body", "mind", "soul"]
    .filter(k => actor.system.stats[k].mode !== "missing")
    .map(k => ({
      key: k,
      value: actor.system.stats[k].mode === "zero" ? 0 : actor.system.stats[k].value,
      label: k.charAt(0).toUpperCase() + k.slice(1),
    }));

  if (available.length === 0) {
    ui.notifications.warn("No stats available for this roll.");
    return null;
  }

  if (available.length === 1) {
    return { value: available[0].value, label: available[0].key };
  }

  const buttons = {};
  for (const s of available) {
    buttons[s.key] = {
      label: `${s.label} (${s.value})`,
      action: s.key,
    };
  }

  const chosen = await foundry.applications.api.DialogV2.wait({
    window: { title: "Missing Stat — Choose Substitute" },
    content: "<p>This roll calls for a missing stat. Choose which stat to substitute:</p>",
    buttons,
  });

  if (!chosen) return null;
  const pick = available.find(s => s.key === chosen);
  return pick ? { value: pick.value, label: pick.key } : null;
}

export async function performStatRoll(actor, statKey, options = {}) {
  const resolved = await resolveStatForRoll(actor, statKey);
  if (!resolved) return null;

  const formula = resolveEdgeFormula(options.edge ?? null);
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, resolved.value);

  const modifiers = [{ label: resolved.label.charAt(0).toUpperCase() + resolved.label.slice(1), value: resolved.value }];
  const content = formatRollBreakdown("stat", rollData, modifiers, total);

  await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
  });

  return { roll, total, statValue: resolved.value };
}

export async function performSkillRoll(actor, statKey, skillLevel, skillName, options = {}) {
  const resolved = await resolveStatForRoll(actor, statKey);
  if (!resolved) return null;

  const formula = resolveEdgeFormula(options.edge ?? null);
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, resolved.value, skillLevel);

  const modifiers = [
    { label: resolved.label.charAt(0).toUpperCase() + resolved.label.slice(1), value: resolved.value },
    { label: skillName, value: skillLevel },
  ];
  const content = formatRollBreakdown("skill", rollData, modifiers, total);

  await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
  });

  return { roll, total, statValue: resolved.value, skillLevel };
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/rolls/BESMRoll.mjs
git commit -m "feat: add BESMRoll with stat and skill roll execution and chat messages"
```

---

### Task 3: RollButton Component

**Files:**
- Create: `src/components/ui/RollButton.svelte`

- [ ] **Step 1: Create RollButton.svelte**

```svelte
<script>
  let { onclick, title = "Roll" } = $props();
</script>

<button
  class="w-5 h-5 bg-slate-700 border-0 text-slate-400 rounded text-xs cursor-pointer hover:bg-slate-600 hover:text-slate-200 inline-flex items-center justify-center flex-shrink-0"
  {onclick}
  {title}
>🎲</button>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/RollButton.svelte
git commit -m "feat: add RollButton component"
```

---

### Task 4: Add Roll Buttons to StatInput and ActorSidebar

**Files:**
- Modify: `src/components/sidebar/StatInput.svelte`
- Modify: `src/components/sidebar/ActorSidebar.svelte`

- [ ] **Step 1: Read both files**

Read `src/components/sidebar/StatInput.svelte` and `src/components/sidebar/ActorSidebar.svelte`.

- [ ] **Step 2: Update StatInput.svelte**

Replace the entire file:

```svelte
<script>
  import RollButton from "../ui/RollButton.svelte";

  let { label, value, cpCost, mode, onUpdate, onRoll = null } = $props();

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
    <span class="text-xs text-slate-500 w-6 text-right">{cpCost}cp</span>
    {#if onRoll}
      <RollButton onclick={onRoll} title="Roll {label}" />
    {/if}
  </div>
{/if}
```

Changes from original:
- Added `import RollButton`
- Added optional `onRoll = null` prop
- Added `RollButton` at end of row when `onRoll` is provided
- Narrowed cpCost span from `w-8` to `w-6` to make room for roll button

- [ ] **Step 3: Update ActorSidebar.svelte**

Read the file, then add the import and roll handler. Replace the entire file:

```svelte
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
```

Changes from original:
- Added `import { performStatRoll } from "../../rolls/BESMRoll.mjs"`
- Added `rollStat(key)` function
- Pass `onRoll={() => rollStat(key)}` to each StatInput

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/sidebar/StatInput.svelte src/components/sidebar/ActorSidebar.svelte
git commit -m "feat: add roll buttons to stat inputs on actor sidebar"
```

---

### Task 5: Add Roll Button to SkillRow

**Files:**
- Modify: `src/components/ui/SkillRow.svelte`

- [ ] **Step 1: Read the file**

Read `src/components/ui/SkillRow.svelte`.

- [ ] **Step 2: Update SkillRow.svelte**

Replace the entire file:

```svelte
<script>
  import RollButton from "./RollButton.svelte";
  import { performSkillRoll } from "../../rolls/BESMRoll.mjs";

  let { skill, actor } = $props();

  let unavailable = $derived(!skill.system.isAvailable);
  let specialisations = $derived(skill.system.specialisations ?? []);

  function openSheet() {
    skill.sheet.render(true);
  }

  function rollSkill(e) {
    e.stopPropagation();
    performSkillRoll(
      actor,
      skill.system.linkedStat,
      skill.system.rank,
      skill.name
    );
  }
</script>

<div
  class="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50 {unavailable ? 'opacity-40 line-through' : ''}"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-slate-200 font-medium {skill.system.isFlavor ? 'italic' : ''}">
    {skill.name}
    {#if skill.system.isFlavor}
      <span class="text-slate-500 no-underline">(flavor)</span>
    {/if}
  </span>

  <span class="text-slate-400">Rank {skill.system.rank}</span>
  <span class="text-slate-500">{skill.system.linkedStat}</span>

  {#each specialisations as spec}
    <span class="inline-flex items-center px-1 py-0.5 rounded text-xs {spec.isFree ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}">
      {spec.name}
      {#if spec.isFree}
        <span class="ml-0.5 text-emerald-500">(free)</span>
      {:else}
        <span class="ml-0.5 text-amber-500">({spec.spCost} SP)</span>
      {/if}
    </span>
  {/each}

  <span class="text-slate-400 ml-auto">{skill.system.totalSpCost} SP</span>

  {#if !unavailable && !skill.system.isFlavor}
    <RollButton onclick={rollSkill} title="Roll {skill.name}" />
  {/if}
</div>
```

Changes from original:
- Added `import RollButton` and `import { performSkillRoll }`
- Added `actor` prop (previously only `skill`)
- Added `rollSkill(e)` with `e.stopPropagation()` to prevent opening the sheet
- Added `RollButton` at end of row (hidden for unavailable or flavor skills)

- [ ] **Step 3: Update SkillsTab to pass actor to SkillRow**

Read `src/components/tabs/SkillsTab.svelte`. Find the line:
```
        <SkillRow {skill} />
```

Replace with:
```
        <SkillRow {skill} {actor} />
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/SkillRow.svelte src/components/tabs/SkillsTab.svelte
git commit -m "feat: add roll buttons to skill rows"
```

---

### Task 6: Initiative Override

**Files:**
- Modify: `src/besm4e.mjs`

- [ ] **Step 1: Read besm4e.mjs**

Read `src/besm4e.mjs`.

- [ ] **Step 2: Add initiative override**

After the `registerSettings()` call and before the sheet registrations, add:

```js
  // Initiative override
  try {
    const initMode = game.settings.get("besm", "initiativeMode");
    if (initMode === "cv_static") {
      CONFIG.Combat.initiative = { formula: "@derived.acv", decimals: 0 };
    } else {
      CONFIG.Combat.initiative = { formula: "2d6 + @derived.acv", decimals: 0 };
    }
  } catch {
    CONFIG.Combat.initiative = { formula: "2d6 + @derived.acv", decimals: 0 };
  }
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/besm4e.mjs
git commit -m "feat: override initiative formula to use 2d6 + ACV"
```

---

### Task 7: Foundry Verification

**Files:**
- None — manual testing in Foundry VTT V14

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Run setup and test script**

Paste into browser console:

```js
(async () => {
  let char = await Actor.create({name: "Roll Test", type: "character"});
  await char.update({"system.stats.body.value": 5, "system.stats.mind.value": 7, "system.stats.soul.value": 6});
  await char.createEmbeddedDocuments("Item", [
    {name: "Acrobatics", type: "skill", system: {rank: 3, costClass: "framework", linkedStat: "body"}},
  ]);
  console.log("Done - open Roll Test sheet and check:");
  console.log("1. Click dice icon next to Body stat - chat message should appear with 2d6 + 5");
  console.log("2. Skills tab: click dice icon on Acrobatics - chat should show 2d6 + 5 Body + 3 Acrobatics");
  console.log("3. Test missing stat: run in console:");
  console.log('   game.actors.getName("Roll Test").update({"system.stats.body.mode": "missing"})');
  console.log("   Then click Mind dice - should roll normally (Mind 7)");
  console.log("   Click Soul dice - should roll normally (Soul 6)");
  console.log("   Click Acrobatics dice - should prompt to choose Mind or Soul as substitute");
})();
```

- [ ] **Step 3: Visual checks**

1. Open "Roll Test" character sheet
2. **Click Body dice icon** → chat message appears: "Stat Roll", 2d6 dice breakdown, +5 Body, total
3. **Skills tab → click Acrobatics dice icon** → "Skill Roll", 2d6, +5 Body, +3 Acrobatics, total
4. **Set body to missing** via console: `game.actors.getName("Roll Test").update({"system.stats.body.mode": "missing"})`
5. **Click Mind dice** → rolls normally with Mind 7
6. **Click Acrobatics dice** → dialog appears asking to choose Mind or Soul as substitute
7. **Choose Mind** → skill roll uses Mind value

- [ ] **Step 4: Test initiative**

1. Create a combat encounter (Combat Tracker → Create Encounter)
2. Add "Roll Test" to the encounter
3. Click "Roll Initiative" for the combatant
4. Verify the initiative value is 2d6 + ACV (ACV should be based on the character's stats)

- [ ] **Step 5: Clean up**

```js
for (const a of game.actors) await a.delete();
for (const i of game.items) await i.delete();
```
