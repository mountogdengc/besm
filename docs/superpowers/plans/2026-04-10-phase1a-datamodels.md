# Phase 1a — DataModel Schemas + System Settings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Define all 10 TypeDataModel schemas (4 actor, 6 item) and register all system settings so that every actor and item type can be created from the Foundry console with correct default values.

**Architecture:** Each model is a class extending `foundry.abstract.TypeDataModel` with a `static defineSchema()` method using `foundry.data.fields`. Models are registered in `CONFIG.Actor.dataModels` / `CONFIG.Item.dataModels` during the `init` hook. Settings are registered via `game.settings.register()`. No derived data logic — just field declarations.

**Tech Stack:** Foundry VTT V14 TypeDataModel API, `foundry.data.fields`

**Spec:** `docs/superpowers/specs/2026-04-10-phase1a-datamodels-design.md`

**Note on testing:** These are pure schema declarations with no logic. Foundry validates them at runtime when documents are created. Testing is done via the Foundry console in the final verification task. There are no unit tests for this phase.

**Note on `choices`:** Foundry V14 `StringField` accepts `choices` as either an array `["a", "b"]` or an object `{ a: "Label A", b: "Label B" }`. The plan uses arrays for brevity. If Foundry rejects them at runtime, switch to the object form.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/models/actors/CharacterData.mjs` | Create | Character actor schema |
| `src/models/actors/NPCData.mjs` | Create | Simplified NPC actor schema |
| `src/models/actors/VehicleData.mjs` | Create | Vehicle actor schema |
| `src/models/actors/MechaData.mjs` | Create | Mecha actor schema with pilot link |
| `src/models/items/AttributeData.mjs` | Create | Attribute item schema (most complex) |
| `src/models/items/EnhancementData.mjs` | Create | Enhancement item schema |
| `src/models/items/LimiterData.mjs` | Create | Limiter item schema |
| `src/models/items/DefectData.mjs` | Create | Defect item schema |
| `src/models/items/PossessionData.mjs` | Create | Possession item schema |
| `src/models/items/SkillData.mjs` | Create | Skill item schema |
| `src/settings/registerSettings.mjs` | Create | All system settings |
| `src/besm4e.mjs` | Modify | Add model + settings registration |
| `system.json` | Modify | Add all actor/item types to documentTypes |

---

### Task 1: Create Character and NPC Actor DataModels

**Files:**
- Create: `src/models/actors/CharacterData.mjs`
- Create: `src/models/actors/NPCData.mjs`

- [ ] **Step 1: Create src/models/actors/CharacterData.mjs**

```js
export class CharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      biography: new fields.HTMLField(),
      genre: new fields.StringField({ initial: "" }),
      cpBase: new fields.NumberField({ integer: true, initial: 50 }),
      cpTotal: new fields.NumberField({ integer: true, initial: 0 }),
      cpSpent: new fields.NumberField({ integer: true, initial: 0 }),
      cpRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      stats: new fields.SchemaField({
        body: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        mind: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        soul: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
      }),
      derived: new fields.SchemaField({
        hp: new fields.NumberField({ integer: true, initial: 0 }),
        hpMax: new fields.NumberField({ integer: true, initial: 0 }),
        hpApplicable: new fields.BooleanField({ initial: true }),
        currentHp: new fields.NumberField({ integer: true, initial: 0 }),
        ep: new fields.NumberField({ integer: true, initial: 0 }),
        epMax: new fields.NumberField({ integer: true, initial: 0 }),
        epApplicable: new fields.BooleanField({ initial: true }),
        currentEp: new fields.NumberField({ integer: true, initial: 0 }),
        hpAsEp: new fields.BooleanField({ initial: false }),
        epAsHp: new fields.BooleanField({ initial: false }),
        sv: new fields.NumberField({ integer: true, initial: 0 }),
        acv: new fields.NumberField({ integer: true, initial: 0 }),
        dcv: new fields.NumberField({ integer: true, initial: 0 }),
        baseCv: new fields.NumberField({ integer: true, initial: 0 }),
        initiative: new fields.NumberField({ integer: true, initial: 0 }),
        damageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        meleeDamageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        ar: new fields.NumberField({ integer: true, initial: 0 }),
        walkSpeed: new fields.NumberField({ initial: 0 }),
        jogSpeed: new fields.NumberField({ initial: 0 }),
        runSpeed: new fields.NumberField({ initial: 0 }),
        sprintSpeed: new fields.NumberField({ initial: 0 }),
        swimSpeed: new fields.NumberField({ initial: 0 }),
        jumpDistanceStationary: new fields.NumberField({ initial: 0 }),
        jumpDistanceMoving: new fields.NumberField({ initial: 0 }),
        sanityPoints: new fields.NumberField({ integer: true, initial: 0 }),
        sanityMax: new fields.NumberField({ integer: true, initial: 0 }),
        currentSanity: new fields.NumberField({ integer: true, initial: 0 }),
        socv: new fields.NumberField({ integer: true, initial: 0 }),
        societyPoints: new fields.NumberField({ integer: true, initial: 0 }),
        societyPointsMax: new fields.NumberField({ integer: true, initial: 0 }),
        currentSocietyPoints: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      skillMode: new fields.StringField({
        initial: "pointbuy",
        choices: ["pointbuy", "group"],
      }),
      spPool: new fields.NumberField({ integer: true, initial: 0 }),
      spSpent: new fields.NumberField({ integer: true, initial: 0 }),
      spRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      appliedTemplates: new fields.ArrayField(new fields.ObjectField()),
      advancement: new fields.SchemaField({
        sessionLog: new fields.ArrayField(new fields.ObjectField()),
        totalEarned: new fields.NumberField({ integer: true, initial: 0 }),
        totalSpent: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      benchmarkWarnings: new fields.ArrayField(new fields.StringField()),
      benchmarkValid: new fields.BooleanField({ initial: true }),
      notes: new fields.HTMLField(),
    };
  }
}
```

- [ ] **Step 2: Create src/models/actors/NPCData.mjs**

```js
export class NPCData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      biography: new fields.HTMLField(),
      genre: new fields.StringField({ initial: "" }),
      cpBase: new fields.NumberField({ integer: true, initial: 50 }),
      cpTotal: new fields.NumberField({ integer: true, initial: 0 }),
      cpSpent: new fields.NumberField({ integer: true, initial: 0 }),
      cpRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      stats: new fields.SchemaField({
        body: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        mind: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        soul: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
      }),
      derived: new fields.SchemaField({
        hp: new fields.NumberField({ integer: true, initial: 0 }),
        hpMax: new fields.NumberField({ integer: true, initial: 0 }),
        hpApplicable: new fields.BooleanField({ initial: true }),
        currentHp: new fields.NumberField({ integer: true, initial: 0 }),
        ep: new fields.NumberField({ integer: true, initial: 0 }),
        epMax: new fields.NumberField({ integer: true, initial: 0 }),
        epApplicable: new fields.BooleanField({ initial: true }),
        currentEp: new fields.NumberField({ integer: true, initial: 0 }),
        hpAsEp: new fields.BooleanField({ initial: false }),
        epAsHp: new fields.BooleanField({ initial: false }),
        sv: new fields.NumberField({ integer: true, initial: 0 }),
        acv: new fields.NumberField({ integer: true, initial: 0 }),
        dcv: new fields.NumberField({ integer: true, initial: 0 }),
        baseCv: new fields.NumberField({ integer: true, initial: 0 }),
        initiative: new fields.NumberField({ integer: true, initial: 0 }),
        damageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        meleeDamageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        ar: new fields.NumberField({ integer: true, initial: 0 }),
        walkSpeed: new fields.NumberField({ initial: 0 }),
        jogSpeed: new fields.NumberField({ initial: 0 }),
        runSpeed: new fields.NumberField({ initial: 0 }),
        sprintSpeed: new fields.NumberField({ initial: 0 }),
        swimSpeed: new fields.NumberField({ initial: 0 }),
        jumpDistanceStationary: new fields.NumberField({ initial: 0 }),
        jumpDistanceMoving: new fields.NumberField({ initial: 0 }),
        sanityPoints: new fields.NumberField({ integer: true, initial: 0 }),
        sanityMax: new fields.NumberField({ integer: true, initial: 0 }),
        currentSanity: new fields.NumberField({ integer: true, initial: 0 }),
        socv: new fields.NumberField({ integer: true, initial: 0 }),
        societyPoints: new fields.NumberField({ integer: true, initial: 0 }),
        societyPointsMax: new fields.NumberField({ integer: true, initial: 0 }),
        currentSocietyPoints: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      notes: new fields.HTMLField(),
    };
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/models/actors/CharacterData.mjs src/models/actors/NPCData.mjs
git commit -m "feat: add Character and NPC actor TypeDataModels"
```

---

### Task 2: Create Vehicle and Mecha Actor DataModels

**Files:**
- Create: `src/models/actors/VehicleData.mjs`
- Create: `src/models/actors/MechaData.mjs`

- [ ] **Step 1: Create src/models/actors/VehicleData.mjs**

```js
export class VehicleData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      cpBase: new fields.NumberField({ integer: true, initial: 0 }),
      cpTotal: new fields.NumberField({ integer: true, initial: 0 }),
      cpSpent: new fields.NumberField({ integer: true, initial: 0 }),
      cpRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      stats: new fields.SchemaField({
        body: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        mind: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        soul: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"],
          }),
        }),
      }),
      derived: new fields.SchemaField({
        hp: new fields.NumberField({ integer: true, initial: 0 }),
        hpMax: new fields.NumberField({ integer: true, initial: 0 }),
        hpApplicable: new fields.BooleanField({ initial: true }),
        currentHp: new fields.NumberField({ integer: true, initial: 0 }),
        ar: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      crew: new fields.ArrayField(
        new fields.SchemaField({
          actorId: new fields.StringField(),
          role: new fields.StringField({ initial: "crew" }),
        })
      ),
      passengerCapacity: new fields.NumberField({ integer: true, initial: 0 }),
      notes: new fields.HTMLField(),
    };
  }
}
```

- [ ] **Step 2: Create src/models/actors/MechaData.mjs**

```js
export class MechaData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      cpBase: new fields.NumberField({ integer: true, initial: 0 }),
      cpTotal: new fields.NumberField({ integer: true, initial: 0 }),
      cpSpent: new fields.NumberField({ integer: true, initial: 0 }),
      cpRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      stats: new fields.SchemaField({
        body: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        mind: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        soul: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"],
          }),
        }),
      }),
      derived: new fields.SchemaField({
        hp: new fields.NumberField({ integer: true, initial: 0 }),
        hpMax: new fields.NumberField({ integer: true, initial: 0 }),
        hpApplicable: new fields.BooleanField({ initial: true }),
        currentHp: new fields.NumberField({ integer: true, initial: 0 }),
        ar: new fields.NumberField({ integer: true, initial: 0 }),
        acv: new fields.NumberField({ integer: true, initial: 0 }),
        dcv: new fields.NumberField({ integer: true, initial: 0 }),
        baseCv: new fields.NumberField({ integer: true, initial: 0 }),
        damageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        meleeDamageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
      }),
      pilotId: new fields.StringField({ initial: "" }),
      pilotBonus: new fields.SchemaField({
        body: new fields.NumberField({ integer: true, initial: 0 }),
        mind: new fields.NumberField({ integer: true, initial: 0 }),
        soul: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      crew: new fields.ArrayField(
        new fields.SchemaField({
          actorId: new fields.StringField(),
          role: new fields.StringField({ initial: "crew" }),
        })
      ),
      passengerCapacity: new fields.NumberField({ integer: true, initial: 0 }),
      notes: new fields.HTMLField(),
    };
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/models/actors/VehicleData.mjs src/models/actors/MechaData.mjs
git commit -m "feat: add Vehicle and Mecha actor TypeDataModels"
```

---

### Task 3: Create Attribute and Defect Item DataModels

**Files:**
- Create: `src/models/items/AttributeData.mjs`
- Create: `src/models/items/DefectData.mjs`

- [ ] **Step 1: Create src/models/items/AttributeData.mjs**

```js
export class AttributeData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      baseCostPerLevel: new fields.NumberField({ integer: true, initial: 1 }),
      purchasedLevel: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
      effectiveLevel: new fields.NumberField({ integer: true, initial: 1 }),
      totalCost: new fields.NumberField({ integer: true, initial: 0 }),
      enhancements: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField(),
          name: new fields.StringField(),
          levels: new fields.NumberField({ integer: true, initial: 1 }),
        })
      ),
      limiters: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField(),
          name: new fields.StringField(),
          levels: new fields.NumberField({ integer: true, initial: 1 }),
        })
      ),
      isWeapon: new fields.BooleanField({ initial: false }),
      weaponOptions: new fields.SchemaField({
        damage: new fields.StringField({ initial: "" }),
        range: new fields.StringField({ initial: "" }),
        accurate: new fields.NumberField({ integer: true, initial: 0 }),
        spreading: new fields.BooleanField({ initial: false }),
        isMuscleAttack: new fields.BooleanField({ initial: false }),
      }),
      isSkillGroup: new fields.BooleanField({ initial: false }),
      skillGroupCategory: new fields.StringField({
        initial: "",
        choices: ["", "background", "field", "action"],
      }),
      skillGroupType: new fields.StringField({ initial: "" }),
      isSkillsAttribute: new fields.BooleanField({ initial: false }),
      spPool: new fields.NumberField({ integer: true, initial: 0 }),
      spSpent: new fields.NumberField({ integer: true, initial: 0 }),
      spRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      isBenchmarkException: new fields.BooleanField({ initial: false }),
      isUnique: new fields.BooleanField({ initial: false }),
      tier: new fields.StringField({
        initial: "",
        choices: ["", "lesser", "greater", "serious"],
      }),
      uniqueDescription: new fields.HTMLField(),
      sourceTemplateId: new fields.StringField({ initial: "" }),
      sourceTemplateName: new fields.StringField({ initial: "" }),
      notes: new fields.HTMLField(),
    };
  }
}
```

- [ ] **Step 2: Create src/models/items/DefectData.mjs**

```js
export class DefectData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      cpGranted: new fields.NumberField({ integer: true, initial: 1 }),
      rankLevel: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      isUnique: new fields.BooleanField({ initial: false }),
      tier: new fields.StringField({
        initial: "",
        choices: ["", "lesser", "greater", "serious"],
      }),
      uniqueDescription: new fields.HTMLField(),
      sourceTemplateId: new fields.StringField({ initial: "" }),
      sourceTemplateName: new fields.StringField({ initial: "" }),
    };
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/models/items/AttributeData.mjs src/models/items/DefectData.mjs
git commit -m "feat: add Attribute and Defect item TypeDataModels"
```

---

### Task 4: Create Enhancement, Limiter, Possession, and Skill Item DataModels

**Files:**
- Create: `src/models/items/EnhancementData.mjs`
- Create: `src/models/items/LimiterData.mjs`
- Create: `src/models/items/PossessionData.mjs`
- Create: `src/models/items/SkillData.mjs`

- [ ] **Step 1: Create src/models/items/EnhancementData.mjs**

```js
export class EnhancementData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      levels: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      parentAttributeId: new fields.StringField({ initial: "" }),
    };
  }
}
```

- [ ] **Step 2: Create src/models/items/LimiterData.mjs**

```js
export class LimiterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      levels: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      parentAttributeId: new fields.StringField({ initial: "" }),
    };
  }
}
```

- [ ] **Step 3: Create src/models/items/PossessionData.mjs**

```js
export class PossessionData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      category: new fields.StringField({
        initial: "gear",
        choices: ["gear", "feature", "other"],
      }),
      isMechanical: new fields.BooleanField({ initial: false }),
      budgetCost: new fields.NumberField({ integer: true, initial: 0 }),
      linkedAttributeId: new fields.StringField({ initial: "" }),
      notes: new fields.HTMLField(),
    };
  }
}
```

- [ ] **Step 4: Create src/models/items/SkillData.mjs**

```js
export class SkillData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      group: new fields.StringField({ initial: "" }),
      rank: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
      resolvedCostPerRank: new fields.NumberField({ integer: true, initial: 1 }),
      totalSpCost: new fields.NumberField({ integer: true, initial: 0 }),
      isAvailable: new fields.BooleanField({ initial: true }),
      isFlavor: new fields.BooleanField({ initial: false }),
      linkedStat: new fields.StringField({
        initial: "body",
        choices: ["body", "mind", "soul", "bodyMind", "bodySoul", "mindSoul", "avg"],
      }),
      isGeniusSkill: new fields.BooleanField({ initial: false }),
      specialisations: new fields.ArrayField(
        new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          isFree: new fields.BooleanField({ initial: false }),
          spCost: new fields.NumberField({ integer: true, initial: 0 }),
        })
      ),
      sourceTemplateId: new fields.StringField({ initial: "" }),
      sourceTemplateName: new fields.StringField({ initial: "" }),
    };
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add src/models/items/EnhancementData.mjs src/models/items/LimiterData.mjs src/models/items/PossessionData.mjs src/models/items/SkillData.mjs
git commit -m "feat: add Enhancement, Limiter, Possession, and Skill item TypeDataModels"
```

---

### Task 5: Create System Settings

**Files:**
- Create: `src/settings/registerSettings.mjs`

- [ ] **Step 1: Create src/settings/registerSettings.mjs**

```js
export function registerSettings() {
  const s = (key, config) => game.settings.register("besm", key, {
    scope: "world",
    config: true,
    ...config,
  });

  s("skillMode", {
    name: "Skill Mode",
    hint: "Point Buy uses individual skills with SP costs. Skill Groups uses attribute-based skill groups with CP costs.",
    type: String,
    default: "pointbuy",
    choices: {
      pointbuy: "Point Buy",
      group: "Skill Groups",
    },
  });

  s("powerLevel", {
    name: "Power Level",
    hint: "Sets benchmark recommendations for stat and attribute caps.",
    type: String,
    default: "adventurer",
    choices: {
      subhuman: "Sub-Human (0-24 CP)",
      human: "Human (25-49 CP)",
      adventurer: "Adventurer (50-74 CP)",
      heroic: "Heroic (75-99 CP)",
      mythical: "Mythical (100-149 CP)",
      superhuman: "Superhuman (150-199 CP)",
      superpowered: "Superpowered (200-249 CP)",
      godlike: "Godlike (250+ CP)",
    },
  });

  s("cpBase", {
    name: "Base CP",
    hint: "Starting Character Points for new characters. Set within the power level range.",
    type: Number,
    default: 50,
  });

  s("enforceBenchmarks", {
    name: "Enforce Benchmarks",
    hint: "Show warnings when characters exceed power level benchmark recommendations.",
    type: Boolean,
    default: true,
  });

  s("benchmarkWarningsOnly", {
    name: "Benchmark Warnings Only",
    hint: "When enabled, benchmarks are advisory warnings. When disabled, benchmarks are hard blocks (not recommended).",
    type: Boolean,
    default: true,
  });

  s("sanityEnabled", {
    name: "Enable Sanity Points",
    hint: "Adds Sanity Points derived value for horror/occult genres.",
    type: Boolean,
    default: false,
  });

  s("socialCombatEnabled", {
    name: "Enable Social Combat",
    hint: "Adds Social Combat Value (SoCV) and Society Points.",
    type: Boolean,
    default: false,
  });

  s("trackMovement", {
    name: "Track Movement",
    hint: "Shows movement speed derived values on the character sheet.",
    type: Boolean,
    default: false,
  });

  s("allowStatsAbove12", {
    name: "Allow Stats Above 12",
    hint: "When enabled, stats above 12 cost 4 CP per point instead of 2 CP.",
    type: Boolean,
    default: false,
  });

  s("allowGeniusSkills", {
    name: "Allow Genius Skills",
    hint: "When enabled, skill rank cap lifts from 6 to the Genius Skill Max Rank.",
    type: Boolean,
    default: false,
  });

  s("geniusSkillMaxRank", {
    name: "Genius Skill Max Rank",
    hint: "Maximum rank for Genius Skills when enabled.",
    type: Number,
    default: 12,
  });

  s("genreTemplate", {
    name: "Genre Template",
    hint: "Active genre template. Affects skill costs and availability.",
    type: String,
    default: "universal",
  });

  s("initiativeMode", {
    name: "Initiative Mode",
    hint: "ACV + 2d6 rolls initiative with dice. CV Static uses ACV directly.",
    type: String,
    default: "cv_plus_2d6",
    choices: {
      cv_plus_2d6: "ACV + 2d6",
      cv_static: "CV (Static)",
    },
  });

  s("gearBudgetPerLevel", {
    name: "Gear Budget Per Level",
    hint: "Budget points granted per effective level of the Gear attribute.",
    type: Number,
    default: 5,
  });

  s("worldSkillOverrides", {
    name: "World Skill Overrides",
    hint: "GM overrides for skill costs and availability (Layer 3).",
    type: Object,
    default: {},
    config: false,
  });
}
```

Note: `worldSkillOverrides` has `config: false` since it's managed programmatically, not through the settings UI.

- [ ] **Step 2: Commit**

```bash
git add src/settings/registerSettings.mjs
git commit -m "feat: register all system settings"
```

---

### Task 6: Wire Up Registration in Entry Point and System Manifest

**Files:**
- Modify: `src/besm4e.mjs`
- Modify: `system.json`

- [ ] **Step 1: Update src/besm4e.mjs**

Replace the entire file with:

```js
import "./styles/global.css";
import { BESMActorSheet } from "./sheets/BESMActorSheet.mjs";
import { CharacterData } from "./models/actors/CharacterData.mjs";
import { NPCData } from "./models/actors/NPCData.mjs";
import { VehicleData } from "./models/actors/VehicleData.mjs";
import { MechaData } from "./models/actors/MechaData.mjs";
import { AttributeData } from "./models/items/AttributeData.mjs";
import { EnhancementData } from "./models/items/EnhancementData.mjs";
import { LimiterData } from "./models/items/LimiterData.mjs";
import { DefectData } from "./models/items/DefectData.mjs";
import { PossessionData } from "./models/items/PossessionData.mjs";
import { SkillData } from "./models/items/SkillData.mjs";
import { registerSettings } from "./settings/registerSettings.mjs";

