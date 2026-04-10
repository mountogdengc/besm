# BESM 4th Edition — Foundry VTT System Design Document
**Stack:** Svelte 5 · Vite 6 · @sveltejs/vite-plugin-svelte · Tailwind CSS · Foundry VTT V14+
**Approach:** TypeDataModel only (no template.json) · ApplicationV2 render pipeline · Manual Svelte mount (no TRL)
**Compatibility target:** V14 minimum · V16-safe (no deprecated APIs)
**Node.js requirement:** v24+ (required by Foundry V14/Electron 40)
**Reference implementation:** SWSE v14 rebuild (SWSECharacterSheet.mjs pattern)

---

## V14/V16 Compatibility Contract

Every architectural decision in this system must satisfy the following constraints. These are not optional — they reflect APIs that are **removed in V16**:

| Deprecated API | Removed in | Replacement used in this system |
|---|---|---|
| `template.json` schema | V16 | `foundry.abstract.TypeDataModel` exclusively |
| Legacy `Application` class | V16 | `foundry.applications.api.ApplicationV2` / `DocumentSheetV2` |
| `Dialog` class | V16 | `foundry.applications.api.DialogV2` |
| jQuery as default | V16 | Native DOM via Svelte — no `$()` usage |
| Old roll modes (`ChatLog.MESSAGE_PATTERNS`) | V16 | Chat Message Visibility Modes API |
| Custom `Document` subclasses outside type system | V14+ | `TypeDataModel` sub-types registered in CONFIG |

Any code review or PR should check against this table before merging.

---

## Core Design Philosophy

BESM's central design tension is **genre context determines mechanical weight**. A feature, a skill, a piece of gear — any of these may be a fully costed mechanical element in one campaign and pure flavor in another. Every architectural decision in this system must respect that tension. The system does not impose mechanical significance; it provides the tools for the GM and genre to do so.

---

## Part 1: Data Architecture

### 1.1 Actor Types

| Type | Description |
|---|---|
| `character` | Player characters and named NPCs |
| `npc` | Generic/unnamed NPCs (simplified sheet) |
| `vehicle` | Vehicles with crew/passenger tracking |
| `mecha` | Mecha with pilot integration |

All actor types share a base schema. Specialized types extend it.

#### Base Actor Schema
```js
{
  biography: String,
  genre: String,           // inherited from world setting, overridable per-actor
  cpTotal: Number,         // total CP pool (base + defect grants)
  cpSpent: Number,         // derived from attribute items
  cpRemaining: Number,     // derived: cpTotal - cpSpent
  stats: {
    body: {
      value: Number,         // starts at 0; each +1 costs 2 CP (4 CP above 12)
      cpCost: Number,        // DERIVED — see stat cost formula in Part 4
      mode: String           // "normal" | "zero" | "missing" — see Stat Mode below
    },
    mind: {
      value: Number,
      cpCost: Number,
      mode: String
    },
    soul: {
      value: Number,
      cpCost: Number,
      mode: String
    }
  },
  derived: {
    // Health
    hp: Number,            // (Body + Soul) × 5 + (Tough × 10) - (Fragile × 10)
    hpMax: Number,         // same as hp at full health; tracked separately from currentHp
    hpApplicable: Boolean, // false for entities where HP doesn't apply
    currentHp: Number,     // tracked — reduced by damage; below 0 = unconscious
    epApplicable: Boolean, // false for entities where EP doesn't apply
    ep: Number,            // (Mind + Soul) × 5 + (Energised × 10)
    epMax: Number,
    currentEp: Number,     // tracked — at 0 = unconscious from exhaustion
    hpAsEp: Boolean,       // true = HP pool serves as EP when EP not applicable
    epAsHp: Boolean,       // true = EP pool serves as HP when HP not applicable

    // Combat
    sv: Number,            // HP / 5, capped at HP / 2; +10 per Combat Technique (Hardboiled)
    acv: Number,           // floor((B+M+S)/3) + Attack Mastery level
    dcv: Number,           // floor((B+M+S)/3) + Defence Mastery level
    baseCv: Number,        // floor((B+M+S)/3) — stored separately for reference
    initiative: Number,
    damageMultiplier: Number,      // 5 + Massive Damage level (base, non-melee attacks)
    meleeDamageMultiplier: Number, // 5 + Massive Damage level + Superstrength level
    ar: Number,                    // sum of Armour + Force Field effective levels

    // Movement (all derived from Body stat; optional if GM doesn't track movement)
    walkSpeed: Number,     // Body × 1 m/round
    jogSpeed: Number,      // Body × 1.5 m/round
    runSpeed: Number,      // Body × 2 m/round
    sprintSpeed: Number,   // Body × 4 m/round (lower bound of 4-5)
    swimSpeed: Number,     // Body × 0.5 m/round
    jumpDistanceStationary: Number, // Body / 4 metres
    jumpDistanceMoving: Number,     // sprintSpeed / 4 metres

    // Optional derived values
    sanityPoints: Number,      // Mind + Soul; only if sanityEnabled world setting
    sanityMax: Number,
    currentSanity: Number,

    // Social combat (only if socialCombatEnabled world setting)
    socv: Number,              // floor((Mind + Soul) / 2); handles missing stats
    societyPoints: Number,     // base = socv
    societyPointsMax: Number,
    currentSocietyPoints: Number  // tracked; at 0 = socially defeated
  },
  skillMode: String,       // "group" | "pointbuy" — inherited from system, overridable
  notes: String
}
```

#### Stat Mode
Set per-stat on the character sheet. GM-editable; player-visible but not editable by default.

| Mode | Meaning | CV formula behaviour |
|---|---|---|
| `"normal"` | Stat has a value and participates fully | Included in sum, divisor unchanged |
| `"zero"` | Stat is effectively absent — mindless creature, zombie | Counted as 0, divisor stays at 3 |
| `"missing"` | Stat genuinely doesn't apply — ghost, AI, construct | Excluded from sum, divisor reduced by 1 |

The sheet renders each stat with a small mode indicator. For `"zero"` the stat field is locked at 0. For `"missing"` the stat field is hidden and the derived values recalculate automatically.

#### Character Actor Extensions
```js
{
  advancement: {
    sessionLog: Array,     // { session, cpAwarded, notes }
    totalEarned: Number,
    totalSpent: Number
  }
}
```

#### Mecha Actor Extensions
```js
{
  pilotId: String,         // linked Actor UUID
  pilotBonus: Object       // derived from pilot's stats when linked
}
```

---

### 1.2 Item Types

#### 1. `attribute`
The primary mechanical building block.

```js
{
  description: String,
  baseCostPerLevel: Number,
  purchasedLevel: Number,
  effectiveLevel: Number,        // DERIVED — see formula below
  totalCost: Number,             // DERIVED: baseCostPerLevel × purchasedLevel
  enhancements: Array<EmbeddedRef>,
  limiters: Array<EmbeddedRef>,
  isWeapon: Boolean,             // enables effectiveLevel floor of -1
  weaponOptions: {
    damage: String,
    range: String,
    accurate: Number,
    spreading: Boolean,
    // ... other Weapon sub-options
  },
  // Skill Group mode flags
  isSkillGroup: Boolean,         // true = this is a Skill Group attribute
  skillGroupCategory: String,    // "background" | "field" | "action" (sets cost: 1/2/3 CP/Level)
  skillGroupType: String,        // "academic" | "artistic" | "domestic" | etc.
  // Skills Attribute (point-buy mode) flags
  isSkillsAttribute: Boolean,    // true = this attribute generates an SP pool
  spPool: Number,                // DERIVED: purchasedLevel × 10 (only if isSkillsAttribute)
  spSpent: Number,               // DERIVED: sum of all skill item SP costs on this actor
  spRemaining: Number,           // DERIVED: spPool - spSpent
  // Benchmark flags
  isBenchmarkException: Boolean, // true = max level cap may be doubled or ignored
                                 // applies to: Alternate Identity, Combat Technique,
                                 //             Energised, Features
  // Unique Attribute/Defect flags
  isUnique: Boolean,             // true = freeform Unique Attribute or Unique Defect
  tier: String,                  // "lesser" | "greater" | "serious" (1/2/3 CP per level)
  uniqueDescription: String,     // describes what the unique attribute/defect does
  notes: String
}
```

**Effective Level Formula:**
```
effectiveLevel = purchasedLevel - sum(enhancement.levels) + sum(limiter.levels)
floor = isWeapon ? -1 : 0
effectiveLevel = Math.max(floor, effectiveLevel)
// no ceiling
```

#### 2. `enhancement`
Modifies effective level of a parent attribute downward. Always attribute-scoped.

```js
{
  description: String,
  levels: Number,          // how many effective levels this reduces
  parentAttributeId: String
}
```

#### 3. `limiter`
Modifies effective level of a parent attribute upward. Always attribute-scoped.

```js
{
  description: String,
  levels: Number,          // how many effective levels this adds
  parentAttributeId: String
}
```

#### 4. `defect`
Character-scoped. Grants bonus CP to the character's pool. Does not affect any attribute's effective level.

```js
{
  description: String,
  cpGranted: Number,       // added to actor.cpTotal
  rankLevel: Number,       // max 3 for Unique Defects
  isUnique: Boolean,       // true = freeform Unique Defect
  tier: String,            // "lesser" | "greater" | "serious" (1/2/3 CP per level)
  uniqueDescription: String
}
```

**Unique Defect rules:**
- Tier resolves cost: lesser = 1 CP/rank, greater = 2 CP/rank, serious = 3 CP/rank
- Maximum rank of 3 for Unique Defects — sheet enforces this cap when `isUnique: true`
- Cost is negative (grants CP): `cpGranted = tier cost × rankLevel × -1`

#### 5. `possession`
Covers gear, features, and any item that may or may not have mechanical weight depending on genre.

```js
{
  description: String,
  category: String,        // "gear" | "feature" | "other"
  isMechanical: Boolean,   // false = pure flavor, no math
  budgetCost: Number,      // only relevant if isMechanical + linked to Gear attribute
  linkedAttributeId: String, // optional — Gear or Feature attribute UUID
  notes: String
}
```

**Sheet behavior:**
- `isMechanical: false` → renders as a simple flavor tag, zero math impact
- `isMechanical: true` + linked to Gear attribute → counts against gear budget derived from that attribute's effective level
- `isMechanical: true` + linked to Feature attribute → counts against feature allowance

