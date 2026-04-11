# Phase 1c — Skill Cost Resolution + SP Pool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement three-layer skill cost resolution and SP pool accounting so skill items auto-resolve their cost and actors track SP budget in point-buy mode.

**Architecture:** Pure resolution functions in `src/engine/skills.mjs` (no Foundry deps, testable via Vitest). `SkillData.prepareDerivedData()` calls the resolver. `CharacterData.prepareDerivedData()` computes SP pool totals. A new `costClass` field on SkillData stores the Layer 1 default.

**Tech Stack:** Vitest, Foundry VTT V14 TypeDataModel API

**Spec:** `docs/superpowers/specs/2026-04-11-phase1c-skills-sp-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/engine/skills.mjs` | Create | Pure skill resolution + SP functions |
| `tests/engine/skills.test.mjs` | Create | Unit tests for skill functions |
| `src/models/items/SkillData.mjs` | Modify | Add costClass field + prepareDerivedData() |
| `src/models/actors/CharacterData.mjs` | Modify | Add SP pool step to prepareDerivedData() |

---

### Task 1: Implement Skill Resolution Functions (TDD)

**Files:**
- Create: `tests/engine/skills.test.mjs`
- Create: `src/engine/skills.mjs`

- [ ] **Step 1: Write failing tests**

Create `tests/engine/skills.test.mjs`:

```js
import { describe, it, expect } from "vitest";
import {
  COST_CLASS_MAP, resolveSkillCost, computeSPPool, computeSPSpent,
} from "../../src/engine/skills.mjs";

describe("COST_CLASS_MAP", () => {
  it("maps framework to 1", () => {
    expect(COST_CLASS_MAP.framework).toBe(1);
  });

  it("maps adventure to 2", () => {
    expect(COST_CLASS_MAP.adventure).toBe(2);
  });

  it("maps genre to 3", () => {
    expect(COST_CLASS_MAP.genre).toBe(3);
  });
});

describe("resolveSkillCost", () => {
  it("returns base cost class when no overrides", () => {
    const result = resolveSkillCost("Acrobatics", "framework", {}, {});
    expect(result.costPerRank).toBe(1);
    expect(result.available).toBe(true);
  });

  it("applies genre override to cost class", () => {
    const genre = { "Acrobatics": { costClass: "genre" } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, {});
    expect(result.costPerRank).toBe(3);
  });

  it("applies genre override to availability", () => {
    const genre = { "Acrobatics": { available: false } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, {});
    expect(result.available).toBe(false);
  });

  it("world override wins over genre override", () => {
    const genre = { "Acrobatics": { costClass: "genre" } };
    const world = { "Acrobatics": { costClass: "adventure" } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, world);
    expect(result.costPerRank).toBe(2);
  });

  it("world override restores availability", () => {
    const genre = { "Acrobatics": { available: false } };
    const world = { "Acrobatics": { available: true } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, world);
    expect(result.available).toBe(true);
  });

  it("handles skill not in any override", () => {
    const genre = { "Swimming": { costClass: "genre" } };
    const world = { "Driving": { costClass: "adventure" } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, world);
    expect(result.costPerRank).toBe(1);
    expect(result.available).toBe(true);
  });

  it("genre override with only availability preserves base cost", () => {
    const genre = { "Acrobatics": { available: false } };
    const result = resolveSkillCost("Acrobatics", "adventure", genre, {});
    expect(result.costPerRank).toBe(2);
    expect(result.available).toBe(false);
  });
});

describe("computeSPPool", () => {
  it("returns level * 10", () => {
    expect(computeSPPool(5)).toBe(50);
  });

  it("returns 0 for level 0", () => {
    expect(computeSPPool(0)).toBe(0);
  });
});

describe("computeSPSpent", () => {
  it("sums rank * costPerRank for non-flavor skills", () => {
    const skills = [
      { rank: 3, resolvedCostPerRank: 2, isFlavor: false, specialisations: [] },
      { rank: 2, resolvedCostPerRank: 1, isFlavor: false, specialisations: [] },
    ];
    expect(computeSPSpent(skills)).toBe(8);
  });

  it("ignores flavor skills", () => {
    const skills = [
      { rank: 3, resolvedCostPerRank: 2, isFlavor: false, specialisations: [] },
      { rank: 5, resolvedCostPerRank: 3, isFlavor: true, specialisations: [] },
    ];
    expect(computeSPSpent(skills)).toBe(6);
  });

  it("includes paid specialisation costs", () => {
    const skills = [
      {
        rank: 2,
        resolvedCostPerRank: 1,
        isFlavor: false,
        specialisations: [
          { isFree: true, spCost: 0 },
          { isFree: false, spCost: 1 },
          { isFree: false, spCost: 1 },
        ],
      },
    ];
    expect(computeSPSpent(skills)).toBe(4);
  });

  it("returns 0 for empty array", () => {
    expect(computeSPSpent([])).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/engine/skills.test.mjs`