Hooks.on("init", () => {
  console.log("BESM 4e | Initializing BESM 4th Edition system");

  CONFIG.Actor.dataModels.character = CharacterData;
  CONFIG.Actor.dataModels.npc = NPCData;
  CONFIG.Actor.dataModels.vehicle = VehicleData;
  CONFIG.Actor.dataModels.mecha = MechaData;

  CONFIG.Item.dataModels.attribute = AttributeData;
  CONFIG.Item.dataModels.enhancement = EnhancementData;
  CONFIG.Item.dataModels.limiter = LimiterData;
  CONFIG.Item.dataModels.defect = DefectData;
  CONFIG.Item.dataModels.possession = PossessionData;
  CONFIG.Item.dataModels.skill = SkillData;

  registerSettings();

  foundry.documents.collections.Actors.registerSheet("besm", BESMActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "BESM4e.SheetCharacter",
  });
});
```

- [ ] **Step 2: Update system.json documentTypes**

Replace the `documentTypes` block in `system.json` with:

```json
{
  "documentTypes": {
    "Actor": {
      "character": {},
      "npc": {},
      "vehicle": {},
      "mecha": {}
    },
    "Item": {
      "attribute": {},
      "enhancement": {},
      "limiter": {},
      "defect": {},
      "possession": {},
      "skill": {}
    }
  }
}
```

Keep all other fields in system.json unchanged.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds with `dist/besm4e.js` and `dist/besm4e.css` produced. No errors.

- [ ] **Step 4: Commit**

```bash
git add src/besm4e.mjs system.json
git commit -m "feat: register all DataModels and settings in init hook"
```

---

### Task 7: Foundry Console Verification

**Files:**
- None — manual testing in Foundry VTT V14

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Start Foundry VTT V14, launch the test world.

Expected: Console shows `BESM 4e | Initializing BESM 4th Edition system`. No errors. No deprecation warnings.

- [ ] **Step 2: Verify actor creation for all types**

Run in browser console:

```js
// Character
let char = await Actor.create({name: "Test Character", type: "character"});
console.log("cpBase:", char.system.cpBase);           // 50
console.log("body mode:", char.system.stats.body.mode); // "normal"
console.log("hp:", char.system.derived.hp);             // 0
console.log("skillMode:", char.system.skillMode);       // "pointbuy"
console.log("benchmarkValid:", char.system.benchmarkValid); // true

