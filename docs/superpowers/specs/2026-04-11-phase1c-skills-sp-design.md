# Phase 1c — Skill Cost Resolution + SP Pool: Design Spec

**Goal:** Implement three-layer skill cost resolution (system → genre → world overrides) and SP pool accounting so that skill items auto-resolve their cost per rank and the actor tracks SP pool/spent/remaining.

**Exit criteria:** Create a character with a Skills Attribute and skill items, verify SP pool calculates correctly, verify skill cost resolution respects world overrides, verify flavor skills cost zero SP. All resolution logic testable via unit tests.

---

## File Structure

```
src/
├── engine/
│   └── skills.mjs               ← pure skill resolution functions
├── models/
│   ├── actors/
│   │   └── CharacterData.mjs    ← modified: add SP pool step to prepareDerivedData()
│   └── items/
│       └── SkillData.mjs        ← modified: add costClass field, add prepareDerivedData()
tests/
└── engine/
    └── skills.test.mjs          ← unit tests for skill resolution
```

---

## Schema Change: SkillData

Add `costClass` field — the Layer 1 base cost class for this skill:

```js
costClass: new fields.StringField({
  initial: "framework",
  choices: ["framework", "adventure", "genre"],
})
```

This field stores the book default. The resolved cost comes from the three-layer system.

---

## Pure Functions (src/engine/skills.mjs)

### COST_CLASS_MAP

```js
export const COST_CLASS_MAP = {
  framework: 1,
  adventure: 2,
  genre: 3,
};
```

### resolveSkillCost(skillName, baseCostClass, genreOverrides, worldOverrides)

```
Input:
  skillName: string
  baseCostClass: "framework" | "adventure" | "genre"
  genreOverrides: object keyed by skill name, e.g. { "Acrobatics": { costClass: "genre" } }
  worldOverrides: object, same shape as genreOverrides
Output: { costPerRank: 1|2|3, available: boolean }

Resolution:
  1. Start with baseCostClass and available = true
  2. If genreOverrides[skillName] exists:
     - If it has costClass, use that
     - If it has available === false, set available = false
  3. If worldOverrides[skillName] exists:
     - If it has costClass, use that (overrides genre)
     - If it has available defined, use that (overrides genre)
  4. Map final costClass through COST_CLASS_MAP to get costPerRank
  5. Return { costPerRank, available }
```

### computeSPPool(skillsAttributeLevel)

```
Input: integer (purchased level of the Skills Attribute)
Output: integer (skillsAttributeLevel * 10)
```

### computeSPSpent(skills)

```
Input: array of { rank, resolvedCostPerRank, isFlavor, specialisations }
  specialisations: array of { isFree, spCost }
Output: integer (total SP spent)

Formula:
  For each non-flavor skill:
    rankCost = rank * resolvedCostPerRank
    specCost = sum of specialisation.spCost where !isFree
    total += rankCost + specCost
  Flavor skills (isFlavor === true) contribute 0
```

---

## SkillData.prepareDerivedData()

Resolves this skill's cost using the three-layer system:

```
1. Read genre overrides: get active genre template's skillCostOverrides (empty object until Phase 8 compendium data exists)
2. Read world overrides: game.settings.get("besm", "worldSkillOverrides")
3. Call resolveSkillCost(this.parent.name, this.costClass, genreOverrides, worldOverrides)
4. Assign this.resolvedCostPerRank = result.costPerRank
5. Assign this.isAvailable = result.available
6. If this.isFlavor: this.resolvedCostPerRank = 0
7. Compute this.totalSpCost:
   rankCost = this.rank * this.resolvedCostPerRank
   specCost = this.specialisations.filter(s => !s.isFree).reduce((sum, s) => sum + s.spCost, 0)
   this.totalSpCost = rankCost + specCost
```

Note: For Phase 1c, genre overrides will be an empty object (no compendium data yet). The resolver handles this gracefully — empty overrides means Layer 2 is a no-op.

---

## CharacterData.prepareDerivedData() Addition

After the existing Step 5 (CP totals), add SP pool calculation. This only runs in point-buy mode:

```
try {
  if (game.settings.get("besm", "skillMode") === "pointbuy") {
    const skillsAttr = items.find(i => i.type === "attribute" && i.system.isSkillsAttribute);
    if (skillsAttr) {
      const spPool = computeSPPool(skillsAttr.system.purchasedLevel);
      const skillItems = [...items].filter(i => i.type === "skill");
      const spSpent = computeSPSpent(skillItems.map(s => s.system));
      this.spPool = spPool;
      this.spSpent = spSpent;
      this.spRemaining = spPool - spSpent;
    }
  }
} catch (e) {}
```

---

## Constraints

- Pure functions in `skills.mjs` have ZERO Foundry dependencies
- Genre overrides (Layer 2) return empty object until Phase 8 populates genre compendiums
- World overrides (Layer 3) already exist as `worldSkillOverrides` setting from Phase 1a
- Flavor skills (`isFlavor: true`) always cost 0 SP regardless of resolution
- SP pool only exists in point-buy mode — group mode has no SP tracking
- No UI changes in this phase
