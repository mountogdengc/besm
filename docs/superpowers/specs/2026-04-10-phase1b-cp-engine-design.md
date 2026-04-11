# Phase 1b — CP Calculation Engine: Design Spec

**Goal:** Implement all derived data logic — stat costs, CP accounting, effective levels, combat values, HP, EP, and optional derived stats — as pure functions in a utility module, orchestrated by `prepareDerivedData()` on actor and item models.

**Exit criteria:** Create a character in the Foundry console, set stats, add attribute/defect items, and verify: stat CP costs calculate correctly (tiered formula), CP totals update, effective levels resolve with enhancements/limiters, HP/EP/CV derive from stats, benchmark warnings fire. All math testable independently of Foundry via unit tests on the pure functions.

---

## File Structure

```
src/
├── engine/
│   └── calculations.mjs        ← pure functions, no Foundry dependencies
├── models/
│   ├── actors/
│   │   ├── CharacterData.mjs   ← modified: add prepareDerivedData()
│   │   ├── NPCData.mjs         ← modified: add prepareDerivedData()
│   │   ├── VehicleData.mjs     ← modified: add prepareDerivedData() (minimal)
│   │   └── MechaData.mjs       ← modified: add prepareDerivedData() (minimal)
│   └── items/
│       └── AttributeData.mjs   ← modified: add prepareDerivedData()
└── engine/
    └── benchmarks.mjs           ← benchmark table + validation function
```

---

## Pure Calculation Functions (src/engine/calculations.mjs)

All functions are pure — no `this`, no Foundry globals, no side effects. Each takes explicit arguments and returns a value.

### statCpCost(value)

```
Input: stat value (integer >= 0)
Output: CP cost (integer)

Formula:
  value 0: 0
  value 1-12: value * 2
  value 13+: (12 * 2) + ((value - 12) * 4)

Examples:
  statCpCost(0) = 0
  statCpCost(4) = 8
  statCpCost(12) = 24
  statCpCost(13) = 28
  statCpCost(15) = 36
```

### resolveStatValue(stat)

```
Input: stat object { value, mode }
Output: number | null

Rules:
  mode "normal" → stat.value
  mode "zero" → 0
  mode "missing" → null
```

### effectiveLevel(purchasedLevel, enhancements, limiters, isWeapon)

```
Input:
  purchasedLevel: integer
  enhancements: array of { levels: integer }
  limiters: array of { levels: integer }
  isWeapon: boolean
Output: integer

Formula:
  enhancementReduction = sum of enhancement.levels
  limiterAddition = sum of limiter.levels
  raw = purchasedLevel - enhancementReduction + limiterAddition
  floor = isWeapon ? -1 : 0
  return Math.max(floor, raw)
```

### totalAttributeCost(baseCostPerLevel, purchasedLevel)

```
Input: baseCostPerLevel (integer), purchasedLevel (integer)
Output: integer (baseCostPerLevel * purchasedLevel)
```

### computeBaseCv(body, mind, soul)

```
Input: three values, each number | null (null = missing stat)
Output: integer

Formula:
  Filter out null values
  Sum the non-null values
  Divide by count of non-null values (not always 3)
  Floor the result
  If all null: return 0

Examples:
  computeBaseCv(5, 5, 5) = 5        // (15/3) = 5
  computeBaseCv(6, null, 6) = 6     // (12/2) = 6
  computeBaseCv(8, null, null) = 8  // (8/1) = 8
  computeBaseCv(null, null, null) = 0
```

### computeHP(body, soul, toughLevel, fragileLevel)

```
Input: body (number|null), soul (number|null), toughLevel (integer), fragileLevel (integer)
Output: { hp: integer, applicable: boolean }

Formula:
  Both present: hp = ((body + soul) * 5) + (toughLevel * 10) - (fragileLevel * 10)
  Body null, soul present: hp = (soul * 10) + (toughLevel * 10) - (fragileLevel * 10)
  Soul null, body present: hp = (body * 10) + (toughLevel * 10) - (fragileLevel * 10)
  Both null: hp = 0, applicable = false
  All results: hp = Math.max(0, hp) — HP cannot go negative
```

