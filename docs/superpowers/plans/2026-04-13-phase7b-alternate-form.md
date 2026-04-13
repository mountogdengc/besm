# Phase 7b — Alternate Form Token Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Alternate Form token swap — a "Swap Form" button on Alternate Form attributes that replaces the current token with the alt form's token, carrying over HP damage and transferring status effects.

**Architecture:** Pure damage computation in `src/engine/alternateForm.mjs` (testable). Token swap execution in `src/hooks/alternateForm.mjs` (Foundry canvas API). A `transformationHeal` field on AttributeData enables healing during form swap. The existing LinkedActorBadge gains a "Swap Form" button for Alternate Form attributes.

**Tech Stack:** Vitest, Foundry VTT V14 Canvas/Token API, Svelte 5

**Spec:** `docs/superpowers/specs/2026-04-13-phase7b-alternate-form-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/engine/alternateForm.mjs` | Create | Pure damage carry-over computation |
| `tests/engine/alternateForm.test.mjs` | Create | Tests for damage computation |
| `src/hooks/alternateForm.mjs` | Create | swapToAlternateForm() — token swap via canvas API |
| `src/models/items/AttributeData.mjs` | Modify | Add `transformationHeal` field |
| `src/components/ui/LinkedActorBadge.svelte` | Modify | Add "Swap Form" button |
| `src/components/items/AttributeSheet.svelte` | Modify | Add transformationHeal checkbox |

---

### Task 1: Pure Damage Computation (TDD)

**Files:**
- Create: `tests/engine/alternateForm.test.mjs`
- Create: `src/engine/alternateForm.mjs`

- [ ] **Step 1: Write failing tests**

Create `tests/engine/alternateForm.test.mjs`:

```js
import { describe, it, expect } from "vitest";
import { computeTransformDamage } from "../../src/engine/alternateForm.mjs";

describe("computeTransformDamage", () => {
  it("carries over absolute damage to new form", () => {
    expect(computeTransformDamage(100, 80, 120, 0)).toBe(100);
  });

  it("handles frailer alt form", () => {
    expect(computeTransformDamage(100, 80, 60, 0)).toBe(40);
  });

  it("applies transformation healing", () => {
    expect(computeTransformDamage(100, 80, 120, 10)).toBe(110);
  });

  it("arrives at 0 when damage exceeds alt max HP", () => {
    expect(computeTransformDamage(100, 10, 50, 0)).toBe(0);
  });

  it("returns full HP when no damage taken", () => {
    expect(computeTransformDamage(100, 100, 80, 0)).toBe(80);
  });

  it("healing cannot exceed damage taken", () => {
    expect(computeTransformDamage(100, 80, 120, 50)).toBe(120);
  });

  it("handles zero current HP", () => {
    expect(computeTransformDamage(100, 0, 80, 0)).toBe(0);
  });

  it("handles healing bringing damage to zero", () => {
    expect(computeTransformDamage(100, 80, 120, 20)).toBe(120);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/engine/alternateForm.test.mjs`
Expected: FAIL — cannot find module

- [ ] **Step 3: Implement alternateForm.mjs**

Create `src/engine/alternateForm.mjs`:

```js
export function computeTransformDamage(currentMaxHP, currentHP, altMaxHP, healAmount) {
  const damageTaken = Math.max(0, currentMaxHP - currentHP);
  const adjustedDamage = Math.max(0, damageTaken - healAmount);
  return Math.max(0, altMaxHP - adjustedDamage);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/engine/alternateForm.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/engine/alternateForm.mjs tests/engine/alternateForm.test.mjs
git commit -m "feat: add pure damage carry-over computation for alternate form with tests"
```

---

### Task 2: Token Swap Function

**Files:**
- Create: `src/hooks/alternateForm.mjs`

- [ ] **Step 1: Create alternateForm.mjs**

```js
import { computeTransformDamage } from "../engine/alternateForm.mjs";

export async function swapToAlternateForm(parentActor, altFormActor) {
  const token = parentActor.getActiveTokens()[0];
  if (!token) {
    ui.notifications.warn("No active token found for this actor. Place a token on the scene first.");
    return;
  }

  // Step 1: Calculate damage state
  const currentMaxHP = parentActor.system.derived.hpMax;
  const currentHP = parentActor.system.derived.currentHp;
  const altMaxHP = altFormActor.system.derived.hpMax;

  // Step 2: Check for transformation healing on alt form
  const healingAttr = [...altFormActor.items].find(
    i => i.type === "attribute" &&
         i.name === "Healing" &&
         i.system.transformationHeal === true
  );
  const healAmount = healingAttr ? healingAttr.system.effectiveLevel * 5 : 0;

  // Step 3: Compute new HP
  const newHP = computeTransformDamage(currentMaxHP, currentHP, altMaxHP, healAmount);

  // Step 4: Update alt form's current HP
  await altFormActor.update({ "system.derived.currentHp": newHP });

  // Step 5: Transfer active status effects
  const existingEffects = token.actor.effects.map(e => e.toObject());
  if (existingEffects.length > 0) {
    // Clear any existing effects on alt form first
    const altEffectIds = altFormActor.effects.map(e => e.id);
    if (altEffectIds.length > 0) {
      await altFormActor.deleteEmbeddedDocuments("ActiveEffect", altEffectIds);
    }
    await altFormActor.createEmbeddedDocuments("ActiveEffect", existingEffects);
  }

  // Step 6: Record position
  const { x, y, elevation } = token;

  // Step 7: Delete current token
  await token.document.delete();

  // Step 8: Create new token for alt form
  const tokenData = await altFormActor.getTokenDocument({ x, y, elevation });
  await canvas.scene.createEmbeddedDocuments("Token", [tokenData.toObject()]);

  ui.notifications.info(`${parentActor.name} transforms into ${altFormActor.name}!`);
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/hooks/alternateForm.mjs
git commit -m "feat: add swapToAlternateForm function with HP carry-over and effect transfer"
```

