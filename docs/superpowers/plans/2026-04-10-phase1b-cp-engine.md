# Phase 1b — CP Calculation Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all derived data calculations — stat costs, CP accounting, effective levels, combat values, HP/EP, and benchmark validation — as pure testable functions orchestrated by `prepareDerivedData()` on actor/item models.

**Architecture:** Pure calculation functions live in `src/engine/calculations.mjs` and `src/engine/benchmarks.mjs` with zero Foundry dependencies, tested via Vitest. Actor/item models call these functions from `prepareDerivedData()` to populate derived fields. The engine reads items by name to find specific attributes (Attack Mastery, Tough, etc.).

**Tech Stack:** Vitest (test runner), Foundry VTT V14 TypeDataModel API

**Spec:** `docs/superpowers/specs/2026-04-10-phase1b-cp-engine-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Modify | Add vitest devDependency and test script |
| `src/engine/calculations.mjs` | Create | Pure calculation functions (no Foundry deps) |
| `src/engine/benchmarks.mjs` | Create | Benchmark table + validation function |
| `tests/engine/calculations.test.mjs` | Create | Unit tests for all calculation functions |
| `tests/engine/benchmarks.test.mjs` | Create | Unit tests for benchmark validation |
| `src/models/items/AttributeData.mjs` | Modify | Add prepareDerivedData() |
| `src/models/actors/CharacterData.mjs` | Modify | Add prepareDerivedData() |
| `src/models/actors/NPCData.mjs` | Modify | Add prepareDerivedData() |
| `src/models/actors/VehicleData.mjs` | Modify | Add prepareDerivedData() |
| `src/models/actors/MechaData.mjs` | Modify | Add prepareDerivedData() |

---

### Task 1: Add Vitest Test Runner

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install vitest**

Run: `npm install --save-dev vitest`

- [ ] **Step 2: Add test script to package.json**

Add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Verify vitest works**

Run: `npx vitest run`
Expected: "No test files found" (no error — vitest is configured correctly)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add vitest test runner"
```

---

### Task 2: Implement Stat and Attribute Cost Functions (TDD)

**Files:**
- Create: `tests/engine/calculations.test.mjs`
- Create: `src/engine/calculations.mjs`

- [ ] **Step 1: Write failing tests for statCpCost**

Create `tests/engine/calculations.test.mjs`:

```js
import { describe, it, expect } from "vitest";
import { statCpCost, resolveStatValue, effectiveLevel, totalAttributeCost } from "../../src/engine/calculations.mjs";

describe("statCpCost", () => {
  it("returns 0 for value 0", () => {
    expect(statCpCost(0)).toBe(0);
  });

  it("costs 2 CP per point for values 1-12", () => {
    expect(statCpCost(1)).toBe(2);
    expect(statCpCost(4)).toBe(8);
    expect(statCpCost(12)).toBe(24);
  });

  it("costs 4 CP per point above 12", () => {
    expect(statCpCost(13)).toBe(28);
    expect(statCpCost(14)).toBe(32);
    expect(statCpCost(15)).toBe(36);
  });
});

describe("resolveStatValue", () => {
  it("returns value for normal mode", () => {
    expect(resolveStatValue({ value: 5, mode: "normal" })).toBe(5);
  });

  it("returns 0 for zero mode", () => {
    expect(resolveStatValue({ value: 5, mode: "zero" })).toBe(0);
  });

  it("returns null for missing mode", () => {
    expect(resolveStatValue({ value: 5, mode: "missing" })).toBeNull();
  });
});

describe("effectiveLevel", () => {
  it("returns purchasedLevel with no mods", () => {
    expect(effectiveLevel(3, [], [], false)).toBe(3);
  });

  it("subtracts enhancement levels", () => {
    expect(effectiveLevel(3, [{ levels: 1 }], [], false)).toBe(2);
  });

  it("adds limiter levels", () => {
    expect(effectiveLevel(3, [], [{ levels: 2 }], false)).toBe(5);
  });

  it("combines enhancements and limiters", () => {
    expect(effectiveLevel(3, [{ levels: 2 }], [{ levels: 1 }], false)).toBe(2);
  });

  it("floors at 0 for non-weapons", () => {
    expect(effectiveLevel(1, [{ levels: 5 }], [], false)).toBe(0);
  });

  it("floors at -1 for weapons", () => {
    expect(effectiveLevel(1, [{ levels: 5 }], [], true)).toBe(-1);
  });
});

describe("totalAttributeCost", () => {
  it("multiplies base cost by purchased level", () => {
    expect(totalAttributeCost(4, 3)).toBe(12);
  });

  it("returns 0 for level 0", () => {
    expect(totalAttributeCost(4, 0)).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: FAIL — cannot find module

- [ ] **Step 3: Implement the functions**

Create `src/engine/calculations.mjs`:

```js
export function statCpCost(value) {
  if (value <= 0) return 0;
  if (value <= 12) return value * 2;
  return (12 * 2) + ((value - 12) * 4);
}

export function resolveStatValue(stat) {
  if (stat.mode === "missing") return null;
  if (stat.mode === "zero") return 0;
  return stat.value;
}

export function effectiveLevel(purchasedLevel, enhancements, limiters, isWeapon) {
  const enhancementReduction = enhancements.reduce((sum, e) => sum + e.levels, 0);
  const limiterAddition = limiters.reduce((sum, l) => sum + l.levels, 0);
  const floor = isWeapon ? -1 : 0;
  return Math.max(floor, purchasedLevel - enhancementReduction + limiterAddition);
}