### computeEP(mind, soul, energisedLevel)

```
Input: mind (number|null), soul (number|null), energisedLevel (integer)
Output: { ep: integer, applicable: boolean }

Formula:
  Both present: ep = ((mind + soul) * 5) + (energisedLevel * 10)
  Mind null, soul present: ep = (soul * 10) + (energisedLevel * 10)
  Soul null, mind present: ep = (mind * 10) + (energisedLevel * 10)
  Both null: ep = 0, applicable = false
```

### computeShockValue(hp, hpApplicable, hardboiledCount)

```
Input: hp (integer), hpApplicable (boolean), hardboiledCount (integer)
Output: integer

Formula:
  if !hpApplicable: return 0
  base = floor(hp / 5)
  bonus = hardboiledCount * 10
  cap = floor(hp / 2)
  return min(cap, base + bonus)
```

### computeDamageMultipliers(massiveDamageLevel, superstrengthLevel)

```
Input: massiveDamageLevel (integer), superstrengthLevel (integer)
Output: { base: integer, melee: integer }

Formula:
  base = 5 + massiveDamageLevel
  melee = 5 + massiveDamageLevel + superstrengthLevel
```

### computeMovement(body)

```
Input: body (number|null)
Output: object with all speed values, or all zeros if body is null

Formula:
  walkSpeed = body * 1
  jogSpeed = round(body * 1.5)
  runSpeed = body * 2
  sprintSpeed = body * 4
  swimSpeed = round(body * 0.5)
  jumpDistanceStationary = floor(body / 4)
  jumpDistanceMoving = floor(sprintSpeed / 4)
```

### computeSanity(mind, soul, unassailableLevel, unsettledLevel)

```
Input: mind (number|null), soul (number|null), unassailableLevel (integer), unsettledLevel (integer)
Output: integer | null (null = not applicable)

Formula:
  if mind is null or soul is null: return null
  base = mind + soul
  bonus = unassailableLevel * 2
  reduction = unsettledLevel * 2
  return base + bonus - reduction
```

### computeSocv(mind, soul)

```
Input: mind (number|null), soul (number|null)
Output: integer | null (null = not applicable)

Formula:
  if mind is null or soul is null: return null
  return floor((mind + soul) / 2)
```

---

## Benchmark Validation (src/engine/benchmarks.mjs)

### POWER_LEVEL_BENCHMARKS constant

```js
{
  subhuman:     { cpMax: 24,   maxStat: 5,    maxAttrLevel: 2,  cvMin: 1, cvMax: 6,    hpMin: 10,  hpMax: 40,   dmgMin: 2, dmgMax: 4    },
  human:        { cpMax: 49,   maxStat: 7,    maxAttrLevel: 3,  cvMin: 2, cvMax: 7,    hpMin: 30,  hpMax: 60,   dmgMin: 3, dmgMax: 6    },
  adventurer:   { cpMax: 74,   maxStat: 9,    maxAttrLevel: 4,  cvMin: 3, cvMax: 8,    hpMin: 40,  hpMax: 80,   dmgMin: 4, dmgMax: 8    },
  heroic:       { cpMax: 99,   maxStat: 10,   maxAttrLevel: 5,  cvMin: 4, cvMax: 9,    hpMin: 50,  hpMax: 100,  dmgMin: 4, dmgMax: 9    },
  mythical:     { cpMax: 149,  maxStat: 12,   maxAttrLevel: 6,  cvMin: 5, cvMax: 10,   hpMin: 60,  hpMax: 120,  dmgMin: 5, dmgMax: 10   },
  superhuman:   { cpMax: 199,  maxStat: null, maxAttrLevel: 8,  cvMin: 6, cvMax: 12,   hpMin: 70,  hpMax: 140,  dmgMin: 5, dmgMax: 11   },
  superpowered: { cpMax: 249,  maxStat: null, maxAttrLevel: 9,  cvMin: 7, cvMax: null,  hpMin: 80,  hpMax: 160,  dmgMin: 6, dmgMax: 12   },
  godlike:      { cpMax: null, maxStat: null, maxAttrLevel: null, cvMin: 8, cvMax: null, hpMin: 100, hpMax: null, dmgMin: 6, dmgMax: null }
}
```