---

### Task 3: Add transformationHeal Field to AttributeData

**Files:**
- Modify: `src/models/items/AttributeData.mjs`

- [ ] **Step 1: Read the file**

Read `src/models/items/AttributeData.mjs`.

- [ ] **Step 2: Add field**

In `defineSchema()`, after the `linkedActorId` field and before the `notes` field, add:

```js
      transformationHeal: new fields.BooleanField({ initial: false }),
```

- [ ] **Step 3: Build and test**

Run: `npm run build && npx vitest run`
Expected: Build succeeds, all tests pass

- [ ] **Step 4: Commit**

```bash
git add src/models/items/AttributeData.mjs
git commit -m "feat: add transformationHeal field to AttributeData"
```

---

### Task 4: Add Swap Form Button to LinkedActorBadge

**Files:**
- Modify: `src/components/ui/LinkedActorBadge.svelte`

- [ ] **Step 1: Read the file**

Read `src/components/ui/LinkedActorBadge.svelte`.

- [ ] **Step 2: Rewrite LinkedActorBadge.svelte**

Replace the entire file:

```svelte
<script>
  import { swapToAlternateForm } from "../../hooks/alternateForm.mjs";

  let { attribute, actor } = $props();

  let linkedActor = $derived(
    attribute.system.linkedActorId
      ? game.actors.get(attribute.system.linkedActorId)
      : null
  );

  let cpBudget = $derived(attribute.system.effectiveLevel * 10);

  let cpSpent = $derived(linkedActor?.system.cpSpent ?? 0);

  let cpValid = $derived(cpSpent <= cpBudget);

  let isAlternateForm = $derived(/alternate/i.test(attribute.name));

  function openLinkedSheet(e) {
    e.stopPropagation();
    if (linkedActor) linkedActor.sheet.render(true);
  }

  function swapForm(e) {
    e.stopPropagation();
    if (linkedActor && actor) swapToAlternateForm(actor, linkedActor);
  }
</script>

{#if linkedActor}
  <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700 text-xs flex-shrink-0">
    <span class="text-slate-300">{linkedActor.name}</span>
    <span class="px-1 rounded text-xs {cpValid ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}">
      {cpSpent}/{cpBudget} CP
    </span>
    <button
      class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs p-0"
      onclick={openLinkedSheet}
      title="Open {linkedActor.name} sheet"
    >Open</button>
    {#if isAlternateForm}
      <button
        class="text-amber-400 hover:text-amber-200 bg-transparent border-0 cursor-pointer text-xs p-0"
        onclick={swapForm}
        title="Swap to {linkedActor.name}"
      >Swap</button>
    {/if}
  </span>
{/if}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/LinkedActorBadge.svelte
git commit -m "feat: add Swap Form button to LinkedActorBadge for Alternate Form attributes"
```

---

### Task 5: Add transformationHeal Checkbox to AttributeSheet

**Files:**
- Modify: `src/components/items/AttributeSheet.svelte`

- [ ] **Step 1: Read the file**

Read `src/components/items/AttributeSheet.svelte`.

- [ ] **Step 2: Add checkbox to flags section**

In the flags section (the `<div class="flex flex-wrap gap-3 text-xs">` block that contains the isWeapon, isSkillGroup, etc. checkboxes), add after the Unique checkbox:

```svelte
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.transformationHeal}
        onchange={(e) => update("system.transformationHeal", e.target.checked)} />
      Transformation Heal
    </label>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/items/AttributeSheet.svelte
git commit -m "feat: add transformationHeal checkbox to AttributeSheet"
```

---

### Task 6: Foundry Verification

**Files:**
- None — manual testing

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world. Make sure you have a scene active.

- [ ] **Step 2: Create test actors**

Create a character named "Shapeshifter" with some stats. Then create an "Alternate Form" attribute and link an actor via the item sheet's "Create Linked Actor" button.

```js
let s=await Actor.create({name:"Shapeshifter",type:"character"});await s.update({"system.stats.body.value":5,"system.stats.mind.value":5,"system.stats.soul.value":5});await s.createEmbeddedDocuments("Item",[{name:"Alternate Form",type:"attribute",system:{baseCostPerLevel:4,purchasedLevel:3}}])
```

Then open the Shapeshifter sheet → click "Alternate Form" → click "Create Linked Actor".

- [ ] **Step 3: Set up the alt form**

Open the newly created linked actor's sheet. Set its stats (e.g., Body 8, Mind 3, Soul 3 — a beefy alternate form).

- [ ] **Step 4: Place a token**

Drag the Shapeshifter actor onto the active scene to create a token.

- [ ] **Step 5: Take some damage**

Reduce the Shapeshifter's HP in the Combat tab (or via console):

```js
game.actors.getName("Shapeshifter").update({"system.derived.currentHp":30})
```

- [ ] **Step 6: Test the swap**

Open the Shapeshifter sheet → Attributes tab → the "Alternate Form" row should have an "Open" button AND a "Swap" button on the badge.

Click "Swap". Check:
- The Shapeshifter token is removed from the scene
- A new token for the alternate form appears at the same position
- The alternate form's HP reflects the carried-over damage
- A notification appears: "Shapeshifter transforms into [alt form name]!"

- [ ] **Step 7: Clean up**

```js
for(const f of game.folders)await f.delete({deleteSubfolders:true,deleteContents:true});for(const a of game.actors)await a.delete();
```