export function totalAttributeCost(baseCostPerLevel, purchasedLevel) {
  return baseCostPerLevel * purchasedLevel;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/engine/calculations.mjs tests/engine/calculations.test.mjs
git commit -m "feat: add stat cost, effective level, and attribute cost functions with tests"
```

---

### Task 3: Implement Combat Value Functions (TDD)

**Files:**
- Modify: `tests/engine/calculations.test.mjs`
- Modify: `src/engine/calculations.mjs`

- [ ] **Step 1: Write failing tests for computeBaseCv**

Append to `tests/engine/calculations.test.mjs`:

```js
import { computeBaseCv } from "../../src/engine/calculations.mjs";

describe("computeBaseCv", () => {
  it("averages all three stats", () => {
    expect(computeBaseCv(5, 5, 5)).toBe(5);
  });

  it("floors the result", () => {
    expect(computeBaseCv(5, 5, 4)).toBe(4);
  });

  it("excludes null stats from sum and divisor", () => {
    expect(computeBaseCv(6, null, 6)).toBe(6);
  });

  it("uses single stat when two are null", () => {
    expect(computeBaseCv(8, null, null)).toBe(8);
  });

  it("returns 0 when all stats are null", () => {
    expect(computeBaseCv(null, null, null)).toBe(0);
  });

  it("handles uneven values with missing stat", () => {
    expect(computeBaseCv(7, null, 4)).toBe(5);
  });
});
```

Update the import at the top of the file to include `computeBaseCv`:
```js
import { statCpCost, resolveStatValue, effectiveLevel, totalAttributeCost, computeBaseCv } from "../../src/engine/calculations.mjs";
```

- [ ] **Step 2: Run tests to verify new tests fail**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: computeBaseCv tests FAIL

- [ ] **Step 3: Implement computeBaseCv**

Append to `src/engine/calculations.mjs`:

```js
export function computeBaseCv(body, mind, soul) {
  const stats = [body, mind, soul].filter(v => v !== null);
  if (stats.length === 0) return 0;
  return Math.floor(stats.reduce((s, v) => s + v, 0) / stats.length);
}
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/engine/calculations.mjs tests/engine/calculations.test.mjs
git commit -m "feat: add combat value calculation with missing stat support"
```

---

### Task 4: Implement HP, EP, and Shock Value Functions (TDD)

**Files:**
- Modify: `tests/engine/calculations.test.mjs`
- Modify: `src/engine/calculations.mjs`

- [ ] **Step 1: Write failing tests**

Append to `tests/engine/calculations.test.mjs`:

```js
import { computeHP, computeEP, computeShockValue } from "../../src/engine/calculations.mjs";

describe("computeHP", () => {
  it("computes HP from body and soul", () => {
    const r = computeHP(5, 5, 0, 0);
    expect(r.hp).toBe(50);
    expect(r.applicable).toBe(true);
  });

  it("adds Tough bonus", () => {
    expect(computeHP(5, 5, 2, 0).hp).toBe(70);
  });

  it("subtracts Fragile reduction", () => {
    expect(computeHP(5, 5, 0, 1).hp).toBe(40);
  });

  it("uses soul * 10 when body is null", () => {
    expect(computeHP(null, 5, 0, 0).hp).toBe(50);
  });

  it("uses body * 10 when soul is null", () => {
    expect(computeHP(5, null, 0, 0).hp).toBe(50);
  });

  it("returns not applicable when both null", () => {
    const r = computeHP(null, null, 0, 0);
    expect(r.hp).toBe(0);
    expect(r.applicable).toBe(false);
  });

  it("floors HP at 0", () => {
    expect(computeHP(1, 1, 0, 3).hp).toBe(0);
  });
});

describe("computeEP", () => {
  it("computes EP from mind and soul", () => {
    const r = computeEP(5, 5, 0);
    expect(r.ep).toBe(50);
    expect(r.applicable).toBe(true);
  });

  it("adds Energised bonus", () => {
    expect(computeEP(5, 5, 2).ep).toBe(70);
  });

  it("uses soul * 10 when mind is null", () => {
    expect(computeEP(null, 5, 0).ep).toBe(50);
  });

  it("uses mind * 10 when soul is null", () => {
    expect(computeEP(5, null, 0).ep).toBe(50);
  });

  it("returns not applicable when both null", () => {
    const r = computeEP(null, null, 0);
    expect(r.ep).toBe(0);
    expect(r.applicable).toBe(false);
  });
});

describe("computeShockValue", () => {
  it("computes base shock value as HP/5", () => {
    expect(computeShockValue(50, true, 0)).toBe(10);
  });

  it("adds hardboiled bonus", () => {
    expect(computeShockValue(50, true, 1)).toBe(20);
  });

  it("caps at HP/2", () => {
    expect(computeShockValue(50, true, 5)).toBe(25);
  });

  it("returns 0 when not applicable", () => {
    expect(computeShockValue(0, false, 0)).toBe(0);
  });
});
```

Update the import at top to include the new functions:
```js
import {
  statCpCost, resolveStatValue, effectiveLevel, totalAttributeCost,
  computeBaseCv, computeHP, computeEP, computeShockValue
} from "../../src/engine/calculations.mjs";
```

- [ ] **Step 2: Run tests to verify new tests fail**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: New tests FAIL

- [ ] **Step 3: Implement the functions**

Append to `src/engine/calculations.mjs`:

```js
export function computeHP(body, soul, toughLevel, fragileLevel) {
  const toughBonus = toughLevel * 10;
  const fragileReduction = fragileLevel * 10;

  if (body !== null && soul !== null) {
    return { hp: Math.max(0, ((body + soul) * 5) + toughBonus - fragileReduction), applicable: true };
  }
  if (body === null && soul !== null) {
    return { hp: Math.max(0, (soul * 10) + toughBonus - fragileReduction), applicable: true };
  }
  if (soul === null && body !== null) {
    return { hp: Math.max(0, (body * 10) + toughBonus - fragileReduction), applicable: true };
  }
  return { hp: 0, applicable: false };
}

export function computeEP(mind, soul, energisedLevel) {
  const energisedBonus = energisedLevel * 10;

  if (mind !== null && soul !== null) {
    return { ep: ((mind + soul) * 5) + energisedBonus, applicable: true };
  }
  if (mind === null && soul !== null) {
    return { ep: (soul * 10) + energisedBonus, applicable: true };
  }
  if (soul === null && mind !== null) {
    return { ep: (mind * 10) + energisedBonus, applicable: true };
  }
  return { ep: 0, applicable: false };
}

export function computeShockValue(hp, hpApplicable, hardboiledCount) {
  if (!hpApplicable) return 0;
  const base = Math.floor(hp / 5);
  const bonus = hardboiledCount * 10;
  const cap = Math.floor(hp / 2);
  return Math.min(cap, base + bonus);
}
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/engine/calculations.mjs tests/engine/calculations.test.mjs
git commit -m "feat: add HP, EP, and shock value calculations with tests"
```

---

### Task 5: Implement Damage, Movement, Sanity, and Social Functions (TDD)

**Files:**
- Modify: `tests/engine/calculations.test.mjs`
- Modify: `src/engine/calculations.mjs`

- [ ] **Step 1: Write failing tests**

Append to `tests/engine/calculations.test.mjs`:

```js
import {
  computeDamageMultipliers, computeMovement, computeSanity, computeSocv
} from "../../src/engine/calculations.mjs";

describe("computeDamageMultipliers", () => {
  it("returns base 5 with no attributes", () => {
    const r = computeDamageMultipliers(0, 0);
    expect(r.base).toBe(5);
    expect(r.melee).toBe(5);
  });

  it("adds Massive Damage to both", () => {
    const r = computeDamageMultipliers(3, 0);
    expect(r.base).toBe(8);
    expect(r.melee).toBe(8);
  });

  it("adds Superstrength to melee only", () => {
    const r = computeDamageMultipliers(2, 3);
    expect(r.base).toBe(7);
    expect(r.melee).toBe(10);
  });
});

describe("computeMovement", () => {
  it("computes all speeds from body", () => {
    const r = computeMovement(10);
    expect(r.walkSpeed).toBe(10);
    expect(r.jogSpeed).toBe(15);
    expect(r.runSpeed).toBe(20);
    expect(r.sprintSpeed).toBe(40);
    expect(r.swimSpeed).toBe(5);
    expect(r.jumpDistanceStationary).toBe(2);
    expect(r.jumpDistanceMoving).toBe(10);
  });

  it("returns all zeros when body is null", () => {
    const r = computeMovement(null);
    expect(r.walkSpeed).toBe(0);
    expect(r.sprintSpeed).toBe(0);
  });
});

describe("computeSanity", () => {
  it("computes sanity from mind and soul", () => {
    expect(computeSanity(5, 5, 0, 0)).toBe(10);
  });

  it("adds unassailable bonus", () => {
    expect(computeSanity(5, 5, 2, 0)).toBe(14);
  });

  it("subtracts unsettled reduction", () => {
    expect(computeSanity(5, 5, 0, 1)).toBe(8);
  });

  it("returns null when mind is null", () => {
    expect(computeSanity(null, 5, 0, 0)).toBeNull();
  });

  it("returns null when soul is null", () => {
    expect(computeSanity(5, null, 0, 0)).toBeNull();
  });
});

describe("computeSocv", () => {
  it("computes SoCV as floor of average", () => {
    expect(computeSocv(5, 5)).toBe(5);
    expect(computeSocv(5, 4)).toBe(4);
  });

  it("returns null when mind is null", () => {
    expect(computeSocv(null, 5)).toBeNull();
  });

  it("returns null when soul is null", () => {
    expect(computeSocv(5, null)).toBeNull();
  });
});
```

Update the main import at the top to include all functions:
```js
import {
  statCpCost, resolveStatValue, effectiveLevel, totalAttributeCost,
  computeBaseCv, computeHP, computeEP, computeShockValue,
  computeDamageMultipliers, computeMovement, computeSanity, computeSocv
} from "../../src/engine/calculations.mjs";
```

- [ ] **Step 2: Run tests to verify new tests fail**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: New tests FAIL

- [ ] **Step 3: Implement the functions**

Append to `src/engine/calculations.mjs`:

```js
export function computeDamageMultipliers(massiveDamageLevel, superstrengthLevel) {
  return {
    base: 5 + massiveDamageLevel,
    melee: 5 + massiveDamageLevel + superstrengthLevel,
  };
}

export function computeMovement(body) {
  if (body === null) {
    return {
      walkSpeed: 0, jogSpeed: 0, runSpeed: 0, sprintSpeed: 0,
      swimSpeed: 0, jumpDistanceStationary: 0, jumpDistanceMoving: 0,
    };
  }
  const sprintSpeed = body * 4;
  return {
    walkSpeed: body * 1,
    jogSpeed: Math.round(body * 1.5),
    runSpeed: body * 2,
    sprintSpeed,
    swimSpeed: Math.round(body * 0.5),
    jumpDistanceStationary: Math.floor(body / 4),
    jumpDistanceMoving: Math.floor(sprintSpeed / 4),
  };
}

export function computeSanity(mind, soul, unassailableLevel, unsettledLevel) {
  if (mind === null || soul === null) return null;
  return (mind + soul) + (unassailableLevel * 2) - (unsettledLevel * 2);
}

export function computeSocv(mind, soul) {
  if (mind === null || soul === null) return null;
  return Math.floor((mind + soul) / 2);
}
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `npx vitest run tests/engine/calculations.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/engine/calculations.mjs tests/engine/calculations.test.mjs
git commit -m "feat: add damage, movement, sanity, and social combat calculations with tests"
```

---

### Task 6: Implement Benchmark Validation (TDD)

**Files:**
- Create: `tests/engine/benchmarks.test.mjs`
- Create: `src/engine/benchmarks.mjs`

- [ ] **Step 1: Write failing tests**

Create `tests/engine/benchmarks.test.mjs`:

```js
import { describe, it, expect } from "vitest";
import { validateBenchmarks, POWER_LEVEL_BENCHMARKS } from "../../src/engine/benchmarks.mjs";

describe("POWER_LEVEL_BENCHMARKS", () => {
  it("has all 8 power levels", () => {
    expect(Object.keys(POWER_LEVEL_BENCHMARKS)).toHaveLength(8);
  });

  it("adventurer has correct values", () => {
    const b = POWER_LEVEL_BENCHMARKS.adventurer;
    expect(b.maxStat).toBe(9);
    expect(b.maxAttrLevel).toBe(4);
  });
});

describe("validateBenchmarks", () => {
  const baseStats = {
    body: { value: 5, mode: "normal" },
    mind: { value: 5, mode: "normal" },
    soul: { value: 5, mode: "normal" },
  };

  it("returns valid for within-bounds character", () => {
    const items = [];
    const derived = { acv: 5, hp: 50, damageMultiplier: 5 };
    const result = validateBenchmarks("adventurer", baseStats, items, derived);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it("warns when stat exceeds max", () => {
    const stats = {
      ...baseStats,
      body: { value: 12, mode: "normal" },
    };
    const result = validateBenchmarks("adventurer", stats, [], { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("body"))).toBe(true);
  });

  it("skips missing stats", () => {
    const stats = {
      ...baseStats,
      body: { value: 12, mode: "missing" },
    };
    const result = validateBenchmarks("adventurer", stats, [], { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(true);
  });

  it("warns when attribute exceeds level cap", () => {
    const items = [
      { system: { effectiveLevel: 6, isBenchmarkException: false }, name: "Teleportation", type: "attribute" },
    ];
    const result = validateBenchmarks("adventurer", baseStats, items, { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("Teleportation"))).toBe(true);
  });

  it("skips benchmark exception attributes", () => {
    const items = [
      { system: { effectiveLevel: 10, isBenchmarkException: true }, name: "Combat Technique", type: "attribute" },
    ];
    const result = validateBenchmarks("adventurer", baseStats, items, { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(true);
  });

  it("warns when ACV exceeds max", () => {
    const result = validateBenchmarks("adventurer", baseStats, [], { acv: 12, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("ACV"))).toBe(true);
  });

  it("warns when HP exceeds max", () => {
    const result = validateBenchmarks("adventurer", baseStats, [], { acv: 5, hp: 100, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("HP"))).toBe(true);
  });

  it("handles godlike with null caps", () => {
    const result = validateBenchmarks("godlike", baseStats, [
      { system: { effectiveLevel: 99, isBenchmarkException: false }, name: "Power", type: "attribute" },
    ], { acv: 50, hp: 500, damageMultiplier: 20 });
    expect(result.valid).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/engine/benchmarks.test.mjs`
Expected: FAIL — cannot find module

- [ ] **Step 3: Implement benchmarks.mjs**

Create `src/engine/benchmarks.mjs`:

```js
export const POWER_LEVEL_BENCHMARKS = {
  subhuman:     { cpMax: 24,   maxStat: 5,    maxAttrLevel: 2,  cvMin: 1, cvMax: 6,    hpMin: 10,  hpMax: 40,   dmgMin: 2, dmgMax: 4    },
  human:        { cpMax: 49,   maxStat: 7,    maxAttrLevel: 3,  cvMin: 2, cvMax: 7,    hpMin: 30,  hpMax: 60,   dmgMin: 3, dmgMax: 6    },
  adventurer:   { cpMax: 74,   maxStat: 9,    maxAttrLevel: 4,  cvMin: 3, cvMax: 8,    hpMin: 40,  hpMax: 80,   dmgMin: 4, dmgMax: 8    },
  heroic:       { cpMax: 99,   maxStat: 10,   maxAttrLevel: 5,  cvMin: 4, cvMax: 9,    hpMin: 50,  hpMax: 100,  dmgMin: 4, dmgMax: 9    },
  mythical:     { cpMax: 149,  maxStat: 12,   maxAttrLevel: 6,  cvMin: 5, cvMax: 10,   hpMin: 60,  hpMax: 120,  dmgMin: 5, dmgMax: 10   },
  superhuman:   { cpMax: 199,  maxStat: null, maxAttrLevel: 8,  cvMin: 6, cvMax: 12,   hpMin: 70,  hpMax: 140,  dmgMin: 5, dmgMax: 11   },
  superpowered: { cpMax: 249,  maxStat: null, maxAttrLevel: 9,  cvMin: 7, cvMax: null,  hpMin: 80,  hpMax: 160,  dmgMin: 6, dmgMax: 12   },
  godlike:      { cpMax: null, maxStat: null, maxAttrLevel: null, cvMin: 8, cvMax: null, hpMin: 100, hpMax: null, dmgMin: 6, dmgMax: null },
};

export function validateBenchmarks(powerLevel, stats, items, derived) {
  const bench = POWER_LEVEL_BENCHMARKS[powerLevel];
  if (!bench) return { warnings: [], valid: true };

  const warnings = [];

  if (bench.maxStat) {
    for (const [key, stat] of Object.entries(stats)) {
      if (stat.mode === "missing") continue;
      const val = stat.mode === "zero" ? 0 : stat.value;
      if (val > bench.maxStat) {
        warnings.push(`${key} (${val}) exceeds recommended stat max of ${bench.maxStat}`);
      }
    }
  }

  if (bench.maxAttrLevel) {
    for (const item of items) {
      if (item.type !== "attribute") continue;
      if (item.system.isBenchmarkException) continue;
      if (item.system.effectiveLevel > bench.maxAttrLevel) {
        warnings.push(`${item.name} effective level (${item.system.effectiveLevel}) exceeds recommended max of ${bench.maxAttrLevel}`);
      }
    }
  }

  if (bench.cvMin && derived.acv < bench.cvMin) {
    warnings.push(`ACV (${derived.acv}) is below recommended minimum of ${bench.cvMin}`);
  }
  if (bench.cvMax && derived.acv > bench.cvMax) {
    warnings.push(`ACV (${derived.acv}) exceeds recommended maximum of ${bench.cvMax}`);
  }

  if (bench.hpMin && derived.hp < bench.hpMin) {
    warnings.push(`HP (${derived.hp}) is below recommended minimum of ${bench.hpMin}`);
  }
  if (bench.hpMax && derived.hp > bench.hpMax) {
    warnings.push(`HP (${derived.hp}) exceeds recommended maximum of ${bench.hpMax}`);
  }

  return { warnings, valid: warnings.length === 0 };
}
```

- [ ] **Step 4: Run tests to verify all pass**

Run: `npx vitest run tests/engine/benchmarks.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Run all tests**

Run: `npx vitest run`
Expected: All tests across both files PASS

- [ ] **Step 6: Commit**

```bash
git add src/engine/benchmarks.mjs tests/engine/benchmarks.test.mjs
git commit -m "feat: add benchmark table and validation function with tests"
```

---

### Task 7: Add prepareDerivedData() to AttributeData

**Files:**
- Modify: `src/models/items/AttributeData.mjs`

- [ ] **Step 1: Add import and prepareDerivedData()**

At the top of `src/models/items/AttributeData.mjs`, add the import:
```js
import { effectiveLevel, totalAttributeCost } from "../../engine/calculations.mjs";
```

Inside the class body, after `defineSchema()`, add:
```js
  prepareDerivedData() {
    this.effectiveLevel = effectiveLevel(
      this.purchasedLevel, this.enhancements, this.limiters, this.isWeapon
    );
    this.totalCost = totalAttributeCost(this.baseCostPerLevel, this.purchasedLevel);
  }
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/models/items/AttributeData.mjs
git commit -m "feat: add prepareDerivedData() to AttributeData for effective level and cost"
```

---

### Task 8: Add prepareDerivedData() to CharacterData

**Files:**
- Modify: `src/models/actors/CharacterData.mjs`

This is the largest single change. The method orchestrates all pure functions to populate derived fields.

- [ ] **Step 1: Add imports**

At the top of `src/models/actors/CharacterData.mjs`, add:
```js
import {
  statCpCost, resolveStatValue, computeBaseCv,
  computeHP, computeEP, computeShockValue,
  computeDamageMultipliers, computeMovement, computeSanity, computeSocv,
} from "../../engine/calculations.mjs";
import { validateBenchmarks } from "../../engine/benchmarks.mjs";
```

- [ ] **Step 2: Add prepareDerivedData() method**

Inside the class body, after `defineSchema()`, add:
```js
  prepareDerivedData() {
    const items = this.parent.items;

    // Step 1: Resolve stat values
    const bv = resolveStatValue(this.stats.body);
    const mv = resolveStatValue(this.stats.mind);
    const sv = resolveStatValue(this.stats.soul);

    // Step 2: Stat CP costs
    for (const stat of Object.values(this.stats)) {
      stat.cpCost = stat.mode === "missing" ? 0 : statCpCost(stat.value);
    }
    const statCP = Object.values(this.stats).reduce((sum, s) => sum + s.cpCost, 0);

    // Step 3: Attribute CP
    const attributeCP = items
      .filter(i => i.type === "attribute")
      .reduce((sum, attr) => sum + attr.system.totalCost, 0);

    // Step 4: Defect CP grants
    const defectCP = items
      .filter(i => i.type === "defect")
      .reduce((sum, d) => sum + d.system.cpGranted, 0);

    // Step 5: CP totals
    this.cpTotal = this.cpBase + defectCP;
    this.cpSpent = statCP + attributeCP;
    this.cpRemaining = this.cpTotal - this.cpSpent;

    // Step 6: Combat values
    this.derived.baseCv = computeBaseCv(bv, mv, sv);

    const attackMastery = items.find(
      i => i.type === "attribute" && i.name === "Attack Mastery"
    );
    this.derived.acv = this.derived.baseCv + (attackMastery?.system.effectiveLevel ?? 0);

    const defenceMastery = items.find(
      i => i.type === "attribute" && i.name === "Defence Mastery"
    );
    this.derived.dcv = this.derived.baseCv + (defenceMastery?.system.effectiveLevel ?? 0);

    // Step 7: HP
    const tough = items.find(i => i.type === "attribute" && i.name === "Tough");
    const fragile = items.find(i => i.type === "defect" && i.name === "Fragile");
    const hpResult = computeHP(bv, sv, tough?.system.effectiveLevel ?? 0, fragile?.system.rankLevel ?? 0);
    this.derived.hp = hpResult.hp;
    this.derived.hpMax = hpResult.hp;
    this.derived.hpApplicable = hpResult.applicable;

    // Step 8: EP
    const energised = items.find(i => i.type === "attribute" && i.name === "Energised");
    const epResult = computeEP(mv, sv, energised?.system.effectiveLevel ?? 0);
    this.derived.ep = epResult.ep;
    this.derived.epMax = epResult.ep;
    this.derived.epApplicable = epResult.applicable;

    // Step 9: Shock Value
    const hardboiledCount = items.filter(
      i => i.type === "attribute" && i.name === "Combat Technique (Hardboiled)"
    ).length;
    this.derived.sv = computeShockValue(this.derived.hp, this.derived.hpApplicable, hardboiledCount);

    // Step 10: Damage Multipliers
    const massiveDamage = items.find(i => i.type === "attribute" && i.name === "Massive Damage");
    const superstrength = items.find(i => i.type === "attribute" && i.name === "Superstrength");
    const dm = computeDamageMultipliers(
      massiveDamage?.system.effectiveLevel ?? 0,
      superstrength?.system.effectiveLevel ?? 0
    );
    this.derived.damageMultiplier = dm.base;
    this.derived.meleeDamageMultiplier = dm.melee;

    // Step 11: AR
    this.derived.ar = items
      .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
      .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);

    // Step 12: Movement
    const movement = computeMovement(bv);
    Object.assign(this.derived, movement);

    // Step 13: Sanity (settings-gated)
    try {
      if (game.settings.get("besm", "sanityEnabled")) {
        const unassailable = items.find(i => i.type === "attribute" && i.name === "Unassailable");
        const unsettled = items.find(i => i.type === "defect" && i.name === "Unsettled");
        const sanity = computeSanity(mv, sv, unassailable?.system.effectiveLevel ?? 0, unsettled?.system.rankLevel ?? 0);
        if (sanity !== null) {
          this.derived.sanityPoints = sanity;
          this.derived.sanityMax = sanity;
        }
      }
    } catch (e) { /* settings not yet registered during init */ }

    // Step 14: Social Combat (settings-gated)
    try {
      if (game.settings.get("besm", "socialCombatEnabled")) {
        const socv = computeSocv(mv, sv);
        if (socv !== null) {
          this.derived.socv = socv;
          this.derived.societyPoints = socv;
          this.derived.societyPointsMax = socv;
        }
      }
    } catch (e) { /* settings not yet registered during init */ }

    // Step 15: Benchmark validation (settings-gated)
    try {
      if (game.settings.get("besm", "enforceBenchmarks")) {
        const powerLevel = game.settings.get("besm", "powerLevel");
        const result = validateBenchmarks(powerLevel, this.stats, [...items], this.derived);
        this.benchmarkWarnings = result.warnings;
        this.benchmarkValid = result.valid;
      } else {
        this.benchmarkWarnings = [];
        this.benchmarkValid = true;
      }
    } catch (e) {
      this.benchmarkWarnings = [];
      this.benchmarkValid = true;
    }
  }