#### 6. `skill`
Only used in **point-buy mode**. Skills cost SP, not CP. CP only enters the picture when purchasing the `Skills` Attribute that generates the SP pool.

```js
{
  description: String,
  group: String,                  // book group OR GM-defined label
  rank: Number,                   // 1–6 normally; 1–12 for Genius Skills (GM permission)
  resolvedCostPerRank: Number,    // DERIVED from three-layer config: 1 | 2 | 3 SP/rank
  totalSpCost: Number,            // DERIVED: rank × resolvedCostPerRank
  isAvailable: Boolean,           // DERIVED from genre + world overrides
  isFlavor: Boolean,              // true = no SP cost, pure descriptor
  linkedStat: String,             // "body" | "mind" | "soul" | "bodyMind" | "bodySoul" | "mindSoul" | "avg"
  isGeniusSkill: Boolean,         // true = rank cap lifted to 12 (GM-gated)
  specialisations: [
    {
      name: String,
      isFree: Boolean,            // first specialisation per skill is always free
      spCost: Number              // 0 if isFree, else 1
    }
  ]
}
```

**Specialisation rules:**
- Each skill gets exactly one free Specialisation (the first added, `isFree: true`)
- Additional Specialisations cost 1 SP each
- On a matching roll the character gains a minor edge; if already receiving a minor edge it upgrades to a major edge

**Note on Skill Groups in group mode:** Skill Groups are **not** a separate item type. They are `attribute` items with `isSkillGroup: true` set on the attribute schema. Their CP cost per level follows the group category: Background = 1 CP/Level, Field = 2 CP/Level, Action = 3 CP/Level. The Attribute's effective level adds to the relevant Stat on Skill rolls. See the `attribute` item schema above.

---

## Part 2: Template System

Templates are pre-constructed packages of attribute and defect items that can be dragged onto a character sheet and applied in one action. They are delivery vehicles — once applied, each item they contain becomes a regular item on the character and participates in CP accounting normally. The template's listed point total is informational only.

### Template Document Type

Templates are implemented as a registered **Item sub-type** — not a custom Document class. Extending `foundry.abstract.Document` directly is not the correct V14 pattern for custom document types; sub-types registered via `TypeDataModel` in CONFIG are the supported approach.

Register the template type in `system.json`:
```json
{
  "documentTypes": {
    "Item": {
      "besm4eTemplate": {}
    }
  }
}
```

Define the TypeDataModel:
```js
// module/models/BESMTemplateData.mjs
export class BESMTemplateData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      templateType: new fields.StringField({
        choices: ["race", "class", "size"],
        required: true
      }),
      description: new fields.HTMLField(),
      pointTotal: new fields.NumberField({ integer: true, initial: 0 }),
      sizeRank: new fields.NumberField({ integer: true, initial: 0, nullable: true }),
      entries: new fields.ArrayField(new fields.ObjectField())
    };
  }
}

// Register in CONFIG
Hooks.on("init", () => {
  CONFIG.Item.dataModels["besm4eTemplate"] = BESMTemplateData;
});
```

This means templates live in the Item sidebar and compendium packs like any other Item, are draggable onto actor sheets, and participate in all standard Foundry document workflows without requiring any custom infrastructure.

Each entry in the `entries` array is one of two shapes:

```js
// Item entry — creates an item directly on the actor
{
  entryType: "item",
  name: String,
  itemType: String,       // "attribute" | "defect"
  systemData: Object      // full item system fields
}

// Template reference — recursively applies another template
{
  entryType: "template",
  templateId: String,     // UUID of the nested template
  templateName: String    // display name, for badge purposes
}
```

### Template Application

```js
async function applyTemplate(template, actor, applying = new Set()) {
  // Circular reference guard
  if (applying.has(template.id)) {
    console.warn(`BESM | Circular template reference detected: ${template.name}`);
    return;
  }
  applying.add(template.id);

  const itemEntries = [];

  for (const entry of template.system.entries) {
    if (entry.entryType === "item") {
      // Collect item data for batch creation
      itemEntries.push({
        name: entry.name,
        type: entry.itemType,
        system: {
          ...entry.systemData,
          sourceTemplateId: template.id,    // points to THIS template, not parent
          sourceTemplateName: template.name
        }
      });

    } else if (entry.entryType === "template") {
      // Recursively apply nested template
      const nested = await fromUuid(entry.templateId);
      if (!nested) {
        console.warn(`BESM | Nested template not found: ${entry.templateId}`);
        continue;
      }
      await applyTemplate(nested, actor, applying);
      // Nested template registers its own badge — no action needed here
    }
  }

  // Batch create all item entries from this template
  if (itemEntries.length > 0) {
    await actor.createEmbeddedDocuments("Item", itemEntries);
  }

  // Register this template's badge on the actor
  const appliedTemplates = [...(actor.system.appliedTemplates ?? [])];
  appliedTemplates.push({
    id: template.id,
    name: template.name,
    type: template.system.type,
    pointTotal: template.system.pointTotal,
    appliedAt: Date.now()
  });

  await actor.update({ "system.appliedTemplates": appliedTemplates });
  applying.delete(template.id);
}
```

**Key behaviors:**
- Each template — parent or nested — registers its own badge on the actor independently
- Items created by a nested template carry the nested template's `sourceTemplateId`, not the parent's
- Dropping a Race template that includes a Size template produces two badges: "Race: Goblin" and "Size: Tiny"
- The circular reference guard uses a `Set` passed through recursive calls — a template that references itself or creates a loop is caught and logged, not silently applied or crashed

### Template Badge

The actor schema gains an `appliedTemplates` array:

```js
appliedTemplates: [
  {
    id: String,           // template UUID
    name: String,         // display name
    type: String,         // "race" | "class" | "size"
    pointTotal: Number,   // informational — not used in CP math
    appliedAt: Number     // timestamp
  }
]
```

The sheet renders these as small removable badges in the character header. Clicking a badge in v1 opens a read-only template info dialog. **Bulk removal is a v2 feature** — see V2 Roadmap.

The `sourceTemplateId` field on each created item allows v2 to identify and remove all items from a given template in one action.

### Template Types

| Type | Source | Contents |
|---|---|---|
| `race` | Core book | Attributes and defects defining racial traits |
| `class` | Core book | Attributes and defects defining class capabilities |
| `size` | Core book | Attributes and defects from the Size table |

### Size Templates and the Size Table

Size templates apply attributes and defects derived from the Size Modifier table. The full table ships as a system constant for reference display on the sheet:

```js
const SIZE_TABLE = {
  "-10": { name: "Point",      heightRange: "100–400 μm",  liftMod: "÷5M",    dmgMod: -100, arOrDmg: "+100 dmg", rangedMod: +20, speedMult: "÷1000" },
  "-9":  { name: "Mote",       heightRange: "500–900 μm",  liftMod: "÷1M",    dmgMod: -90,  arOrDmg: "+90 dmg",  rangedMod: +18, speedMult: "÷500"  },
  "-8":  { name: "Speck",      heightRange: "1–4 mm",      liftMod: "÷250k",  dmgMod: -80,  arOrDmg: "+80 dmg",  rangedMod: +16, speedMult: "÷250"  },
  "-7":  { name: "Minute",     heightRange: "5–9 mm",      liftMod: "÷50k",   dmgMod: -70,  arOrDmg: "+70 dmg",  rangedMod: +14, speedMult: "÷125"  },
  "-6":  { name: "Wee",        heightRange: "1–2 cm",      liftMod: "÷10k",   dmgMod: -60,  arOrDmg: "+60 dmg",  rangedMod: +12, speedMult: "÷60"   },
  "-5":  { name: "Teeny",      heightRange: "3–4 cm",      liftMod: "÷2.5k",  dmgMod: -50,  arOrDmg: "+50 dmg",  rangedMod: +10, speedMult: "÷30"   },
  "-4":  { name: "Fine",       heightRange: "5–9 cm",      liftMod: "÷500",   dmgMod: -40,  arOrDmg: "+40 dmg",  rangedMod: +8,  speedMult: "÷15"   },
  "-3":  { name: "Diminutive", heightRange: "10–24 cm",    liftMod: "÷100",   dmgMod: -30,  arOrDmg: "+30 dmg",  rangedMod: +6,  speedMult: "÷8"    },
  "-2":  { name: "Tiny",       heightRange: "25–49 cm",    liftMod: "÷25",    dmgMod: -20,  arOrDmg: "+20 dmg",  rangedMod: +4,  speedMult: "÷4"    },
  "-1":  { name: "Small",      heightRange: "50–99 cm",    liftMod: "÷5",     dmgMod: -10,  arOrDmg: "+10 dmg",  rangedMod: +2,  speedMult: "÷2"    },
  "0":   { name: "Medium",     heightRange: "1–2 m",       liftMod: "—",      dmgMod: 0,    arOrDmg: "—",        rangedMod: 0,   speedMult: "—"     },
  "1":   { name: "Large",      heightRange: "3–4 m",       liftMod: "×5",     dmgMod: +10,  arOrDmg: "+10 AR",   rangedMod: -2,  speedMult: "×2"    },
  "2":   { name: "Huge",       heightRange: "5–8 m",       liftMod: "×25",    dmgMod: +20,  arOrDmg: "+20 AR",   rangedMod: -4,  speedMult: "×4"    },
  "3":   { name: "Mammoth",    heightRange: "9–15 m",      liftMod: "×100",   dmgMod: +30,  arOrDmg: "+30 AR",   rangedMod: -6,  speedMult: "×8"    },
  "4":   { name: "Gigantic",   heightRange: "16–30 m",     liftMod: "×500",   dmgMod: +40,  arOrDmg: "+40 AR",   rangedMod: -8,  speedMult: "×15"   },
  "5":   { name: "Gargantuan", heightRange: "31–60 m",     liftMod: "×2.5k",  dmgMod: +50,  arOrDmg: "+50 AR",   rangedMod: -10, speedMult: "×30"   },
  "6":   { name: "Colossal",   heightRange: "61–125 m",    liftMod: "×10k",   dmgMod: +60,  arOrDmg: "+60 AR",   rangedMod: -12, speedMult: "×60"   },
  "7":   { name: "Enormous",   heightRange: "126–250 m",   liftMod: "×50k",   dmgMod: +70,  arOrDmg: "+70 AR",   rangedMod: -14, speedMult: "×125"  },
  "8":   { name: "Monstrous",  heightRange: "251–500 m",   liftMod: "×250k",  dmgMod: +80,  arOrDmg: "+80 AR",   rangedMod: -16, speedMult: "×250"  },
  "9":   { name: "Titanic",    heightRange: "500–1000 m",  liftMod: "×1M",    dmgMod: +90,  arOrDmg: "+90 AR",   rangedMod: -18, speedMult: "×500"  },
  "10":  { name: "Monumental", heightRange: "1–2 km",      liftMod: "×5M",    dmgMod: +100, arOrDmg: "+100 AR",  rangedMod: -20, speedMult: "×1000" }
};
```

