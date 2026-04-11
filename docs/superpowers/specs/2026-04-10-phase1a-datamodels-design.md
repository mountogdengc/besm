# Phase 1a — DataModel Schemas + System Settings: Design Spec

**Goal:** Define all actor and item TypeDataModel schemas with full field declarations, and register all system settings. No derived data logic — just the raw field definitions.

**Exit criteria:** Create any actor or item type from the Foundry console with correct default values. System settings appear in the settings menu. Zero deprecation warnings. No `prepareDerivedData()` logic yet.

---

## File Structure

```
src/
├── models/
│   ├── actors/
│   │   ├── CharacterData.mjs
│   │   ├── NPCData.mjs
│   │   ├── VehicleData.mjs
│   │   └── MechaData.mjs
│   └── items/
│       ├── AttributeData.mjs
│       ├── EnhancementData.mjs
│       ├── LimiterData.mjs
│       ├── DefectData.mjs
│       ├── PossessionData.mjs
│       └── SkillData.mjs
├── settings/
│   └── registerSettings.mjs
└── besm4e.mjs                   ← updated to register all models + settings
```

Each model file exports a single class extending `foundry.abstract.TypeDataModel` with a `static defineSchema()` method using `foundry.data.fields`. The entry point registers them in `CONFIG.Actor.dataModels` / `CONFIG.Item.dataModels` during the `init` hook.

---

## system.json documentTypes

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

---

## Actor DataModels

All field types reference `foundry.data.fields` (aliased as `fields` in code).

### CharacterData

```js
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
          choices: ["normal", "zero", "missing"]
        })
      }),
      mind: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "normal",
          choices: ["normal", "zero", "missing"]
        })
      }),
      soul: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "normal",
          choices: ["normal", "zero", "missing"]
        })
      })
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
      currentSocietyPoints: new fields.NumberField({ integer: true, initial: 0 })
    }),
    skillMode: new fields.StringField({
      initial: "pointbuy",
      choices: ["pointbuy", "group"]
    }),
    spPool: new fields.NumberField({ integer: true, initial: 0 }),
    spSpent: new fields.NumberField({ integer: true, initial: 0 }),
    spRemaining: new fields.NumberField({ integer: true, initial: 0 }),
    appliedTemplates: new fields.ArrayField(new fields.ObjectField()),
    advancement: new fields.SchemaField({
      sessionLog: new fields.ArrayField(new fields.ObjectField()),
      totalEarned: new fields.NumberField({ integer: true, initial: 0 }),
      totalSpent: new fields.NumberField({ integer: true, initial: 0 })
    }),
    benchmarkWarnings: new fields.ArrayField(new fields.StringField()),
    benchmarkValid: new fields.BooleanField({ initial: true }),
    notes: new fields.HTMLField()
  };
}
```

### NPCData

Simplified character. Same stats and derived fields. No advancement, no SP pool, no appliedTemplates.

```js
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
          choices: ["normal", "zero", "missing"]
        })
      }),
      mind: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "normal",
          choices: ["normal", "zero", "missing"]
        })
      }),
      soul: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "normal",
          choices: ["normal", "zero", "missing"]
        })
      })
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
      currentSocietyPoints: new fields.NumberField({ integer: true, initial: 0 })
    }),
    notes: new fields.HTMLField()
  };
}
```

### VehicleData

```js
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
          choices: ["normal", "zero", "missing"]
        })
      }),
      mind: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "missing",
          choices: ["normal", "zero", "missing"]
        })
      }),
      soul: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "missing",
          choices: ["normal", "zero", "missing"]
        })
      })
    }),
    derived: new fields.SchemaField({
      hp: new fields.NumberField({ integer: true, initial: 0 }),
      hpMax: new fields.NumberField({ integer: true, initial: 0 }),
      hpApplicable: new fields.BooleanField({ initial: true }),
      currentHp: new fields.NumberField({ integer: true, initial: 0 }),
      ar: new fields.NumberField({ integer: true, initial: 0 })
    }),
    crew: new fields.ArrayField(new fields.SchemaField({
      actorId: new fields.StringField(),
      role: new fields.StringField({ initial: "crew" })
    })),
    passengerCapacity: new fields.NumberField({ integer: true, initial: 0 }),
    notes: new fields.HTMLField()
  };
}
```

Vehicle defaults Mind and Soul to "missing" since vehicles typically don't have mental or spiritual stats.

### MechaData

```js
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
          choices: ["normal", "zero", "missing"]
        })
      }),
      mind: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "missing",
          choices: ["normal", "zero", "missing"]
        })
      }),
      soul: new fields.SchemaField({
        value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
        cpCost: new fields.NumberField({ integer: true, initial: 0 }),
        mode: new fields.StringField({
          initial: "missing",
          choices: ["normal", "zero", "missing"]
        })
      })
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
      meleeDamageMultiplier: new fields.NumberField({ integer: true, initial: 5 })
    }),
    pilotId: new fields.StringField({ initial: "" }),
    pilotBonus: new fields.SchemaField({
      body: new fields.NumberField({ integer: true, initial: 0 }),
      mind: new fields.NumberField({ integer: true, initial: 0 }),
      soul: new fields.NumberField({ integer: true, initial: 0 })
    }),
    crew: new fields.ArrayField(new fields.SchemaField({
      actorId: new fields.StringField(),
      role: new fields.StringField({ initial: "crew" })
    })),
    passengerCapacity: new fields.NumberField({ integer: true, initial: 0 }),
    notes: new fields.HTMLField()
  };
}
```

---

## Item DataModels

### AttributeData