```

Note: `try/catch` around `game.settings.get()` is needed because `prepareDerivedData()` may be called during system init before settings are fully registered. The catch silently defaults to "off" for optional features.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Run all tests**

Run: `npx vitest run`
Expected: All tests still PASS (model changes don't affect pure function tests)

- [ ] **Step 5: Commit**

```bash
git add src/models/actors/CharacterData.mjs
git commit -m "feat: add prepareDerivedData() to CharacterData with full CP engine"
```

---

### Task 9: Add prepareDerivedData() to NPCData, VehicleData, MechaData

**Files:**
- Modify: `src/models/actors/NPCData.mjs`
- Modify: `src/models/actors/VehicleData.mjs`
- Modify: `src/models/actors/MechaData.mjs`

- [ ] **Step 1: Add prepareDerivedData() to NPCData**

At the top of `src/models/actors/NPCData.mjs`, add:
```js
import {
  statCpCost, resolveStatValue, computeBaseCv,
  computeHP, computeEP, computeShockValue,
  computeDamageMultipliers, computeMovement, computeSanity, computeSocv,
} from "../../engine/calculations.mjs";
import { validateBenchmarks } from "../../engine/benchmarks.mjs";
```

Inside the class body, after `defineSchema()`, add the same `prepareDerivedData()` method as CharacterData but without SP pool or advancement references. Since NPCData has the same derived fields as CharacterData (same stats, same derived block), the method is identical:

```js
  prepareDerivedData() {
    const items = this.parent.items;

    const bv = resolveStatValue(this.stats.body);
    const mv = resolveStatValue(this.stats.mind);
    const sv = resolveStatValue(this.stats.soul);

    for (const stat of Object.values(this.stats)) {
      stat.cpCost = stat.mode === "missing" ? 0 : statCpCost(stat.value);
    }
    const statCP = Object.values(this.stats).reduce((sum, s) => sum + s.cpCost, 0);

    const attributeCP = items
      .filter(i => i.type === "attribute")
      .reduce((sum, attr) => sum + attr.system.totalCost, 0);

    const defectCP = items
      .filter(i => i.type === "defect")
      .reduce((sum, d) => sum + d.system.cpGranted, 0);

    this.cpTotal = this.cpBase + defectCP;
    this.cpSpent = statCP + attributeCP;
    this.cpRemaining = this.cpTotal - this.cpSpent;

    this.derived.baseCv = computeBaseCv(bv, mv, sv);

    const attackMastery = items.find(i => i.type === "attribute" && i.name === "Attack Mastery");
    this.derived.acv = this.derived.baseCv + (attackMastery?.system.effectiveLevel ?? 0);

    const defenceMastery = items.find(i => i.type === "attribute" && i.name === "Defence Mastery");
    this.derived.dcv = this.derived.baseCv + (defenceMastery?.system.effectiveLevel ?? 0);

    const tough = items.find(i => i.type === "attribute" && i.name === "Tough");
    const fragile = items.find(i => i.type === "defect" && i.name === "Fragile");
    const hpResult = computeHP(bv, sv, tough?.system.effectiveLevel ?? 0, fragile?.system.rankLevel ?? 0);
    this.derived.hp = hpResult.hp;
    this.derived.hpMax = hpResult.hp;
    this.derived.hpApplicable = hpResult.applicable;

    const energised = items.find(i => i.type === "attribute" && i.name === "Energised");
    const epResult = computeEP(mv, sv, energised?.system.effectiveLevel ?? 0);
    this.derived.ep = epResult.ep;
    this.derived.epMax = epResult.ep;
    this.derived.epApplicable = epResult.applicable;

    const hardboiledCount = items.filter(i => i.type === "attribute" && i.name === "Combat Technique (Hardboiled)").length;
    this.derived.sv = computeShockValue(this.derived.hp, this.derived.hpApplicable, hardboiledCount);

    const massiveDamage = items.find(i => i.type === "attribute" && i.name === "Massive Damage");
    const superstrength = items.find(i => i.type === "attribute" && i.name === "Superstrength");
    const dm = computeDamageMultipliers(massiveDamage?.system.effectiveLevel ?? 0, superstrength?.system.effectiveLevel ?? 0);
    this.derived.damageMultiplier = dm.base;
    this.derived.meleeDamageMultiplier = dm.melee;

    this.derived.ar = items
      .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
      .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);

    Object.assign(this.derived, computeMovement(bv));

    try {
      if (game.settings.get("besm", "sanityEnabled")) {
        const unassailable = items.find(i => i.type === "attribute" && i.name === "Unassailable");
        const unsettled = items.find(i => i.type === "defect" && i.name === "Unsettled");
        const sanity = computeSanity(mv, sv, unassailable?.system.effectiveLevel ?? 0, unsettled?.system.rankLevel ?? 0);
        if (sanity !== null) { this.derived.sanityPoints = sanity; this.derived.sanityMax = sanity; }
      }
    } catch (e) {}

    try {
      if (game.settings.get("besm", "socialCombatEnabled")) {
        const socv = computeSocv(mv, sv);
        if (socv !== null) { this.derived.socv = socv; this.derived.societyPoints = socv; this.derived.societyPointsMax = socv; }
      }
    } catch (e) {}

    try {
      if (game.settings.get("besm", "enforceBenchmarks")) {
        const powerLevel = game.settings.get("besm", "powerLevel");
        const result = validateBenchmarks(powerLevel, this.stats, [...items], this.derived);
        this.benchmarkWarnings = result.warnings;
        this.benchmarkValid = result.valid;
      }
    } catch (e) {}
  }