When a Size template is applied, the sheet badge shows the size rank name (e.g. "Size: Large"). The size reference data displays in a tooltip or expandable panel — purely informational, not mechanically enforced by the engine since the modifiers are already captured in the individual attribute and defect items the template creates.

---

## Part 3: The Three-Layer Skill Configuration

Skills are the most configuration-sensitive part of the system. Cost and availability resolve through three stacked layers:

```
Layer 1 (System)  → Book-accurate defaults: skill name, group, base cost class, base availability
Layer 2 (Genre)   → Table-03 overrides: cost class changes, availability toggles per genre
Layer 3 (World)   → GM overrides: any further customization on top of genre
```

**Resolution order:** Layer 3 wins over Layer 2 wins over Layer 1.

### What "cost" means in each mode

**Point-buy mode:** Each skill has a `costClass` of `"framework"` | `"adventure"` | `"genre"`, which resolves to 1/2/3 SP per rank respectively. Genre and world layers may change a skill's class. The SP cost is always `rank × resolvedCostPerRank`.

**Group mode:** Skill Groups are Attributes. Their CP cost per level is fixed by category — Background (1 CP/Level), Field (2 CP/Level), Action (3 CP/Level). The GM may recategorise groups to change their cost, which is a Layer 3 world setting. Individual skill cost classes are not relevant in group mode.

### Layer 1 — Shipped with the System
The compendium ships every book skill with its default cost class, group membership, linked stat, available specialisations, and default availability. These are read-only reference documents.

Skill Groups ship as compendium Attribute items with `isSkillGroup: true`, correct category, and member skill list for reference.

### Layer 2 — Genre Templates (Table-03)
The book provides 30 genre templates across Modern, Fantasy, Future, and Historical categories. Each ships as a compendium document:

```js
{
  genreId: "slice_of_life",
  genreName: "Slice of Life",
  category: "modern",
  skillCostOverrides: {
    // skill name → new cost class or explicit SP/rank value
    "Domestic Arts": { costClass: "genre" },   // bumped from framework to genre
    "Military Sciences": { costClass: "framework" },  // demoted
    "Acrobatics": { available: false }         // unavailable in this genre
  },
  skillGroupCostOverrides: {
    // group mode: recategorise groups
    "Domestic": { category: "action" }         // bumped to 3 CP/Level
  },
  assumedFree: ["Cooking"],                    // flavor-only in this genre, no SP cost
  startingCP: 50,
  optionalRules: []
}
```

### Layer 3 — World/GM Settings
Stored in `game.settings.worldSkillOverrides`. Mirrors the genre template structure exactly. GM can override any individual skill or group beyond genre defaults.

### Genius Skills
Rank cap is normally 6. The GM may enable Genius Skills per-world (system setting `allowGeniusSkills: true`), lifting the cap to a recommended maximum of 12. Individual skill items flag `isGeniusSkill: true` and the sheet enforces the cap accordingly. Rank 7+ requires GM approval by convention.

### Skill Mode Setting
```
game.settings: skillMode = "group" | "pointbuy"
```
World-level. Mutually exclusive. Drives entirely different sheet UIs and different CP/SP accounting.

**Group mode sheet:** Attribute rows for each purchased Skill Group, showing Level and CP cost. No SP pool. Roll buttons add Skill Group Level to relevant Stat.

**Point-buy mode sheet:** SP pool tracker (pool / spent / remaining) derived from the Skills Attribute. Individual skill rows showing rank, SP cost, specialisations, and roll button.

---

## Part 4: The CP Calculation Engine

The engine runs as a `prepareDerivedData()` override on the Actor DataModel. Skills consume SP from a secondary pool, not CP directly — this is the most important distinction from the original plan.

```js
prepareDerivedData() {
  const skillMode = game.settings.get("besm4e", "skillMode");

  // Step 1: Sum CP from stat purchases using tiered cost formula
  // 0-12: 2 CP per point
  // 13+:  2 CP per point up to 12, then 4 CP per point above 12
  function statCpCost(value) {
    if (value <= 0) return 0;
    if (value <= 12) return value * 2;
    return (12 * 2) + ((value - 12) * 4);
  }

  // Derive and cache cpCost per stat for sheet display
  for (const stat of Object.values(this.stats)) {
    stat.cpCost = stat.mode === "missing" ? 0 : statCpCost(stat.value);
  }

  const statCP = Object.values(this.stats)
    .reduce((sum, stat) => sum + stat.cpCost, 0);

  // Step 2: Sum CP from all attribute items
  // In both modes, Skill Groups (isSkillGroup) and the Skills Attribute
  // (isSkillsAttribute) are both attribute items — their CP cost is included here.
  const attributeCP = this.items
    .filter(i => i.type === "attribute")
    .reduce((sum, attr) => sum + (attr.system.baseCostPerLevel * attr.system.purchasedLevel), 0);

  // Step 3: CP from skills — ONLY in group mode do skills ever consume CP.
  // In point-buy mode, skills consume SP (secondary pool), not CP.
  // In group mode there are no individual skill items at all.
  const skillCP = 0; // Skills never add to CP spend directly in point-buy mode

  // Step 4: Sum CP grants from character-level defects
  const defectCP = this.items
    .filter(i => i.type === "defect")
    .reduce((sum, defect) => sum + defect.system.cpGranted, 0);

  // Step 5: Resolve CP totals
  this.cpTotal = this.cpBase + defectCP;
  this.cpSpent = statCP + attributeCP + skillCP;
  this.cpRemaining = this.cpTotal - this.cpSpent;

  // Step 6: Resolve SP pool (point-buy mode only)
  if (skillMode === "pointbuy") {
    const skillsAttr = this.items.find(
      i => i.type === "attribute" && i.system.isSkillsAttribute
    );
    if (skillsAttr) {
      const spPool = skillsAttr.system.purchasedLevel * 10;
      const spSpent = this.items
        .filter(i => i.type === "skill" && !i.system.isFlavor)
        .reduce((sum, skill) => {
          const rankCost = skill.system.rank * skill.system.resolvedCostPerRank;
          const specCost = skill.system.specialisations
            .filter(s => !s.isFree)
            .reduce((s, spec) => s + spec.spCost, 0);
          return sum + rankCost + specCost;
        }, 0);
      skillsAttr.system.spPool = spPool;
      skillsAttr.system.spSpent = spSpent;
      skillsAttr.system.spRemaining = spPool - spSpent;
      // Expose on actor for sheet convenience
      this.spPool = spPool;
      this.spSpent = spSpent;
      this.spRemaining = spPool - spSpent;
    }
  }

  // Step 7: Base CV from stat modes
  const bv = statValue(body);
  const mv = statValue(mind);
  const sv_stat = statValue(soul);

  const cvStats = [bv, mv, sv_stat].filter(v => v !== null);
  const cvSum = cvStats.reduce((s, v) => s + v, 0);
  const cvDivisor = cvStats.length;
  this.derived.baseCv = cvDivisor > 0 ? Math.floor(cvSum / cvDivisor) : 0;

  // ACV = baseCv + Attack Mastery level
  const attackMastery = this.items.find(
    i => i.type === "attribute" && i.name === "Attack Mastery"
  );
  this.derived.acv = this.derived.baseCv + (attackMastery?.system.effectiveLevel ?? 0);

  // DCV = baseCv + Defence Mastery level
  const defenceMastery = this.items.find(
    i => i.type === "attribute" && i.name === "Defence Mastery"
  );
  this.derived.dcv = this.derived.baseCv + (defenceMastery?.system.effectiveLevel ?? 0);

  // Step 8: HP — branches on stat modes; modified by Tough and Fragile
  const tough = this.items.find(i => i.type === "attribute" && i.name === "Tough");
  const fragile = this.items.find(i => i.type === "defect" && i.name === "Fragile");
  const toughBonus = (tough?.system.effectiveLevel ?? 0) * 10;
  const fragileReduction = (fragile?.system.rankLevel ?? 0) * 10;

  if (bv !== null && sv_stat !== null) {
    this.derived.hpApplicable = true;
    this.derived.hp = ((bv + sv_stat) * 5) + toughBonus - fragileReduction;
  } else if (bv === null && sv_stat !== null) {
    this.derived.hpApplicable = true;
    this.derived.hp = (sv_stat * 10) + toughBonus - fragileReduction;
  } else if (sv_stat === null && bv !== null) {
    this.derived.hpApplicable = true;
    this.derived.hp = (bv * 10) + toughBonus - fragileReduction;
  } else {
    this.derived.hpApplicable = false;
    this.derived.hp = this._resolveArmorHP();
  }
  this.derived.hpMax = this.derived.hp;

  // Step 9: EP — branches on stat modes; modified by Energised
  const energised = this.items.find(i => i.type === "attribute" && i.name === "Energised");
  const energisedBonus = (energised?.system.effectiveLevel ?? 0) * 10;

  if (mv !== null && sv_stat !== null) {
    this.derived.epApplicable = true;
    this.derived.ep = ((mv + sv_stat) * 5) + energisedBonus;
  } else if (mv === null && sv_stat !== null) {
    this.derived.epApplicable = true;
    this.derived.ep = (sv_stat * 10) + energisedBonus;
  } else if (sv_stat === null && mv !== null) {
    this.derived.epApplicable = true;
    this.derived.ep = (mv * 10) + energisedBonus;
  } else {
    this.derived.epApplicable = false;
    this.derived.ep = this._resolveEnergisedEP();
  }
  this.derived.epMax = this.derived.ep;

  // Step 10: Shock Value — HP/5, +10 per Combat Technique (Hardboiled), capped at HP/2
  const hardboiled = this.items.filter(
    i => i.type === "attribute" && i.name === "Combat Technique (Hardboiled)"
  ).length; // count assignments, not levels
  const svBase = this.derived.hpApplicable ? Math.floor(this.derived.hp / 5) : 0;
  const svCap = Math.floor(this.derived.hp / 2);
  this.derived.sv = Math.min(svCap, svBase + (hardboiled * 10));

  // Step 11: Damage Multiplier
  // Base DM: 5 + Massive Damage (all attacks)
  // Melee DM: 5 + Massive Damage + Superstrength (muscle-power attacks only)
  const massiveDamage = this.items.find(
    i => i.type === "attribute" && i.name === "Massive Damage"
  );
  const superstrength = this.items.find(
    i => i.type === "attribute" && i.name === "Superstrength"
  );
  const mdLevel = massiveDamage?.system.effectiveLevel ?? 0;
  const ssLevel = superstrength?.system.effectiveLevel ?? 0;
  this.derived.damageMultiplier = 5 + mdLevel;
  this.derived.meleeDamageMultiplier = 5 + mdLevel + ssLevel;

  // Step 12: AR — sum of Armour and Force Field effective levels
  this.derived.ar = this.items
    .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
    .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);

  // Step 13: Movement (Body-based; only calculated if body is not missing)
  if (bv !== null) {
    this.derived.walkSpeed = bv * 1;
    this.derived.jogSpeed = Math.round(bv * 1.5);
    this.derived.runSpeed = bv * 2;
    this.derived.sprintSpeed = bv * 4;
    this.derived.swimSpeed = Math.round(bv * 0.5);
    this.derived.jumpDistanceStationary = Math.floor(bv / 4);
    this.derived.jumpDistanceMoving = Math.floor(this.derived.sprintSpeed / 4);
  }

  // Step 14: Sanity Points (optional — only if sanityEnabled world setting)
  if (game.settings.get("besm4e", "sanityEnabled") && mv !== null && sv_stat !== null) {
    const unassailable = this.items.find(
      i => i.type === "attribute" && i.name === "Unassailable"
    );
    const unsettled = this.items.find(
      i => i.type === "defect" && i.name === "Unsettled"
    );
    const sanityBase = (mv ?? 0) + (sv_stat ?? 0);
    const sanityBonus = (unassailable?.system.effectiveLevel ?? 0) * 2;
    const sanityReduction = (unsettled?.system.rankLevel ?? 0) * 2;
    this.derived.sanityPoints = sanityBase + sanityBonus - sanityReduction;
    this.derived.sanityMax = this.derived.sanityPoints;
  }

  // Step 15: Social Combat Values (optional — only if socialCombatEnabled world setting)
  if (game.settings.get("besm4e", "socialCombatEnabled") && mv !== null && sv_stat !== null) {
    this.derived.socv = Math.floor(((mv ?? 0) + (sv_stat ?? 0)) / 2);
    this.derived.societyPoints = this.derived.socv;
    this.derived.societyPointsMax = this.derived.socv;
    // currentSocietyPoints tracked separately — initialized to max on first creation
  }
}
```

