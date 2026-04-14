# Phase 9: Compendium Population

## Goal

Populate Foundry VTT compendium packs with all BESM 4e attributes, defects, enhancements, limiters, and skills from the existing character builder data libraries. Items include names, costs, short descriptions, and source book tags — enough to be mechanically useful without reproducing copyrighted prose.

## Data Sources

TypeScript data libraries at `D:\Done\BESM 4e Character Builder\BESM_web_builder2\src\data\`:

| Library | File | Approximate Count |
|---------|------|-------------------|
| Attributes | `attributesLibrary.ts` | ~107 |
| Defects | `defectsLibrary.ts` | ~47 |
| Enhancements | `enhancementsLibrary.ts` | ~43 |
| Limiters | `limitersLibrary.ts` | ~67 (multi-level only) |
| Skills | `skillsCostsByGenre.ts` + `skillsMetadata.ts` | ~55 |

Sources span: BESM4e, Ikaris, Multiverse, Extras, Naked.

## Compendium Packs

Five packs, each typed as `Item`, configured in `system.json`:

| Pack ID | Label | Item Subtype |
|---------|-------|-------------|
| `attributes` | Attributes | `attribute` |
| `defects` | Defects | `defect` |
| `enhancements` | Enhancements | `enhancement` |
| `limiters` | Limiters | `limiter` |
| `skills` | Skills | `skill` |

### system.json packs entry format

```json
{
  "label": "Attributes",
  "type": "Item",
  "name": "attributes",
  "path": "packs/attributes",
  "system": "besm",
  "ownership": { "PLAYER": "OBSERVER", "ASSISTANT": "OWNER" }
}
```

## Schema Changes

Add a `source` StringField to each item TypeDataModel:

- `AttributeData.mjs` — `source: new fields.StringField({ initial: "BESM4e" })`
- `DefectData.mjs` — same
- `EnhancementData.mjs` — same
- `LimiterData.mjs` — same
- `SkillData.mjs` — same

This allows filtering compendium items by source book.

## Field Mapping

### Attributes

| Source Field | Foundry Field | Notes |
|-------------|---------------|-------|
| `name` | `name` | Document name |
| `description` + formatted `levels` | `system.description` | HTML with level table |
| `cost_per_level` | `system.baseCostPerLevel` | Integer; 0 if null |
| `source` | `system.source` | "BESM4e", "Ikaris", etc. |
| — | `system.purchasedLevel` | Default 1 |
| — | all other fields | Schema defaults |

Level descriptions formatted as an HTML list within the description field, e.g.:
```html
<p>Turn incoming physical harm into staying power...</p>
<ul>
  <li><strong>Level 1:</strong> Absorbs 5 damage</li>
  <li><strong>Level 2:</strong> Absorbs 10 damage</li>
</ul>
```

### Defects

| Source Field | Foundry Field | Notes |
|-------------|---------------|-------|
| `name` | `name` | Document name |
| `description` + formatted `ranks` | `system.description` | HTML with rank details |
| `cp_refund` | `system.cpGranted` | Integer |
| `rank_type` | `system.tier` | "Lesser"→"lesser", "Greater"→"greater", "Serious"→"serious" |
| `source` | `system.source` | |
| — | `system.rankLevel` | Default 1 |

### Enhancements

| Source Field | Foundry Field | Notes |
|-------------|---------------|-------|
| `name` | `name` | Document name |
| `description` | `system.description` | |
| `picks` | `system.levels` | Integer |
| `source` | `system.source` | |

### Limiters

Only multi-level entries (universal + specific). Skip pre-split duplicates (e.g., skip "Charges (4-6/day)" when "Charges" exists with `max_selections`).

| Source Field | Foundry Field | Notes |
|-------------|---------------|-------|
| `name` | `name` | Document name |
| `description` + formatted `assignments` | `system.description` | HTML with per-level details |
| `picks` | `system.levels` | Integer |
| `source` | `system.source` | |

Deduplication rule: if a limiter's `key` matches the prefix of another entry's `key` (e.g., `charges` vs `charges_1`), keep only the multi-level version (the one with `assignments` or `max_selections`).

### Skills

Skill list from `skillsCostsByGenre['Multi-Genre']` keys. Metadata from `skillsMetadata` where available.

| Source Field | Foundry Field | Notes |
|-------------|---------------|-------|
| key name | `name` | e.g., "Acrobatics" |
| metadata `description` | `system.description` | Falls back to empty if no metadata |
| metadata `defaultStat` | `system.linkedStat` | Mapped: "Body"→"body", "Mind"→"mind", "Soul"→"soul" |
| — | `system.source` | Default "BESM4e" |
| — | `system.costClass` | Default "framework" |
| — | `system.rank` | Default 0 |

## Build Script

`scripts/build-packs.mjs` — a Node.js script that:

1. Reads the TypeScript data files as text
2. Strips type annotations and extracts the data arrays
3. Transforms each entry per the field mappings above
4. Generates deterministic `_id` values (16-char hex derived from pack name + item key)
5. Writes individual JSON files to `packs/_source/<pack-name>/<item-key>.json`
6. Compiles source JSON into LevelDB packs at `packs/<pack-name>/` using `@foundryvtt/foundryvtt-cli`

### npm script

```json
"build:packs": "node scripts/build-packs.mjs"
```

### Directory structure

```
packs/
  _source/
    attributes/
      absorption.json
      alternate-form.json
      ...
    defects/
      achilles-heel.json
      ...
    enhancements/
      accurate.json
      ...
    limiters/
      activation.json
      ...
    skills/
      acrobatics.json
      ...
  attributes/    (compiled LevelDB — gitignored)
  defects/
  enhancements/
  limiters/
  skills/
```

### JSON document format

```json
{
  "_id": "a1b2c3d4e5f67890",
  "name": "Absorption",
  "type": "attribute",
  "system": {
    "description": "<p>Turn incoming physical harm into staying power...</p><ul><li><strong>Level 1:</strong> Absorbs 5 damage</li></ul>",
    "baseCostPerLevel": 5,
    "purchasedLevel": 1,
    "source": "BESM4e"
  }
}
```

Only fields that differ from schema defaults are included; Foundry merges with defaults on import.

## Out of Scope

- Genre-specific skill cost overrides (handled by skill engine layers)
- Race/class/size templates (separate compendium concern)
- Compendium browser UI enhancements (Phase 11)
- Full book descriptions or page references