```

- [ ] **Step 2: Add prepareDerivedData() to VehicleData**

At the top of `src/models/actors/VehicleData.mjs`, add:
```js
import { statCpCost, resolveStatValue, computeHP } from "../../engine/calculations.mjs";
```

Inside the class body, after `defineSchema()`, add:
```js
  prepareDerivedData() {
    const items = this.parent.items;

    for (const stat of Object.values(this.stats)) {
      stat.cpCost = stat.mode === "missing" ? 0 : statCpCost(stat.value);
    }
    const statCP = Object.values(this.stats).reduce((sum, s) => sum + s.cpCost, 0);

    const attributeCP = items
      .filter(i => i.type === "attribute")
      .reduce((sum, attr) => sum + attr.system.totalCost, 0);

    const defectCP = items
      .filter(i => i.type === "defect")
      .reduce((sum, d) => sum + d.system.cpGranted, 0);

    this.cpTotal = this.cpBase + defectCP;
    this.cpSpent = statCP + attributeCP;
    this.cpRemaining = this.cpTotal - this.cpSpent;

    const bv = resolveStatValue(this.stats.body);
    const sv = resolveStatValue(this.stats.soul);

    const tough = items.find(i => i.type === "attribute" && i.name === "Tough");
    const fragile = items.find(i => i.type === "defect" && i.name === "Fragile");
    const hpResult = computeHP(bv, sv, tough?.system.effectiveLevel ?? 0, fragile?.system.rankLevel ?? 0);
    this.derived.hp = hpResult.hp;
    this.derived.hpMax = hpResult.hp;
    this.derived.hpApplicable = hpResult.applicable;

    this.derived.ar = items
      .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
      .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);
  }