### SP Overspend Handling
If `spSpent > spPool`, the sheet renders the SP tracker in red and flags a validation warning. The system does not block saving — it warns. This mirrors how most Foundry systems handle budget overruns gracefully rather than locking the sheet.

### Roll Resolution by Stat
Some skills list a stat average (e.g. "Average of Body and Mind"). The `linkedStat` field handles this with enum values:

| `linkedStat` value | Roll target |
|---|---|
| `"body"` | Body stat |
| `"mind"` | Mind stat |
| `"soul"` | Soul stat |
| `"bodyMind"` | Math.round((Body + Mind) / 2) |
| `"bodySoul"` | Math.round((Body + Soul) / 2) |
| `"mindSoul"` | Math.round((Mind + Soul) / 2) |
| `"avg"` | Math.round((Body + Mind + Soul) / 3) |

**Effective Level resolution** runs per-attribute item, not in the actor engine:

```js
// Inside Attribute ItemDataModel.prepareDerivedData()
const enhancementReduction = this.enhancements
  .reduce((sum, e) => sum + e.levels, 0);
const limiterAddition = this.limiters
  .reduce((sum, l) => sum + l.levels, 0);

const floor = this.isWeapon ? -1 : 0;
this.effectiveLevel = Math.max(
  floor,
  this.purchasedLevel - enhancementReduction + limiterAddition
);
this.totalCost = this.baseCostPerLevel * this.purchasedLevel;
```

---

## Part 5: Power Level & Benchmark Validation

### Stat Cost Formula

Stats start at 0 and are purchased with CP at character creation and advancement:

```
Value 1–12:  2 CP per point
             Body 4 = 8 CP, Body 12 = 24 CP
Value 13+:   24 CP for the first 12 points, then 4 CP per additional point
             Body 13 = 28 CP, Body 14 = 32 CP, Body 15 = 36 CP
```

Stats above 12 require GM permission (`allowStatsAbove12` world setting). When the setting is disabled, the stat input on the sheet is capped at 12. When enabled, the sheet renders a visual indicator on any stat above 12 showing the elevated cost, consistent with the BenchmarkPanel advisory style.

Missing stats (`mode: "missing"`) have no CP cost regardless of value — they don't exist for this character type.

| Power Level | CP Range | Max Stat | Max Attr Level (Eff.) | CV Range | HP/EP Range | Damage Multiplier |
|---|---|---|---|---|---|---|
| Sub-Human | 0–24 | 5 | 2 | 1–6 | 10–40 | 2–4 |
| Human | 25–49 | 7 | 3 | 2–7 | 30–60 | 3–6 |
| Adventurer | 50–74 | 9 | 4 | 3–8 | 40–80 | 4–8 |
| Heroic | 75–99 | 10 | 5 | 4–9 | 50–100 | 4–9 |
| Mythical | 100–149 | 12 | 6 | 5–10 | 60–120 | 5–10 |
| Superhuman | 150–199 | 12+ | 7–8 | 6–12 | 70–140 | 5–11 |
| Superpowered | 200–249 | 12+ | 8–9 | 7–12+ | 80–160 | 6–12 |
| Godlike | 250+ | 12+ | 10+ | 8–12+ | 100–200+ | 6–14+ |

Benchmarks are **optional recommendations, not hard rules**. The system enforces them as warnings by default. A world setting (`benchmarkWarningsOnly: false`) can make them blocking, but this is not recommended.

### Benchmark Exception Attributes
With group consensus, the Maximum Attribute Level may be doubled or ignored for:
- **Alternate Identity**
- **Combat Technique**
- **Energised**
- **Features**

These four attribute compendium entries ship with `isBenchmarkException: true`. The benchmark validation pass skips the effective level cap check for any attribute carrying this flag.

### Benchmark Data Model

```js
const POWER_LEVEL_BENCHMARKS = {
  subhuman:    { cpMax: 24,  maxStat: 5,  maxAttrLevel: 2,  cvMin: 1, cvMax: 6,   hpMin: 10,  hpMax: 40,   dmgMin: 2, dmgMax: 4   },
  human:       { cpMax: 49,  maxStat: 7,  maxAttrLevel: 3,  cvMin: 2, cvMax: 7,   hpMin: 30,  hpMax: 60,   dmgMin: 3, dmgMax: 6   },
  adventurer:  { cpMax: 74,  maxStat: 9,  maxAttrLevel: 4,  cvMin: 3, cvMax: 8,   hpMin: 40,  hpMax: 80,   dmgMin: 4, dmgMax: 8   },
  heroic:      { cpMax: 99,  maxStat: 10, maxAttrLevel: 5,  cvMin: 4, cvMax: 9,   hpMin: 50,  hpMax: 100,  dmgMin: 4, dmgMax: 9   },
  mythical:    { cpMax: 149, maxStat: 12, maxAttrLevel: 6,  cvMin: 5, cvMax: 10,  hpMin: 60,  hpMax: 120,  dmgMin: 5, dmgMax: 10  },
  superhuman:  { cpMax: 199, maxStat: null, maxAttrLevel: 8,  cvMin: 6, cvMax: 12,  hpMin: 70,  hpMax: 140,  dmgMin: 5, dmgMax: 11  },
  superpowered:{ cpMax: 249, maxStat: null, maxAttrLevel: 9,  cvMin: 7, cvMax: null, hpMin: 80,  hpMax: 160,  dmgMin: 6, dmgMax: 12  },
  godlike:     { cpMax: null, maxStat: null, maxAttrLevel: null, cvMin: 8, cvMax: null, hpMin: 100, hpMax: null, dmgMin: 6, dmgMax: null }
  // null = no upper cap defined at this power level
};
```

### Benchmark Validation Pass

Runs at the end of `prepareDerivedData()` when `enforceBenchmarks` is enabled. Validates against **effective level**, not purchased level — a limiter-inflated attribute that exceeds the cap is flagged regardless of what was purchased.

```js
validateBenchmarks() {
  const powerLevel = game.settings.get("besm4e", "powerLevel");
  const bench = POWER_LEVEL_BENCHMARKS[powerLevel];
  const warnings = [];

  // Stat cap check — skips missing stats entirely, checks zero and normal stats
  if (bench.maxStat) {
    for (const [key, stat] of Object.entries(this.stats)) {
      if (stat.mode === "missing") continue; // missing stats have no value to check
      const val = stat.mode === "zero" ? 0 : stat.value;
      if (val > bench.maxStat)
        warnings.push(`${key} (${val}) exceeds recommended stat max of ${bench.maxStat}`);
    }
  }

  // Attribute effective level cap — validates effectiveLevel, not purchasedLevel
  if (bench.maxAttrLevel) {
    for (const attr of this.items.filter(i => i.type === "attribute")) {
      if (attr.system.isBenchmarkException) continue;
      if (attr.system.effectiveLevel > bench.maxAttrLevel)
        warnings.push(
          `${attr.name} effective level (${attr.system.effectiveLevel}) exceeds recommended max of ${bench.maxAttrLevel}`
        );
    }
  }

  // CV range checks
  if (bench.cvMin && this.derived.acv < bench.cvMin)
    warnings.push(`ACV (${this.derived.acv}) is below recommended minimum of ${bench.cvMin}`);
  if (bench.cvMax && this.derived.acv > bench.cvMax)
    warnings.push(`ACV (${this.derived.acv}) exceeds recommended maximum of ${bench.cvMax}`);

  // HP range checks
  if (bench.hpMin && this.derived.hp < bench.hpMin)
    warnings.push(`HP (${this.derived.hp}) is below recommended minimum of ${bench.hpMin}`);
  if (bench.hpMax && this.derived.hp > bench.hpMax)
    warnings.push(`HP (${this.derived.hp}) exceeds recommended maximum of ${bench.hpMax}`);

  this.benchmarkWarnings = warnings;
  this.benchmarkValid = warnings.length === 0;
}
```