```js
static defineSchema() {
  const fields = foundry.data.fields;
  return {
    description: new fields.HTMLField(),
    baseCostPerLevel: new fields.NumberField({ integer: true, initial: 1 }),
    purchasedLevel: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
    effectiveLevel: new fields.NumberField({ integer: true, initial: 1 }),
    totalCost: new fields.NumberField({ integer: true, initial: 0 }),
    enhancements: new fields.ArrayField(new fields.SchemaField({
      id: new fields.StringField(),
      name: new fields.StringField(),
      levels: new fields.NumberField({ integer: true, initial: 1 })
    })),
    limiters: new fields.ArrayField(new fields.SchemaField({
      id: new fields.StringField(),
      name: new fields.StringField(),
      levels: new fields.NumberField({ integer: true, initial: 1 })
    })),
    isWeapon: new fields.BooleanField({ initial: false }),
    weaponOptions: new fields.SchemaField({
      damage: new fields.StringField({ initial: "" }),
      range: new fields.StringField({ initial: "" }),
      accurate: new fields.NumberField({ integer: true, initial: 0 }),
      spreading: new fields.BooleanField({ initial: false }),
      isMuscleAttack: new fields.BooleanField({ initial: false })
    }),
    isSkillGroup: new fields.BooleanField({ initial: false }),
    skillGroupCategory: new fields.StringField({
      initial: "",
      choices: ["", "background", "field", "action"]
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
      choices: ["", "lesser", "greater", "serious"]
    }),
    uniqueDescription: new fields.HTMLField(),
    sourceTemplateId: new fields.StringField({ initial: "" }),
    sourceTemplateName: new fields.StringField({ initial: "" }),
    notes: new fields.HTMLField()
  };
}
```

### EnhancementData

```js
static defineSchema() {
  const fields = foundry.data.fields;
  return {
    description: new fields.HTMLField(),
    levels: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
    parentAttributeId: new fields.StringField({ initial: "" })
  };
}
```

### LimiterData

```js
static defineSchema() {
  const fields = foundry.data.fields;
  return {
    description: new fields.HTMLField(),
    levels: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
    parentAttributeId: new fields.StringField({ initial: "" })
  };
}
```

### DefectData

```js
static defineSchema() {
  const fields = foundry.data.fields;
  return {
    description: new fields.HTMLField(),
    cpGranted: new fields.NumberField({ integer: true, initial: 1 }),
    rankLevel: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
    isUnique: new fields.BooleanField({ initial: false }),
    tier: new fields.StringField({
      initial: "",
      choices: ["", "lesser", "greater", "serious"]
    }),
    uniqueDescription: new fields.HTMLField(),
    sourceTemplateId: new fields.StringField({ initial: "" }),
    sourceTemplateName: new fields.StringField({ initial: "" })
  };
}
```

### PossessionData

```js
static defineSchema() {
  const fields = foundry.data.fields;
  return {
    description: new fields.HTMLField(),
    category: new fields.StringField({
      initial: "gear",
      choices: ["gear", "feature", "other"]
    }),
    isMechanical: new fields.BooleanField({ initial: false }),
    budgetCost: new fields.NumberField({ integer: true, initial: 0 }),
    linkedAttributeId: new fields.StringField({ initial: "" }),
    notes: new fields.HTMLField()
  };
}
```

### SkillData

```js
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
      choices: ["body", "mind", "soul", "bodyMind", "bodySoul", "mindSoul", "avg"]
    }),
    isGeniusSkill: new fields.BooleanField({ initial: false }),
    specialisations: new fields.ArrayField(new fields.SchemaField({
      name: new fields.StringField({ initial: "" }),
      isFree: new fields.BooleanField({ initial: false }),
      spCost: new fields.NumberField({ integer: true, initial: 0 })
    })),
    sourceTemplateId: new fields.StringField({ initial: "" }),
    sourceTemplateName: new fields.StringField({ initial: "" })
  };
}
```

---

## System Settings

All registered in `registerSettings.mjs` via `game.settings.register("besm", key, config)`:

| Key | Type | Default | Scope | Notes |
|---|---|---|---|---|
| `skillMode` | String | "pointbuy" | world | choices: pointbuy, group |
| `powerLevel` | String | "adventurer" | world | choices: subhuman through godlike |
| `cpBase` | Number | 50 | world | GM sets exact value within power level range |
| `enforceBenchmarks` | Boolean | true | world | |
| `benchmarkWarningsOnly` | Boolean | true | world | |
| `sanityEnabled` | Boolean | false | world | |
| `socialCombatEnabled` | Boolean | false | world | |
| `trackMovement` | Boolean | false | world | |
| `allowStatsAbove12` | Boolean | false | world | |
| `allowGeniusSkills` | Boolean | false | world | |
| `geniusSkillMaxRank` | Number | 12 | world | |
| `genreTemplate` | String | "universal" | world | |
| `initiativeMode` | String | "cv_plus_2d6" | world | choices: cv_plus_2d6, cv_static |
| `gearBudgetPerLevel` | Number | 5 | world | |
| `worldSkillOverrides` | Object | {} | world | Layer 3 of skill config |

---

## Registration in besm4e.mjs

The `init` hook registers all models and settings:

```js
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
  // ... existing sheet registration
});
```

---

## Implementation Notes

- **StringField `choices`:** Foundry V14 may require `choices` as an object `{ key: "Label" }` rather than an array `["key1", "key2"]`. Verify against Foundry V14 API and adjust accordingly.

---

## Constraints

- No `prepareDerivedData()` logic — derived fields exist but remain at initial values
- No UI changes — Phase 0 sheet continues to work as-is
- No `template.json` — TypeDataModels only
- All models use `foundry.data.fields` exclusively
- No game logic — just field declarations and settings registration