```

- [ ] **Step 3: Add prepareDerivedData() to MechaData**

At the top of `src/models/actors/MechaData.mjs`, add:
```js
import {
  statCpCost, resolveStatValue, computeBaseCv,
  computeHP, computeDamageMultipliers,
} from "../../engine/calculations.mjs";
```

Inside the class body, after `defineSchema()`, add:
```js
  prepareDerivedData() {
    const items = this.parent.items;

    for (const stat of Object.values(this.stats)) {
      stat.cpCost = stat.mode === "missing" ? 0 : statCpCost(stat.value);
    }
    const statCP = Object.values(this.stats).reduce((sum, s) => sum + s.cpCost, 0);

    const attributeCP = items
      .filter(i => i.type === "attribute")
      .reduce((sum, attr) => sum + attr.system.totalCost, 0);

    const defectCP = items
      .filter(i => i.type === "defect")
      .reduce((sum, d) => sum + d.system.cpGranted, 0);

    this.cpTotal = this.cpBase + defectCP;
    this.cpSpent = statCP + attributeCP;
    this.cpRemaining = this.cpTotal - this.cpSpent;

    const bv = resolveStatValue(this.stats.body);
    const mv = resolveStatValue(this.stats.mind);
    const sv = resolveStatValue(this.stats.soul);

    this.derived.baseCv = computeBaseCv(bv, mv, sv);

    const attackMastery = items.find(i => i.type === "attribute" && i.name === "Attack Mastery");
    this.derived.acv = this.derived.baseCv + (attackMastery?.system.effectiveLevel ?? 0);

    const defenceMastery = items.find(i => i.type === "attribute" && i.name === "Defence Mastery");
    this.derived.dcv = this.derived.baseCv + (defenceMastery?.system.effectiveLevel ?? 0);

    const tough = items.find(i => i.type === "attribute" && i.name === "Tough");
    const fragile = items.find(i => i.type === "defect" && i.name === "Fragile");
    const hpResult = computeHP(bv, sv, tough?.system.effectiveLevel ?? 0, fragile?.system.rankLevel ?? 0);
    this.derived.hp = hpResult.hp;
    this.derived.hpMax = hpResult.hp;
    this.derived.hpApplicable = hpResult.applicable;

    this.derived.ar = items
      .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
      .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);

    const massiveDamage = items.find(i => i.type === "attribute" && i.name === "Massive Damage");
    const superstrength = items.find(i => i.type === "attribute" && i.name === "Superstrength");
    const dm = computeDamageMultipliers(massiveDamage?.system.effectiveLevel ?? 0, superstrength?.system.effectiveLevel ?? 0);
    this.derived.damageMultiplier = dm.base;
    this.derived.meleeDamageMultiplier = dm.melee;
  }