### BenchmarkPanel Svelte Component

A collapsible panel rendered on the character sheet, visible to both player and GM:

```svelte
<!-- BenchmarkPanel.svelte -->
<script>
  export let actor;
  $: warnings = actor.system.benchmarkWarnings ?? [];
</script>

{#if warnings.length > 0}
  <div class="benchmark-panel border border-amber-500 rounded p-2 mt-2">
    <h4 class="text-amber-400 text-sm font-semibold">
      ⚠ Benchmark Recommendations ({warnings.length})
    </h4>
    <ul class="text-xs text-amber-300 mt-1">
      {#each warnings as w}
        <li>{w}</li>
      {/each}
    </ul>
    <p class="text-xs text-gray-400 mt-1 italic">
      These are recommendations, not restrictions. Consult your GM.
    </p>
  </div>
{/if}
```

The panel is hidden when there are no warnings. Language is explicitly advisory throughout.

---

## Part 6: The Gear Budget System

When a Gear attribute is on a character, it derives a **gear budget** from its effective level. Individual possession items with `isMechanical: true` and `linkedAttributeId` pointing to that Gear attribute count against the budget.

```js
// Derived on the Gear attribute item
this.gearBudget = this.effectiveLevel * GEAR_BUDGET_PER_LEVEL; // constant from system settings

// Derived on the actor
this.gearSpent = this.items
  .filter(i => i.type === "possession" && i.system.linkedAttributeId === gearAttrId)
  .reduce((sum, p) => sum + p.system.budgetCost, 0);

this.gearRemaining = gearAttr.system.gearBudget - this.gearSpent;
```

Since gear budget is freeform by design, `GEAR_BUDGET_PER_LEVEL` is a configurable world setting with a sensible default.

---

## Part 7: The Roll System

BESM uses 2d6, **roll-over** target number. Roll 2d6, add the relevant value, and compare the total to a Target Number or opposing roll. Higher is better.

### Target Number Range

| TN | Difficulty |
|---|---|
| 6 | Very Easy |
| 8 | Easy |
| 10 | Below Average |
| 12 | Average |
| 14 | Above Average |
| 16 | Difficult |
| 18 | Very Difficult |
| 20 | Extreme |
| 22 | Near Impossible |
| 24 | Improbable |

### The Four Roll Types

**Stat Roll** — innate ability, no skill involved
```
Total Roll = 2d6 + Stat Value
Success if Total Roll ≥ TN
```

**Skill Roll** — governed by both a stat and a Skill Group
```
Total Roll = 2d6 + Stat Value + Skill Group Level
Success if Total Roll ≥ TN
```
In point-buy mode, individual skill rank substitutes for Skill Group Level.

**Initiative Roll** — determines action order at combat start
```
Total Roll = 2d6 + ACV + bonuses
Higher result acts first
```

**Attack/Defence Roll** — opposed, both sides roll
```
Attacker Total = 2d6 + ACV + attribute bonuses
Defender Total = 2d6 + DCV + attribute bonuses
Attacker succeeds if Attacker Total > Defender Total
Ties go to the defender
```

### The BESMRoll Class

```js
class BESMRoll {
  constructor(type, actor, options = {}) {
    // type: "stat" | "skill" | "attack" | "defence" | "initiative" | "damage"
    this.type = type;
    this.actor = actor;
    this.options = options;
    this.formula = "2d6";
  }

  resolveTotalRoll(diceResult) {
    const s = this.actor.system;
    switch (this.type) {
      case "stat":
        return diceResult + this.resolveStatForRoll(this.options.stat);

      case "skill":
        return diceResult
          + this.resolveStatForRoll(this.options.stat)
          + (this.options.skillLevel ?? 0);

      case "initiative":
        return diceResult + s.derived.acv + (this.options.bonus ?? 0);

      case "attack":
        return diceResult + s.derived.acv + (this.options.bonus ?? 0);

      case "defence":
        return diceResult + s.derived.dcv + (this.options.bonus ?? 0);

      default:
        return diceResult;
    }
  }

  async roll() {
    const roll = await new Roll(this.formula).evaluate();
    const total = this.resolveTotalRoll(roll.total);
    return { roll, total, type: this.type };
  }

  // For non-opposed rolls: compare to TN
  resolveVsTN(total, tn) {
    const success = total >= tn;
    const margin = total - tn;
    return { success, margin };
  }

  // For opposed rolls: compare two totals
  // Ties go to the ATTACKER — attack succeeds if attackerTotal >= defenderTotal
  static resolveOpposed(attackerTotal, defenderTotal) {
    return {
      attackerWins: attackerTotal >= defenderTotal,
      margin: attackerTotal - defenderTotal
    };
  }

  async toMessage(total, result) {
    // Renders a Chat Message with:
    // - 2d6 breakdown
    // - Added value(s) and their sources
    // - Total roll
    // - TN (non-opposed) or opposing total (opposed)
    // - Success/Failure and margin
    // - Flavor text from attribute/skill name
  }
}
```

### Opposed Combat Roll Flow

Because Attack and Defence are both active rolls, the system needs to handle the timing:

1. Attacker clicks Attack button → `BESMRoll("attack")` is rolled and held
2. Defender is prompted to roll Defence (or can be auto-rolled for NPCs)
3. Both totals are compared via `BESMRoll.resolveOpposed()`
4. Result posted to chat with both rolls visible

For NPC defenders, the defence roll can be automated. For PC defenders, a prompt dialog gives them the option to roll manually or auto-resolve.

### Specialisation Edge Bonus

When a skill roll matches a character's Specialisation:
- **Minor edge:** Roll 3d6, drop the highest die
- **Major edge** (if already receiving minor edge): Roll 4d6, drop the two highest dice

```js
resolveEdgeFormula(baseEdge) {
  // baseEdge: null | "minor" | "major"
  if (baseEdge === null) return "2d6";
  if (baseEdge === "minor") return "3d6kl2"; // keep lowest 2
  if (baseEdge === "major") return "4d6kl2"; // keep lowest 2 of 4
}
```

The roll formula adjusts before evaluation when an edge applies.

### EP Roll Bonus

After rolling but before comparing to TN, a character may burn EP for a bonus. This is an active player decision — the system prompts after the roll result is visible:

```
Spend 10 EP → +1 to total roll
Maximum bonus = Soul stat value
```

```js
async applyEpBonus(roll, actor) {
  const maxBonus = actor.system.stats.soul.value;
  const availableEp = actor.system.derived.currentEp;
  const maxAffordable = Math.floor(availableEp / 10);
  const cap = Math.min(maxBonus, maxAffordable);

  if (cap === 0) return 0; // nothing to spend

  // Prompt using DialogV2 (Dialog removed in V16)
  // Render a simple number input from 0 to cap
  const content = `
    <p>Spend EP for a roll bonus? (10 EP per +1, max +${cap})</p>
    <div class="form-group">
      <label>EP to spend:</label>
      <input type="number" name="epSpend" value="0" min="0" max="${cap * 10}" step="10"/>
    </div>`;

  const result = await foundry.applications.api.DialogV2.prompt({
    window: { title: "Spend Energy Points" },
    content,
    ok: { label: "Confirm", callback: (event, button, dialog) => {
      const val = button.form.elements.epSpend.valueAsNumber;
      return Math.floor(Math.min(val, cap * 10) / 10);
    }}
  });

  const bonus = result ?? 0;
  if (bonus > 0) {
    await actor.update({
      "system.derived.currentEp": availableEp - (bonus * 10)
    });
  }
  return bonus;
}
```

The EP bonus prompt appears as a small dialog after the dice settle, before the chat message is posted. Players can skip it entirely if they don't wish to spend EP.

### Sanity Roll

Genre-specific. Only available when `sanityEnabled` world setting is active.

```
Sanity Roll Total = 2d6 + floor((Mind + Soul) / 2)
Success if Total ≥ TN
```

Skills may apply to Sanity rolls when the GM determines they are relevant — Cultural Arts, Occult, and Religion are the primary candidates. When a skill applies, the roll uses the Skill Roll formula instead:

```
Sanity Roll (with Skill) = 2d6 + floor((Mind + Soul) / 2) + Skill Rank
```

Sanity loss on a failed roll is determined by the GM based on the severity of the traumatic event. At 5 or below remaining Sanity Points the sheet renders a warning indicator.

### Social Combat Roll

Available only when `socialCombatEnabled` world setting is active.

```
Social Combat Roll = 2d6 + SoCV + Skill Level + edges
```

Relevant skills: Social Skill Group (group mode) or individual social skills — Persuasion, Intimidation, Etiquette, Empathy, Seduction, and others as GM determines.

**Ties are rerolled** — unlike physical combat where the attacker wins ties. Social combat uses a separate opposed resolution method:

```js
static resolveSocialOpposed(attackerTotal, defenderTotal) {
  if (attackerTotal === defenderTotal) return { tie: true };
  return {
    tie: false,
    attackerWins: attackerTotal > defenderTotal,
    margin: Math.abs(attackerTotal - defenderTotal)
  };
}
```

### Social Damage (Table-05)

Damage to Society Points is determined by the victor's margin of success via a stepped lookup — not a linear formula:

| Margin of Success | Description | SP Damage |
|---|---|---|
| 1–2 | Slight Success | 1 |
| 3–5 | Moderate Success | 2 |
| 6–11 | Significant Success | 3 |
| 12–17 | Major Success | 4 |
| 18+ | Extreme Success | 5 |

```js
function socialDamage(margin) {
  if (margin >= 18) return 5;
  if (margin >= 12) return 4;
  if (margin >= 6)  return 3;
  if (margin >= 3)  return 2;
  if (margin >= 1)  return 1;
  return 0; // no damage on tie (reroll) or negative margin
}
```

### The 10-Category Edge Checklist

The GM evaluates 10 social advantage categories before each social combat. The system renders these as an interactive pre-combat dialog. For each category, the GM marks: No Advantage / Significant (minor edge) / Overwhelming (major edge). After all 10 are evaluated the system calculates net edges automatically.