Expected: FAIL — cannot find module

- [ ] **Step 3: Implement skills.mjs**

Create `src/engine/skills.mjs`:

```js
export const COST_CLASS_MAP = {
  framework: 1,
  adventure: 2,
  genre: 3,
};

export function resolveSkillCost(skillName, baseCostClass, genreOverrides, worldOverrides) {
  let costClass = baseCostClass;
  let available = true;

  const genreEntry = genreOverrides[skillName];
  if (genreEntry) {
    if (genreEntry.costClass) costClass = genreEntry.costClass;
    if (genreEntry.available !== undefined) available = genreEntry.available;
  }

  const worldEntry = worldOverrides[skillName];
  if (worldEntry) {
    if (worldEntry.costClass) costClass = worldEntry.costClass;
    if (worldEntry.available !== undefined) available = worldEntry.available;
  }

  return {
    costPerRank: COST_CLASS_MAP[costClass] ?? 1,
    available,
  };
}

export function computeSPPool(skillsAttributeLevel) {
  return skillsAttributeLevel * 10;
}

export function computeSPSpent(skills) {
  return skills
    .filter(s => !s.isFlavor)
    .reduce((total, skill) => {
      const rankCost = skill.rank * skill.resolvedCostPerRank;
      const specCost = skill.specialisations
        .filter(s => !s.isFree)
        .reduce((sum, s) => sum + s.spCost, 0);
      return total + rankCost + specCost;
    }, 0);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/engine/skills.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Run all tests**

Run: `npx vitest run`
Expected: All tests across all files PASS

- [ ] **Step 6: Commit**

```bash
git add src/engine/skills.mjs tests/engine/skills.test.mjs
git commit -m "feat: add skill cost resolution and SP pool functions with tests"
```

---

### Task 2: Add costClass Field and prepareDerivedData() to SkillData

**Files:**
- Modify: `src/models/items/SkillData.mjs`

- [ ] **Step 1: Read the current file**

Read `src/models/items/SkillData.mjs` to see the current schema.

- [ ] **Step 2: Add import and costClass field**

At the top of `src/models/items/SkillData.mjs`, add:
```js
import { resolveSkillCost } from "../../engine/skills.mjs";
```

Inside `defineSchema()`, add after the `group` field (line 6):
```js
      costClass: new fields.StringField({
        initial: "framework",
        choices: ["framework", "adventure", "genre"],
      }),
```

- [ ] **Step 3: Add prepareDerivedData() method**

Inside the class body, after `defineSchema()`, add:
```js
  prepareDerivedData() {
    // Layer 2: genre overrides (empty until Phase 8 compendium data)
    const genreOverrides = {};

    // Layer 3: world overrides
    let worldOverrides = {};
    try {
      worldOverrides = game.settings.get("besm", "worldSkillOverrides") ?? {};
    } catch (e) {}

    // Resolve cost through three layers
    const result = resolveSkillCost(
      this.parent.name, this.costClass, genreOverrides, worldOverrides
    );

    this.resolvedCostPerRank = this.isFlavor ? 0 : result.costPerRank;
    this.isAvailable = result.available;

    // Compute total SP cost
    const rankCost = this.rank * this.resolvedCostPerRank;
    const specCost = this.specialisations
      .filter(s => !s.isFree)
      .reduce((sum, s) => sum + s.spCost, 0);
    this.totalSpCost = rankCost + specCost;
  }
```

- [ ] **Step 4: Build and test**

Run: `npm run build && npx vitest run`
Expected: Build succeeds, all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/models/items/SkillData.mjs
git commit -m "feat: add costClass field and prepareDerivedData() to SkillData"
```

---

### Task 3: Add SP Pool Calculation to CharacterData

**Files:**
- Modify: `src/models/actors/CharacterData.mjs`

- [ ] **Step 1: Read the current file**

Read `src/models/actors/CharacterData.mjs` to find the insertion point. The SP pool step goes after Step 5 (CP totals, ending with `this.cpRemaining = ...`) and before Step 6 (Combat values, starting with `this.derived.baseCv = ...`).

- [ ] **Step 2: Add import**

At the top of `src/models/actors/CharacterData.mjs`, add to the existing imports from `../../engine/calculations.mjs` — no change needed there. Add a new import:
```js
import { computeSPPool, computeSPSpent } from "../../engine/skills.mjs";
```

- [ ] **Step 3: Insert SP pool step**

In `prepareDerivedData()`, after the line `this.cpRemaining = this.cpTotal - this.cpSpent;` and before the comment `// Step 6: Combat values`, insert:

```js
    // Step 5b: SP pool (point-buy mode only)
    try {
      if (game.settings.get("besm", "skillMode") === "pointbuy") {
        const skillsAttr = items.find(
          i => i.type === "attribute" && i.system.isSkillsAttribute
        );
        if (skillsAttr) {
          const spPool = computeSPPool(skillsAttr.system.purchasedLevel);
          const skillItems = [...items].filter(i => i.type === "skill");
          const spSpent = computeSPSpent(skillItems.map(s => s.system));
          this.spPool = spPool;
          this.spSpent = spSpent;
          this.spRemaining = spPool - spSpent;
        }
      }
    } catch (e) { /* settings not yet registered during init */ }
```

- [ ] **Step 4: Build and test**

Run: `npm run build && npx vitest run`
Expected: Build succeeds, all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/models/actors/CharacterData.mjs
git commit -m "feat: add SP pool calculation to CharacterData prepareDerivedData()"
```

---

### Task 4: Foundry Console Verification

**Files:**
- None — manual testing in Foundry VTT V14

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Run verification script**

Paste this single block into the browser console:

```js
(async () => {
  // Create character with Skills Attribute
  let char = await Actor.create({name: "SP Test", type: "character"});
  await char.update({"system.stats.body.value": 5, "system.stats.mind.value": 5, "system.stats.soul.value": 5});

  // Add Skills Attribute (level 4 = 40 SP pool)
  await char.createEmbeddedDocuments("Item", [{
    name: "Skills", type: "attribute",
    system: { baseCostPerLevel: 2, purchasedLevel: 4, isSkillsAttribute: true }
  }]);

  char = game.actors.getName("SP Test");
  console.table({
    "spPool": [char.system.spPool, 40],
    "spSpent": [char.system.spSpent, 0],
    "spRemaining": [char.system.spRemaining, 40],
  });

  // Add a framework skill (rank 3 * 1 SP = 3 SP)
  await char.createEmbeddedDocuments("Item", [{
    name: "Acrobatics", type: "skill",
    system: { rank: 3, costClass: "framework", linkedStat: "body" }
  }]);

  // Add an adventure skill (rank 2 * 2 SP = 4 SP)
  await char.createEmbeddedDocuments("Item", [{
    name: "Military Sciences", type: "skill",
    system: { rank: 2, costClass: "adventure", linkedStat: "mind" }
  }]);

  // Add a flavor skill (should cost 0)
  await char.createEmbeddedDocuments("Item", [{
    name: "Cooking", type: "skill",
    system: { rank: 3, costClass: "framework", isFlavor: true, linkedStat: "mind" }
  }]);

  char = game.actors.getName("SP Test");
  console.table({
    "spPool": [char.system.spPool, 40],
    "spSpent": [char.system.spSpent, 7],
    "spRemaining": [char.system.spRemaining, 33],
  });

  // Check individual skill resolved costs
  const acro = char.items.getName("Acrobatics");
  const mil = char.items.getName("Military Sciences");
  const cook = char.items.getName("Cooking");
  console.table({
    "Acrobatics costPerRank": [acro.system.resolvedCostPerRank, 1],
    "Acrobatics totalSpCost": [acro.system.totalSpCost, 3],
    "Military costPerRank": [mil.system.resolvedCostPerRank, 2],
    "Military totalSpCost": [mil.system.totalSpCost, 4],
    "Cooking costPerRank": [cook.system.resolvedCostPerRank, 0],
    "Cooking totalSpCost": [cook.system.totalSpCost, 0],
  });

  // Test world override: bump Acrobatics to genre cost (3 SP/rank)
  await game.settings.set("besm", "worldSkillOverrides", {
    "Acrobatics": { costClass: "genre" }
  });

  // Re-fetch — Foundry should re-derive on settings change
  // Force re-derive by doing a trivial update
  await char.update({"system.notes": ""});
  char = game.actors.getName("SP Test");
  const acro2 = char.items.getName("Acrobatics");
  console.table({
    "Acrobatics after override costPerRank": [acro2.system.resolvedCostPerRank, 3],
    "Acrobatics after override totalSpCost": [acro2.system.totalSpCost, 9],
    "spSpent after override": [char.system.spSpent, 13],
    "spRemaining after override": [char.system.spRemaining, 27],
  });

  // Clean up
  await game.settings.set("besm", "worldSkillOverrides", {});
  for (const a of game.actors) await a.delete();
  console.log("Done — all SP tests complete, cleanup finished");
})();
```

Expected output: All `[actual, expected]` pairs match. The world override changes Acrobatics from 1 SP/rank to 3 SP/rank, updating both the skill and the actor's SP totals.