```

- [ ] **Step 4: Build and test**

Run: `npm run build && npx vitest run`
Expected: Build succeeds, all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/models/actors/NPCData.mjs src/models/actors/VehicleData.mjs src/models/actors/MechaData.mjs
git commit -m "feat: add prepareDerivedData() to NPC, Vehicle, and Mecha actors"
```

---

### Task 10: Foundry Console Verification

**Files:**
- None — manual testing in Foundry VTT V14

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Verify stat CP costs**

```js
let char = await Actor.create({name: "CP Test", type: "character"});
await char.update({"system.stats.body.value": 4, "system.stats.mind.value": 12, "system.stats.soul.value": 13});
console.log("Body cost:", char.system.stats.body.cpCost);   // 8
console.log("Mind cost:", char.system.stats.mind.cpCost);   // 24
console.log("Soul cost:", char.system.stats.soul.cpCost);   // 28
console.log("cpSpent:", char.system.cpSpent);                // 60
console.log("cpTotal:", char.system.cpTotal);                // 50
console.log("cpRemaining:", char.system.cpRemaining);        // -10
```

- [ ] **Step 3: Verify derived combat values**

```js
console.log("baseCv:", char.system.derived.baseCv);   // floor((4+12+13)/3) = 9
console.log("acv:", char.system.derived.acv);          // 9 (no Attack Mastery)
console.log("dcv:", char.system.derived.dcv);          // 9 (no Defence Mastery)
```