| # | Category | Auto-evaluable? |
|---|---|---|
| 1 | More societal privilege | No — GM judgment |
| 2 | Higher Body Stat | Yes |
| 3 | More Features (Appearance) assignments | Yes |
| 4 | Greater wealth or valuable assets | Partial — if wealth is tracked |
| 5 | Higher Connected Attribute relevant to combat | Yes |
| 6 | Greater number of nearby supportive allies | No — GM judgment |
| 7 | Moral high ground | No — GM judgment |
| 8 | Fewer combined public social and physical Defects | Yes |
| 9 | Better or more powerful special abilities | No — GM judgment |
| 10 | Relevant secret knowledge or advanced preparation | No — GM judgment |

Auto-evaluable categories pre-fill with a suggested advantage. GM can override any of them. Net edges feed directly into the roll formula.

### Society Point Recovery

Society Points recover at 1 SP/hour via Foundry's world time API:

```js
Hooks.on("updateWorldTime", (worldTime, delta) => {
  for (const actor of game.actors) {
    if (!actor.system.derived.socv) continue;
    const recovery = Math.floor(delta / 3600);
    if (recovery > 0) {
      const newSP = Math.min(
        actor.system.derived.societyPointsMax,
        actor.system.derived.currentSocietyPoints + recovery
      );
      actor.update({ "system.derived.currentSocietyPoints": newSP });
    }
  }
});
```

If the world doesn't use time tracking, a manual "Recover SP" button on the sheet allows the GM to increment by 1. the character substitutes a present stat. The system presents the choice rather than auto-selecting.

| Missing Stat | Substitution options |
|---|---|
| Missing Body | Body or Mind (player's choice) |
| Missing Mind | Body or Soul (player's choice) |
| Missing Soul | Body or Mind (player's choice) |

Single-stat characters always use their one present stat regardless of which stat a roll nominally calls for. No-stat entities cannot roll — the roll button is hidden when `mode === "missing"` and no substitute exists.

```js
resolveStatForRoll(nominalStat) {
  const stat = this.actor.system.stats[nominalStat];
  if (stat.mode !== "missing") return stat.value;

  const available = ["body", "mind", "soul"]
    .filter(k => this.actor.system.stats[k].mode !== "missing")
    .map(k => ({ key: k, value: this.actor.system.stats[k].value }));

  if (available.length === 0) return null;       // no roll possible
  if (available.length === 1) return available[0].value;

  // Prompt player to choose substitution using DialogV2 (Dialog removed in V16)
  return this._promptStatSubstitution(available);
}

async _promptStatSubstitution(available) {
  const buttons = Object.fromEntries(
    available.map(s => [s.key, {
      label: `${s.key.charAt(0).toUpperCase() + s.key.slice(1)} (${s.value})`,
      action: s.key
    }])
  );
  const chosen = await foundry.applications.api.DialogV2.wait({
    window: { title: "Missing Stat — Choose Substitute" },
    content: "<p>This roll calls for a missing stat. Choose which stat to substitute:</p>",
    buttons
  });
  return available.find(s => s.key === chosen)?.value ?? 0;
}

---

## Part 8: Combat System

### Initiative
BESM initiative is an active roll — `2d6 + ACV + bonuses`. Override Foundry's default d20 initiative:

```js
// In Combat class override
CONFIG.Combat.initiative = {
  formula: "2d6 + @derived.acv",
  decimals: 0
};
```

The `cv_static` world setting variant skips the dice and uses ACV directly as a tiebreaker value, with ties broken by a further 1d6 roll if needed.

### Status Effects
Map a BESM-accurate status set:

| Status | Mechanical Effect |
|---|---|
| `stunned` | Cannot act this round |
| `prone` | DCV penalty |
| `unconscious` | Out of combat |
| `dead` | HP at 0, shock value exceeded |
| `energyDepleted` | EP at 0 |
| `burning` | Ongoing damage per round |
| `bound` | Cannot move |

### Damage Calculation

When an attack succeeds, damage is calculated as:

```
Damage = (Damage Multiplier × Weapon Level) + attacker's ACV - target's AR
```

**Damage Multiplier is contextual:**
- All attacks: `5 + Massive Damage effective level`
- Muscle-power attacks (melee, thrown, Weapon with Muscle enhancement): `5 + Massive Damage level + Superstrength level`

```js
function calculateDamage(attacker, weaponAttr, defender) {
  // Select correct DM based on attack type
  const isMuscle = weaponAttr.system.isMuscleAttack ?? false;
  const dm = isMuscle
    ? attacker.system.derived.meleeDamageMultiplier
    : attacker.system.derived.damageMultiplier;

  const weaponLevel = weaponAttr.system.effectiveLevel;
  const acv = attacker.system.derived.acv;
  const ar = defender.system.derived.ar;

  return Math.max(0, (dm * weaponLevel) + acv - ar);
}
```

### Damage Application

```js
async applyDamage(amount) {
  const newHP = Math.max(0, this.system.derived.currentHp - amount);
  await this.update({ "system.derived.currentHp": newHP });

  // Shock Value check — if single hit damage >= SV, apply stunned
  if (amount >= this.system.derived.sv) {
    await this.applyStatus("stunned");
  }

  // Unconscious at 0 HP
  if (newHP === 0) await this.applyStatus("unconscious");
}
```

---

## Part 9: Svelte + ApplicationV2 Integration

This is the most critical architectural decision and must be resolved in Phase 0 before any other work.

### The Core Problem
Foundry V12 uses **ApplicationV2** as its new standard. The old `Application` class used `getData()` + `activateListeners()`. ApplicationV2 uses `_renderHTML()` / `_replaceHTML()`. Svelte needs to mount into this pipeline.

### Svelte 5 + ApplicationV2 Integration

This pattern is taken directly from the SWSE v14 rebuild. The ApplicationV2 subclass manually mounts a root Svelte 5 component — no TRL, no magic middleware.

```js
// sheets/BESMActorSheet.mjs
import { mount, unmount } from 'svelte';
import CharacterSheet from '../components/sheets/CharacterSheet.svelte';

export class BESMActorSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "actor-sheet"],
    position: { width: 800, height: 650 },
    window: { resizable: true }
  };

  #svelteComponent = null;

  async _renderHTML(context, options) {
    // Return a mount target — Svelte takes it from here
    const el = document.createElement("div");
    el.classList.add("svelte-mount");
    return el;
  }

  _replaceHTML(element, html, options) {
    super._replaceHTML(element, html, options);
    const target = html.querySelector(".svelte-mount");

    if (!this.#svelteComponent) {
      // Svelte 5: use mount() instead of new Component()
      this.#svelteComponent = mount(CharacterSheet, {
        target,
        props: { document: this.document, sheet: this }
      });
    }
    // Svelte 5 reactivity handles updates automatically via runes
    // No manual $set() needed — props update through the store
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

### Svelte 5 Reactivity Strategy

Svelte 5 uses runes (`$state`, `$derived`, `$effect`) instead of the writable store pattern from Svelte 4. Reactivity is handled through a reactive prop passed from the sheet host, updated via a Foundry hook:

```js
// In CharacterSheet.svelte
<script>
  let { document, sheet } = $props();

  // Re-render when the actor updates in Foundry
  $effect(() => {
    const hookId = Hooks.on("updateActor", (actor) => {
      if (actor.id === document.id) {
        // Svelte 5: direct prop mutation triggers reactivity
        document = actor;
      }
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>
```

This is cleaner than the Svelte 4 writable store approach — no separate store file, no manual subscription management beyond the hook cleanup.

### Vite 6 + Svelte 5 Configuration
```js
// vite.config.mjs
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: "src/besm4e.mjs",
      formats: ["es"],
      fileName: "besm4e"
    },
    rollupOptions: {
      external: [/^\/scripts\//, /^\/prosemirror/]
    }
  },
  server: {
    port: 29999,
    hmr: { port: 29999 }
  }
});
```

**package.json dependencies:**
```json
{
  "dependencies": {
    "svelte": "^5.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.0"
  }
}
```

---

## Part 10: Svelte Component Architecture

```
src/
├── besm4e.mjs              ← module entry point
├── sheets/
│   ├── BESMActorSheet.mjs  ← ApplicationV2 host, mounts Svelte root
│   ├── BESMItemSheet.mjs
│   └── ...
├── components/
│   ├── sheets/
│   │   ├── CharacterSheet.svelte
│   │   ├── NPCSheet.svelte
│   │   ├── VehicleSheet.svelte
│   │   ├── MechaSheet.svelte
│   │   └── tabs/
│   │       ├── StatsTab.svelte
│   │       ├── AttributesTab.svelte
│   │       ├── SkillsTab.svelte
│   │       ├── PossessionsTab.svelte
│   │       ├── CombatTab.svelte
│   │       └── BiographyTab.svelte
│   ├── items/
│   │   ├── AttributeSheet.svelte
│   │   ├── EnhancementSheet.svelte
│   │   ├── LimiterSheet.svelte
│   │   ├── DefectSheet.svelte
│   │   ├── PossessionSheet.svelte
│   │   └── SkillSheet.svelte
│   └── ui/
│       ├── AttributeRow.svelte
│       ├── EffectiveLevelBadge.svelte
│       ├── CPTracker.svelte
│       ├── SPTracker.svelte
│       ├── GearBudget.svelte
│       ├── BenchmarkPanel.svelte
│       ├── RollButton.svelte
│       ├── SkillGroup.svelte
│       ├── SkillRow.svelte
│       ├── FlavorTag.svelte
│       └── LinkedActorBadge.svelte
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
│       ├── SkillData.mjs
│       └── BESMTemplateData.mjs
├── rolls/
│   └── BESMRoll.mjs
├── combat/
│   └── BESMCombat.mjs
└── settings/
    └── registerSettings.mjs
```

### AttributeRow Component (Key Example)
```svelte
<!-- AttributeRow.svelte -->
<script>
  export let attribute;   // Item document
  export let actor;

  $: purchased = attribute.system.purchasedLevel;
  $: effective = attribute.system.effectiveLevel;
  $: cost = attribute.system.totalCost;
  $: levelMismatch = purchased !== effective;
</script>

<div class="attribute-row group">
  <span class="attr-name">{attribute.name}</span>
  
  <div class="level-display">
    <span class="purchased-level">Lv {purchased}</span>
    {#if levelMismatch}
      <span class="effective-level text-amber-400">→ Eff {effective}</span>
    {/if}
  </div>

  <span class="cp-cost">{cost} CP</span>

  <!-- Enhancement/Limiter dropzone, visible on hover -->
  <div class="mod-slots opacity-0 group-hover:opacity-100 transition-opacity">
    {#each attribute.system.enhancements as enh}
      <span class="enhancement-tag">{enh.name} -{enh.levels}</span>
    {/each}
    {#each attribute.system.limiters as lim}
      <span class="limiter-tag">{lim.name} +{lim.levels}</span>
    {/each}
    <button class="add-mod" on:click={() => openModDropzone(attribute)}>+</button>
  </div>
</div>
```