// NPC
let npc = await Actor.create({name: "Test NPC", type: "npc"});
console.log("npc cpBase:", npc.system.cpBase);          // 50

// Vehicle
let vehicle = await Actor.create({name: "Test Vehicle", type: "vehicle"});
console.log("vehicle mind mode:", vehicle.system.stats.mind.mode); // "missing"

// Mecha
let mecha = await Actor.create({name: "Test Mecha", type: "mecha"});
console.log("mecha pilotId:", mecha.system.pilotId);    // ""
console.log("mecha soul mode:", mecha.system.stats.soul.mode); // "missing"
```

Expected: All values match comments above.

- [ ] **Step 3: Verify item creation for all types**

Run in browser console:

```js
// Attribute
let attr = await Item.create({name: "Test Attr", type: "attribute"});
console.log("baseCostPerLevel:", attr.system.baseCostPerLevel); // 1
console.log("purchasedLevel:", attr.system.purchasedLevel);     // 1
console.log("isWeapon:", attr.system.isWeapon);                 // false
console.log("enhancements:", attr.system.enhancements);         // []

// Enhancement
let enh = await Item.create({name: "Test Enh", type: "enhancement"});
console.log("enh levels:", enh.system.levels); // 1

// Limiter
let lim = await Item.create({name: "Test Lim", type: "limiter"});
console.log("lim levels:", lim.system.levels); // 1