- [ ] **Step 4: Verify HP and EP**

```js
console.log("hp:", char.system.derived.hp);     // (4+13)*5 = 85
console.log("ep:", char.system.derived.ep);     // (12+13)*5 = 125
console.log("sv:", char.system.derived.sv);     // floor(85/5) = 17
console.log("dm base:", char.system.derived.damageMultiplier);       // 5
console.log("dm melee:", char.system.derived.meleeDamageMultiplier); // 5
```

- [ ] **Step 5: Add an attribute and verify CP updates**

```js
let attr = await Item.create({name: "Superstrength", type: "attribute", system: { baseCostPerLevel: 4, purchasedLevel: 3 }});
await char.createEmbeddedDocuments("Item", [attr.toObject()]);

// Re-fetch to get updated derived data
char = game.actors.getName("CP Test");
console.log("cpSpent:", char.system.cpSpent);   // 60 (stats) + 12 (attr) = 72
console.log("cpRemaining:", char.system.cpRemaining); // 50 - 72 = -22
console.log("dm melee:", char.system.derived.meleeDamageMultiplier); // 5 + 3 = 8
```

- [ ] **Step 6: Verify missing stat mode**

```js
await char.update({"system.stats.body.mode": "missing"});
char = game.actors.getName("CP Test");
console.log("baseCv:", char.system.derived.baseCv);  // floor((12+13)/2) = 12
console.log("hp:", char.system.derived.hp);           // soul*10 = 130
console.log("body cpCost:", char.system.stats.body.cpCost); // 0
```

- [ ] **Step 7: Verify benchmark warnings**

```js
console.log("benchmarkValid:", char.system.benchmarkValid);
console.log("warnings:", char.system.benchmarkWarnings);
// Should have warnings — stats and CV likely exceed adventurer benchmarks
```

- [ ] **Step 8: Clean up**

```js
for (const a of game.actors) await a.delete();
for (const i of game.items) await i.delete();
```