---

## Part 11: The Linked Actor System (Companion/Minion/Alternate Form)

### Companion & Minion
These attributes store a reference to a separate Actor document:

```js
// Inside the Companion/Minion attribute item
{
  linkedActorId: String,     // UUID of the linked Actor
  allowedCP: Number,         // derived: effectiveLevel × cpPerLevel constant
  linkedActorSpentCP: Number // synced from linked actor's cpSpent
  cpValid: Boolean           // linkedActorSpentCP <= allowedCP
}
```

The UI shows a link button that opens the linked actor's sheet, plus a CP validity badge (green = within budget, red = over).

### Alternate Form
Alternate Form uses the same Build Link pattern as Companion and Minion — it is a fully separate Actor document with its own attribute build. This is simpler and more consistent than managing form state on the parent actor.

The Alternate Form attribute item holds:
```js
{
  linkedActorId: String,     // UUID of the alternate form Actor
  allowedCP: Number,         // derived: effectiveLevel × cpPerLevel constant
  linkedActorSpentCP: Number // synced from linked actor's cpSpent
  cpValid: Boolean           // linkedActorSpentCP <= allowedCP
}
```

The extra behavior beyond Companion/Minion is the **Swap Form** button, which performs a token swap in the current scene:

```js
async function swapToAlternateForm(parentActor, altFormActor) {
  const token = parentActor.getActiveTokens()[0];
  if (!token) return;

  // Step 1: Calculate raw damage taken in current form
  // This is absolute damage, not a percentage — the new form recalculates
  // its own max HP from its stats and attributes independently
  const currentMaxHP = parentActor.system.derived.hp;
  const currentHP = parentActor.system.derived.currentHp;
  const damageTaken = Math.max(0, currentMaxHP - currentHP);

  // Step 2: Resolve new form's max HP from its own stats/attributes
  // prepareDerivedData() on altFormActor has already run — use its hp value
  const newMaxHP = altFormActor.system.derived.hp;

  // Step 3: Check for a one-time Healing attribute on the Alternate Form
  // A Healing attribute flagged as transformationHeal fires here and reduces
  // damageTaken before application — representing a 'refresh' on transformation
  const healAttr = altFormActor.items.find(
    i => i.type === "attribute" &&
         i.name === "Healing" &&
         i.system.transformationHeal === true
  );
  const healAmount = healAttr ? healAttr.system.effectiveLevel * HEAL_PER_LEVEL : 0;
  const adjustedDamage = Math.max(0, damageTaken - healAmount);

  // Step 4: Apply carried damage to new form
  const newCurrentHP = Math.max(0, newMaxHP - adjustedDamage);
  await altFormActor.update({ "system.derived.currentHp": newCurrentHP });

  // Step 5: Transfer active status effects
  const effects = token.actor.effects.map(e => e.toObject());
  await altFormActor.createEmbeddedDocuments("ActiveEffect", effects);

  // Step 6: Swap the token
  const { x, y, elevation } = token;
  await token.document.delete();
  await altFormActor.getTokenDocument({ x, y, elevation })
    .then(td => canvas.scene.createEmbeddedDocuments("Token", [td]));
}
```

**Key behaviors:**
- Damage carried over is absolute (HP lost), not proportional — the new form's max HP is fully recalculated from its own Body/Soul stats and attributes
- A form with higher Body/Soul has more headroom to absorb the same wound; a frailer form is more endangered by it
- A Healing attribute on the Alternate Form with `transformationHeal: true` fires once at the moment of transformation, reducing carried damage before it is applied — this models a form that 'refreshes' the character
- Active status effects transfer on swap
- Both actors are owned by the same player (folder ownership handles this — see Part 11)
- CP validation works identically to Companion/Minion

---

## Part 12: Character Folder System

Every character Actor automatically gets a dedicated folder on creation. All linked Actors created through that character's sheet (Minion, Companion, Alternate Form) are placed into this folder automatically.

### Auto-Creation Hook
```js
Hooks.on("createActor", async (actor) => {
  if (actor.type !== "character") return;
  const folder = await Folder.create({
    name: actor.name,
    type: "Actor",
    color: "#555555"
  });
  await actor.update({ folder: folder.id });
});
```

### Auto-Rename Hook
```js
Hooks.on("updateActor", async (actor, changes) => {
  if (!changes.name) return;
  const folder = game.folders.get(actor.folder);
  if (folder?.name === actor._source.name) {
    await folder.update({ name: changes.name });
  }
});
```

### Folder Ownership
Foundry cascades folder permissions to all contained documents. Assign player ownership at the folder level and all linked actors inherit it automatically. No per-actor permission management needed.

### Shared Companions
If two characters share a Companion actor, the Companion lives in whichever character's folder created it first. The second character references it by UUID regardless of folder location. Folder location does not affect the linking system.

---

## Part 13: Shared Assets

The book explicitly supports a group of characters jointly owning a single important asset — spaceship, mecha, base of operations, galleon, etc. — with CP costs split evenly among contributors. Companions may not contribute.

### Folder Structure
Shared assets live in a dedicated world-level folder, separate from all character folders:

```
📁 [Character Name]        ← per-character, private to that player
   └─ PC Actor
   └─ Minion Actor
   └─ Companion Actor
   └─ Alternate Form Actor

📁 Shared Assets           ← world-level, observer for all players
   └─ JSDF Cherry Blossom
   └─ Base of Operations
```

The Shared Assets folder is created automatically when the first shared asset is designated. Default permissions: Observer for all players, Owner for GM.

### The Ownership Share Attribute
Each contributing character carries an `ownershipShare` attribute item on their sheet:

```js
{
  linkedActorId: String,          // UUID of the shared asset Actor
  contributorIds: Array<String>,  // UUIDs of all contributing characters
  ownershipFraction: String,      // display string e.g. "1/6"
  individualCPCost: Number,       // totalAssetCP / contributorCount
  isValid: Boolean                // DERIVED — see validation below
}
```

### CP Validation
The shared asset Actor's sheet displays a **Contributors Panel**:

```js
prepareDerivedData() {
  const contributors = this.getLinkedContributors();
  const totalContributed = contributors
    .reduce((sum, c) => sum + c.ownershipShare.individualCPCost, 0);
  this.contributionValid = Math.abs(totalContributed - this.cpTotal) < 0.01;
  this.contributorCount = contributors.length;
  this.cpPerContributor = this.cpTotal / this.contributorCount;
}
```

The panel shows each contributor's name and CP share, a validity badge (green if contributions sum correctly, red if not), and a warning if any contributor is a Companion actor.

### Companion Contributor Guard
```js
function validateContributors(contributors) {
  const invalid = contributors.filter(c => c.type === "npc" && c.system.isCompanion);
  if (invalid.length > 0) {
    ui.notifications.warn(
      `Companions may not contribute to shared assets: ${invalid.map(c => c.name).join(", ")}`
    );
  }
}
```

---

## Part 14: System Settings Registry

```js
// registerSettings.js
const settings = [
  {
    key: "sanityEnabled",
    type: Boolean,
    default: false    // opt-in for horror/occult genres; adds Sanity Points derived value
  },
  {
    key: "socialCombatEnabled",
    type: Boolean,
    default: false    // opt-in for Extras social combat rules; adds SoCV and Society Points
  },
  {
    key: "trackMovement",
    type: Boolean,
    default: false    // opt-in; shows movement speed derived values on sheet
  },
    type: Boolean,
    default: false    // GM must explicitly enable; stats above 12 cost 4 CP/point
  },
    type: Boolean,
    default: false    // GM must explicitly enable; rank cap lifts from 6 to 12
  },
  {
    key: "geniusSkillMaxRank",
    type: Number,
    default: 12       // book-recommended ceiling; GM-adjustable
  },
  {
    key: "genreTemplate",
    type: String,
    default: "universal",
    choices: { universal, sliceoflife, mecha, fantasy, scifi, horror }
    // ... genre template IDs from compendium
  },
  {
    key: "skillMode",
    type: String,
    default: "pointbuy",
    choices: { pointbuy: "Point Buy", group: "Skill Groups" }
  },
  {
    key: "initiativeMode",
    type: String,
    default: "cv_plus_d6",
    choices: { cv_plus_d6: "CV + 1d6", cv_static: "CV (Static)" }
  },
  {
    key: "gearBudgetPerLevel",
    type: Number,
    default: 5
  },
  {
    key: "powerLevel",
    type: String,
    default: "adventurer",
    choices: {
      subhuman:    "Sub-Human (0–24 CP)",
      human:       "Human (25–49 CP)",
      adventurer:  "Adventurer (50–74 CP)",
      heroic:      "Heroic (75–99 CP)",
      mythical:    "Mythical (100–149 CP)",
      superhuman:  "Superhuman (150–199 CP)",
      superpowered:"Superpowered (200–249 CP)",
      godlike:     "Godlike (250+ CP)"
    }
  },
  {
    key: "cpBase",
    type: Number,
    default: 50    // GM sets exact value within the power level range
  },
  {
    key: "enforceBenchmarks",
    type: Boolean,
    default: true  // shows warnings when characters exceed benchmark recommendations
  },
  {
    key: "benchmarkWarningsOnly",
    type: Boolean,
    default: true  // true = warn only; false = hard block (not recommended)
  },
  {
    key: "statCostTable",
    // Body/Mind/Soul cost curve — configurable per genre
  },
  {
    key: "worldSkillOverrides",
    type: Object,
    default: {}   // Layer 3 of skill config
  }
];
```

---

## Part 15: Compendium Structure

| Pack | Contents |
|---|---|
| `besm4e.attributes` | All ~100+ book attributes as draggable Items with correct base costs |
| `besm4e.skill-groups` | All 11 Skill Group attributes (Background/Field/Action categories, correct CP costs) |
| `besm4e.enhancements` | All book enhancements |
| `besm4e.limiters` | All book limiters |
| `besm4e.defects` | All character-level defects with CP grant values |
| `besm4e.skills` | All book skills with cost class, group, linked stat, specialisation options |
| `besm4e.genre-templates` | All 30 Table-03 genres across Modern/Fantasy/Future/Historical categories |
| `besm4e.race-templates` | All book Race Templates with item manifests |
| `besm4e.class-templates` | All book Class Templates with item manifests |
| `besm4e.size-templates` | All 21 Size Templates (Point through Monumental) with item manifests |
| `besm4e.status-effects` | BESM-accurate status effect set |
| `besm4e.rollables` | Pre-built roll macros for common actions |
| `besm4e.sample-characters` | One prebuilt PC per genre template |

