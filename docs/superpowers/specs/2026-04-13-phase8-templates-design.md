# Phase 8 — Template Engine: Design Spec

**Goal:** Build the template engine — a `besm4eTemplate` Item sub-type that can be dropped onto a character to apply a bundle of attributes and defects in one action, with badge tracking on the character sheet. Ships with generic example templates only (no book content).

**Exit criteria:** Create a template item with entries. Drop it onto a character. Items are created on the character, a badge appears on the sheet. Nested templates work recursively. Circular references are caught. Example templates demonstrate the system.

---

## BESMTemplateData Model

`src/models/items/BESMTemplateData.mjs` — extends `foundry.abstract.TypeDataModel`

```js
defineSchema():
  templateType: StringField, choices: ["race", "class", "size"], initial: "race"
  description: HTMLField
  pointTotal: NumberField, integer, initial: 0 (informational only)
  sizeRank: NumberField, integer, initial: 0, nullable: true
  entries: ArrayField of ObjectField
```

Each entry in the `entries` array is one of two shapes:

**Item entry:**
```js
{ entryType: "item", name: "Tough", itemType: "attribute", systemData: { baseCostPerLevel: 2, purchasedLevel: 1 } }
```

**Template reference entry:**
```js
{ entryType: "template", templateId: "some-uuid", templateName: "Size: Large" }
```

---

## Template Application (src/engine/templates.mjs)

### applyTemplate(template, actor, applying)

```
Input:
  template: Item document of type besm4eTemplate
  actor: Actor document to apply to
  applying: Set (circular reference guard, default new Set())

Logic:
  1. If applying.has(template.id) → warn and return (circular reference)
  2. Add template.id to applying
  3. Iterate template.system.entries:
     a. entryType "item" → collect into itemEntries array with sourceTemplateId/Name stamped
     b. entryType "template" → resolve via fromUuid(), recursively call applyTemplate()
  4. Batch create all itemEntries via actor.createEmbeddedDocuments("Item", itemEntries)
  5. Register badge: append to actor's appliedTemplates array
  6. Remove template.id from applying
```

The badge registration:
```js
const badges = [...(actor.system.appliedTemplates ?? [])];
badges.push({
  id: template.id,
  name: template.name,
  type: template.system.templateType,
  pointTotal: template.system.pointTotal,
  appliedAt: Date.now()
});
await actor.update({ "system.appliedTemplates": badges });
```

---

## Template Sheet (src/components/items/TemplateSheet.svelte)

Edit form for template items:

- Name (text input)
- Template Type (dropdown: race/class/size)
- Description (textarea)
- Point Total (number, informational)
- Size Rank (number, shown only when type is "size")
- Entries list:
  - Each entry shows: type badge (item/template), name, item type or template name
  - Remove button per entry
  - "Add Item Entry" button — adds an empty item entry with fields for name, itemType, and systemData (JSON textarea)
  - "Add Template Reference" button — adds an entry with templateId field

This is a GM-facing editor, so a simple functional UI is fine.

---

## Template Badges (src/components/ui/TemplateBadges.svelte)

Displayed in the character sheet between the sidebar and the tab bar (or at the top of the main content area).

```
[Race: Hardy] [Class: Warrior] [Size: Large]
```

Each badge:
- Shows template type + name
- Styled as small colored pills (race=green, class=blue, size=amber)
- Click does nothing in v1 (read-only badge)

Props: `actor` — reads `actor.system.appliedTemplates`

---

## Character Sheet Integration

`CharacterSheet.svelte` modified:
- Import TemplateBadges
- Render TemplateBadges between TabBar and BenchmarkPanel
- Add drop handler: when a `besm4eTemplate` item is dropped on the sheet, call `applyTemplate()`

---

## Registration

- `system.json`: add `"besm4eTemplate": {}` to `documentTypes.Item`
- `besm4e.mjs`: register `BESMTemplateData` in `CONFIG.Item.dataModels.besm4eTemplate`
- `BESMItemSheet.mjs`: add `besm4eTemplate: TemplateSheet` to the component map
- Register sheet for the new type

---

## Example Templates

Three generic templates created as world items during testing (not shipped as compendium packs):

**Example Race: Hardy**
- type: race, pointTotal: 4
- entries: [{ entryType: "item", name: "Tough", itemType: "attribute", systemData: { baseCostPerLevel: 2, purchasedLevel: 2 } }]

**Example Class: Warrior**
- type: class, pointTotal: 6
- entries: [
    { entryType: "item", name: "Attack Mastery", itemType: "attribute", systemData: { baseCostPerLevel: 3, purchasedLevel: 1 } },
    { entryType: "item", name: "Defence Mastery", itemType: "attribute", systemData: { baseCostPerLevel: 3, purchasedLevel: 1 } }
  ]

**Example Size: Large**
- type: size, pointTotal: 0, sizeRank: 1
- entries: [{ entryType: "item", name: "Size Modifier", itemType: "attribute", systemData: { baseCostPerLevel: 0, purchasedLevel: 1 } }]

---

## Constraints

- No book content — examples are generic and clearly labeled
- No bulk template removal in v1 — items carry `sourceTemplateId` for future v2 removal
- Template point total is informational only — not used in CP math
- Nested template resolution requires the referenced template to exist (fromUuid)
- The circular reference guard is per-application (Set passed through recursion), not persisted
- Template sheet is functional but basic — GM-facing editor, not player-facing