`null` = no cap defined at this power level.

### validateBenchmarks(powerLevel, stats, items, derived)

```
Input:
  powerLevel: string key into POWER_LEVEL_BENCHMARKS
  stats: { body, mind, soul } — each { value, mode }
  items: array of item objects (attributes with effectiveLevel, isBenchmarkException)
  derived: { acv, hp, damageMultiplier }
Output: { warnings: string[], valid: boolean }

Logic:
  1. Stat cap check — skip missing stats, check zero and normal stats against maxStat
  2. Attribute effective level cap — skip items with isBenchmarkException, check effectiveLevel against maxAttrLevel
  3. ACV range check — warn if below cvMin or above cvMax
  4. HP range check — warn if below hpMin or above hpMax
  5. Return { warnings, valid: warnings.length === 0 }
```

---

## prepareDerivedData() Orchestration

### AttributeData.prepareDerivedData()

Called on each attribute item. Computes effective level and total cost:

```js
prepareDerivedData() {
  this.effectiveLevel = effectiveLevel(
    this.purchasedLevel, this.enhancements, this.limiters, this.isWeapon
  );
  this.totalCost = totalAttributeCost(this.baseCostPerLevel, this.purchasedLevel);
}
```

### CharacterData.prepareDerivedData()

Called after all item `prepareDerivedData()` runs. Orchestrates the full calculation:

```
1. Resolve stat values via resolveStatValue() for body, mind, soul
2. Compute stat CP costs via statCpCost() — assign to stats.X.cpCost
3. Sum attribute CP from items (filter type "attribute", sum totalCost)
4. Sum defect CP grants from items (filter type "defect", sum cpGranted)
5. Compute CP totals: cpTotal = cpBase + defectCP, cpSpent = statCP + attributeCP, cpRemaining = cpTotal - cpSpent
6. Compute baseCv, acv, dcv — look up Attack Mastery / Defence Mastery items by name
7. Compute HP — look up Tough attribute and Fragile defect by name
8. Compute EP — look up Energised attribute by name
9. Compute shock value — look up Combat Technique (Hardboiled) by name
10. Compute damage multipliers — look up Massive Damage and Superstrength by name
11. Compute AR — sum Armour and Force Field effective levels
12. Compute movement (if body not null)
13. Compute sanity (if sanityEnabled setting)
14. Compute social combat values (if socialCombatEnabled setting)
15. Run benchmark validation (if enforceBenchmarks setting)
```

Steps 6-11 look up specific attribute/defect items by name. This is how the master plan specifies it — items are matched by their `name` property (e.g., `"Attack Mastery"`, `"Tough"`, `"Armour"`).

### NPCData.prepareDerivedData()

Same as CharacterData but without SP pool or advancement tracking.

### VehicleData.prepareDerivedData()

Minimal — just stat costs, CP totals, HP, and AR. No CV, no EP, no movement.

### MechaData.prepareDerivedData()

Same as VehicleData plus CV and damage multipliers.

---

## Constraints

- Pure functions in `calculations.mjs` must have ZERO Foundry dependencies — importable and testable in any JS environment
- `benchmarks.mjs` is also pure — no Foundry dependencies
- `prepareDerivedData()` on models is the only code that touches Foundry APIs (reading items, settings)
- Settings are read via `game.settings.get("besm", key)` in `prepareDerivedData()`, not passed to pure functions
- No UI changes in this phase