### Genre Template Coverage
**Modern:** Action Adventure, Animal Adventures, Classic Horror, Detective, Loony Cartoons, Romantic Comedy, Slice of Life, Spy Thriller, Supernatural Occult

**Fantasy:** Eco Fantasy, High Fantasy, Low Fantasy, Urban Fantasy

**Future:** Cyberpunk/Realitypunk, Hard SF, Mecha Drama, Post-Apocalyptic, Soft SF, Space Opera

**Historical:** 20th Century War, Age of Discovery, Age of Pirates, Age of Samurai, Ancient Mediterranean, Industrial Age, Middle Ages, Steampunk, Stone Age, Wild West

Each template ships with the full skill cost overrides from Table-03, group recategorisation overrides for group mode, `assumedFree` list, starting CP default, and optional rules flags.

> **Data entry note:** 30 genre templates × ~50 skills each is significant work. A spreadsheet-to-JSON import script is strongly recommended before Phase 8.

---

## Part 16: Development Phases

### Phase 0 — Foundation (Do This First)
**Goal:** Prove the Svelte 5 + ApplicationV2 integration works before writing any game logic. The SWSE v14 rebuild already has a working reference implementation of this pattern — Phase 0 is largely porting it to BESM's module structure.

**Prerequisites:** Node.js v24+ (required by Foundry V14/Electron 40)

- Verify Node.js v24+ installed
- Set up Vite 6 + Svelte 5 + @sveltejs/vite-plugin-svelte + Tailwind build pipeline
- Port `SWSECharacterSheet.mjs` ApplicationV2 mount pattern to `BESMActorSheet.mjs`
- Confirm HMR working against a local Foundry V14 instance
- Stub a single `DocumentSheetV2` sheet that mounts a root Svelte 5 component via `mount()`
- Confirm Svelte 5 rune-based reactivity: update actor in Foundry, see component re-render
- Establish folder structure and module entry point (`src/besm4e.mjs`)
- Confirm no `template.json` exists — TypeDataModels only
- Confirm no `Dialog`, `Application`, or jQuery usage anywhere

**Exit criteria:** A blank character sheet that opens, mounts a Svelte 5 component, and reactively displays actor name when renamed in Foundry. Zero deprecation warnings in the console.

---

### Phase 1 — Data Models
**Goal:** All schemas defined and validated before any UI work.

- Define all six Item DataModels with full field validation
- Define all four Actor DataModels
- Implement `prepareDerivedData()` on Actor (CP engine, derived stats, SP pool)
- Implement effective level formula on Attribute item
- Implement skill cost resolution (three-layer system)
- Implement benchmark validation pass (`validateBenchmarks()`)
- Register all System Settings including power level and benchmark toggles
- Flag the four benchmark exception attributes in compendium stubs
- **No UI work in this phase**

**Exit criteria:** Create a character in the console, add attribute items, verify CP math, effective level calculations, SP pool, and benchmark warnings all fire correctly.

---

### Phase 2 — Core Sheet UI
**Goal:** A functional but unstyled character sheet covering stats, CP, and benchmarks.

- Build CharacterSheet.svelte with tab structure
- StatsTab: Body/Mind/Soul inputs, CP tracker, derived stat display
- CPTracker component: total / spent / remaining, live updates
- SPTracker component: pool / spent / remaining (point-buy mode only)
- BenchmarkPanel component: advisory warnings, hidden when clean
- Basic AttributesTab: list view of attributes with purchased level, effective level, and cost
- Basic DefectsTab: list view of defects with CP grant

**Exit criteria:** A GM can create a character, set stats, add attributes, see correct CP totals live, and see benchmark warnings appear and clear as values change.

---

### Phase 3 — Attribute System
**Goal:** Full drag-and-drop attribute management with enhancement/limiter support.

- AttributeRow component with hover-reveal mod slots
- Drag enhancement/limiter items onto attribute rows
- EffectiveLevelBadge showing purchased vs effective
- Weapon attribute sub-options UI (conditional render based on isWeapon)
- Container attribute UI (Gear with budget tracker, Feature with allowance)

**Exit criteria:** Full attribute management workflow functional including Weapon and Gear.

---

### Phase 4 — Skill System
**Goal:** Both skill modes fully functional, genre config applied.

- Genre template loading from compendium
- Three-layer skill cost resolution confirmed working
- SkillsTab renders correctly for `pointbuy` mode
- SkillsTab renders correctly for `group` mode
- Skill availability driven by genre + world overrides
- isFlavor skills render as tags with zero cost

**Exit criteria:** Switch genre template, observe skills change cost/availability. Switch skillMode, observe sheet UI change.

---

### Phase 5 — Possessions
**Goal:** Full possession/gear/feature system.

- PossessionsTab with category filter (gear / feature / other)
- FlavorTag component for non-mechanical items
- GearBudget component linked to Gear attribute
- Drag-and-drop possession items onto sheet

**Exit criteria:** Add gear items, see budget deplete. Mark item as flavor, confirm no budget impact.

---

### Phase 6 — Roll System & Combat
**Goal:** All rolls functional, combat tracker integrated.

- BESMRoll class with all roll types
- RollButton components on stats, skills, and weapon attributes
- Chat message template for roll results
- CV-based initiative override
- Status effect set registered
- Damage application function
- CombatTab on sheet with ACV/DCV display and attack buttons

**Exit criteria:** Run a full combat encounter from initiative to damage application.

---

### Phase 7 — Linked Actors, Folders & Shared Assets
**Goal:** Companion, Minion, Alternate Form, character folders, and shared assets all working.

- Linked actor reference system on attribute items
- LinkedActorBadge component with open/validate buttons
- CP validation display for Companion/Minion/Alternate Form
- Alternate Form token swap button and HP carry-over logic
- Character folder auto-creation and auto-rename hooks
- Linked actors auto-placed into character folder on creation
- Shared Assets folder auto-creation
- Ownership Share attribute item type and Contributors Panel on shared asset sheet
- Companion contributor guard with warning notification

**Exit criteria:** Create a character with a Minion (confirm folder placement), swap an Alternate Form token in a scene, create a shared spaceship with two contributing PCs and verify CP math validates correctly. Attempt to add a Companion as contributor and confirm warning fires.

---

### Phase 8 — Compendium Population
**Goal:** Full book-accurate compendium shipped with system.

- All attributes entered with correct base costs
- All enhancements and limiters entered
- All defects with correct CP grants
- All skills with groups, costs, linked stats
- Genre templates for all major genres
- Sample characters for each genre

**This is significant data entry work. Budget accordingly.**

---

### Phase 9 — Vehicle & Mecha Sheets
**Goal:** Specialized actor sheets functional.

- VehicleSheet.svelte with crew/passenger tracking
- MechaSheet.svelte with pilot link
- Mecha-specific attribute handling
- Pilot bonus integration into mecha derived stats

---

### Phase 10 — Polish & QoL
**Goal:** Production-ready release.

- Full Tailwind styling pass across all sheets
- Accessibility audit
- Localization string extraction (en.json minimum)
- Compendium browser integration
- System settings UI polish
- Migration script scaffolding for future version updates
- README and contribution guide

---

### Phase 11 — Templates
**Goal:** Race, Class, and Size Templates functional with badge tracking.

- `BESMTemplate` document class registered with Foundry
- Template application function — drops items onto actor, records badge
- `appliedTemplates` array on actor schema with badge UI on sheet
- Template info dialog (read-only) on badge click
- Race template compendium pack fully populated
- Class template compendium pack fully populated
- Size template compendium pack fully populated (21 entries)
- `sourceTemplateId` stamped on all items created from templates (enables v2 bulk removal)

**Exit criteria:** Drop a Race template and a Size template onto a character. Verify all items are created, CP math updates correctly, badges appear on sheet, and each item carries `sourceTemplateId`.

---

## V2 Roadmap

Features confirmed in scope for a future version. Architecture in v1 should not block these.

| Feature | Notes |
|---|---|
| **Bulk template removal** | Remove all items from a template in one action using `sourceTemplateId`. Badge gains a remove button. |
| **Power Packs** | Collections of Limiters and Enhancements applied to individual Attributes. Represent paranormal origins, tech backgrounds, etc. Dragged onto an Attribute item, not an Actor. |
| **Power Bundles** | Pre-built Attribute items with attached Enhancements and Limiters. Six traditions (conjuration, evocation, perception, spirit, technology, transformation). Ship as compendium packs. |
| **BESM Extras template packs** | Additional Race, Class, and Bundle content from BESM Extra sourcebooks. |
| **Custom tradition builder** | GM tool for creating new Power Bundle traditions beyond the six defaults. |

---

## Known Hard Problems (Flag for Extra Time)

| Problem | Why It's Hard |
|---|---|
| Three-layer skill config | Three sources of truth, must resolve consistently and reactively |
| Weapon effective level -1 | Special case in an otherwise uniform formula — easy to miss in edge cases |
| Genre "assumed free" items | Needs to suppress CP cost without deleting the item |
| Mecha + pilot stat fusion | Two actor documents contributing to one derived data set |
| Alternate Form HP carry-over | Absolute damage transfer is clean; edge case is when new form has lower max HP than damage taken — character arrives at 0 HP or unconscious immediately |
| Shared asset CP validation | Querying contributors across multiple actor documents on every render |
| Compendium data entry | 100+ attributes is a lot of manual work — consider a data import script |

---

## What the Original Plan Got Right

- Everything-as-Item philosophy ✓
- DataModels recommendation ✓
- Build Link strategy for Companion/Minion ✓
- Phased development approach ✓

## What the Original Plan Got Wrong or Missed

- Used `template.json` (deprecated in V11+)
- Conflated Limiters and Defects as one concept
- Enhancement/Defect cost model described incorrectly
- Weapon-as-Macro loses all CP tracking
- No ApplicationV2 + Svelte integration guidance
- No roll system
- No derived stat formulas
- No combat system
- No initiative override
- No skill system architecture
- No possession/gear/feature type
- No genre system
- No compendium structure
- No vehicle or mecha actor types
- No character advancement tracking