// Defect
let def = await Item.create({name: "Test Defect", type: "defect"});
console.log("cpGranted:", def.system.cpGranted); // 1

// Possession
let pos = await Item.create({name: "Test Possession", type: "possession"});
console.log("category:", pos.system.category); // "gear"

// Skill
let skill = await Item.create({name: "Test Skill", type: "skill"});
console.log("linkedStat:", skill.system.linkedStat);     // "body"
console.log("specialisations:", skill.system.specialisations); // []
```

Expected: All values match comments above.

- [ ] **Step 4: Verify system settings**

1. Go to Game Settings (gear icon) → Configure Settings
2. Verify these settings appear under the BESM section:
   - Skill Mode (dropdown: Point Buy / Skill Groups)
   - Power Level (dropdown: Sub-Human through Godlike)
   - Base CP (number: 50)
   - Enforce Benchmarks (checkbox: checked)
   - All other boolean and number settings visible

3. Run in console:
```js
console.log(game.settings.get("besm", "skillMode"));     // "pointbuy"
console.log(game.settings.get("besm", "powerLevel"));    // "adventurer"
console.log(game.settings.get("besm", "cpBase"));        // 50
console.log(game.settings.get("besm", "gearBudgetPerLevel")); // 5
```

Expected: All default values correct.

- [ ] **Step 5: Verify stat mode validation**

Run in console:
```js
let testChar = game.actors.getName("Test Character");
await testChar.update({"system.stats.body.mode": "zero"});
console.log(testChar.system.stats.body.mode); // "zero"

await testChar.update({"system.stats.body.mode": "missing"});
console.log(testChar.system.stats.body.mode); // "missing"

await testChar.update({"system.stats.body.mode": "normal"});
console.log(testChar.system.stats.body.mode); // "normal"
```

Expected: All three valid modes accepted.

- [ ] **Step 6: Clean up test documents**

```js
for (const a of game.actors) await a.delete();
for (const i of game.items) await i.delete();
```
