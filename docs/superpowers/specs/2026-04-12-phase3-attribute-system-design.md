# Phase 3 — Attribute System: Design Spec

**Goal:** Upgrade the Attributes tab to a fully interactive attribute management system with drag-and-drop from compendium, enhancement/limiter embedding, item sheets for editing, and gear budget tracking.

**Exit criteria:** Drag attribute/defect items from compendium onto the sheet to add them. Click an attribute to open its item sheet and edit fields. Drop enhancements/limiters onto an attribute row to embed them. Gear budget displays when a Gear attribute exists. Weapon sub-options appear when isWeapon is true.

---

## Component Architecture

### New Components

| Component | Responsibility |
|---|---|
| `src/components/ui/AttributeRow.svelte` | Interactive attribute display: name, Lv, effective level, cost, enhancement/limiter tags with remove buttons. Click opens item sheet. Drop zone for enhancement/limiter items. |
| `src/components/ui/DefectRow.svelte` | Interactive defect display: name, rank, CP granted. Click opens item sheet. |
| `src/components/ui/GearBudget.svelte` | Gear budget tracker: budget/spent/remaining derived from Gear attribute. |
| `src/components/items/AttributeSheet.svelte` | Attribute item edit form. All fields editable. Weapon sub-options section conditional on isWeapon. Enhancement/limiter list with remove buttons. |
| `src/components/items/DefectSheet.svelte` | Defect item edit form. All fields editable. |
| `src/components/items/EnhancementSheet.svelte` | Enhancement item edit form. Minimal: name, description, levels. |
| `src/components/items/LimiterSheet.svelte` | Limiter item edit form. Minimal: name, description, levels. |

### Modified Components

| Component | Changes |
|---|---|
| `src/components/tabs/AttributesTab.svelte` | Replace simple list with AttributeRow/DefectRow components. Add drop handler for attribute/defect items from compendium. Add GearBudget display. |

### New Sheet Host

| File | Responsibility |
|---|---|
| `src/sheets/BESMItemSheet.mjs` | Single DocumentSheetV2 subclass for all item types. Selects Svelte component based on `this.document.type`. Registered for all 6 item types. |

---

## AttributeRow Component

Displays a single attribute item as an interactive row:

```
[Superstrength]  Lv 3 → Eff 2  [Enh: Activation -1] [x]  12 CP
```

**Props:** `attribute` (item document), `actor` (parent actor)

**Behavior:**
- Click the row (except tag x buttons) → opens item sheet via `attribute.sheet.render(true)`
- Enhancement/limiter tags display inline, each with an "x" remove button
- Removing an enhancement: filters it out of `attribute.system.enhancements` array, calls `attribute.update()`
- Removing a limiter: same pattern with `attribute.system.limiters` array
- Drop zone: listens for `dragover`/`drop` events. On drop of enhancement/limiter item, reads the dropped item data, appends to the attribute's enhancements/limiters array

**Effective level display:** Only shows the "→ Eff N" badge when `purchasedLevel !== effectiveLevel`.

---

## DefectRow Component

Displays a single defect item:

```
[Fragile]  Rank 1  +2 CP
```

**Props:** `defect` (item document)

**Behavior:** Click → opens item sheet via `defect.sheet.render(true)`

---

## GearBudget Component

Displays when a Gear attribute exists on the actor:

```
Gear Budget: 15 / 8 / 7 remaining
```

**Props:** `actor`

**Behavior:** Finds the Gear attribute item (`name === "Gear"`), computes budget from `effectiveLevel * gearBudgetPerLevel` setting, sums `budgetCost` of all possessions linked to it.

---

## AttributesTab Changes

The current simple list is replaced with:

1. **Drop zone** for the whole tab — handles drops of `attribute` and `defect` type items from compendium/sidebar. Creates embedded documents on the actor via `actor.createEmbeddedDocuments("Item", [...])`.
2. **Collapsible Attributes section** — uses `AttributeRow` for each attribute item.
3. **Collapsible Defects section** — uses `DefectRow` for each defect item.
4. **GearBudget** — displayed between the sections when a Gear attribute exists.

---

## Item Sheet (BESMItemSheet)

A single `DocumentSheetV2` subclass that handles all item types. In `_replaceHTML()`, it selects the Svelte component based on `this.document.type`:

```js
const componentMap = {
  attribute: AttributeSheetComponent,
  defect: DefectSheetComponent,
  enhancement: EnhancementSheetComponent,
  limiter: LimiterSheetComponent,
  possession: PossessionSheetComponent,
  skill: SkillSheetComponent,
};
```

Possession and Skill sheets are minimal stubs for now (just name + description) — their full UI comes in Phase 4 and 5.

Registered in `besm4e.mjs` for all item types via:
```js
foundry.documents.collections.Items.registerSheet("besm", BESMItemSheet, {
  types: ["attribute", "defect", "enhancement", "limiter", "possession", "skill"],
  makeDefault: true,
  label: "BESM4e.SheetItem",
});
```

---

## AttributeSheet Component

Full edit form for an attribute item:

**Always visible fields:**
- Name (text input)
- Description (textarea)
- Base Cost Per Level (number input)
- Purchased Level (number input)
- Effective Level (read-only display)
- Total Cost (read-only display)
- Notes (textarea)

**Flags section:**
- isWeapon (checkbox)
- isSkillGroup (checkbox) — shows category dropdown when checked
- isSkillsAttribute (checkbox)
- isBenchmarkException (checkbox)
- isUnique (checkbox) — shows tier dropdown and unique description when checked

**Weapon Options section** (conditional, shown when isWeapon is true):
- Damage (text)
- Range (text)
- Accurate (number)
- Spreading (checkbox)
- isMuscleAttack (checkbox)

**Enhancements section:**
- List of embedded enhancements with name, levels, and remove button
- (Enhancements are added via drop on the AttributeRow on the actor sheet, not from within the item sheet)

**Limiters section:**
- Same pattern as enhancements

---

## DefectSheet Component

- Name, Description (textarea)
- CP Granted (number)
- Rank Level (number)
- isUnique (checkbox) — shows tier dropdown and unique description when checked

---

## EnhancementSheet / LimiterSheet Components

Minimal:
- Name, Description (textarea)
- Levels (number)
- Parent Attribute ID (read-only display — set when dropped onto an attribute)

---

## Drop Data Format

Foundry drag-and-drop provides item data via `event.dataTransfer`. When an item is dragged from the compendium or sidebar, the drop data contains `{ type: "Item", uuid: "..." }`. The handler calls `fromUuid()` to resolve the full item, then creates/embeds as appropriate.

For enhancement/limiter drops onto an AttributeRow:
1. Resolve the dropped item via `fromUuid()`
2. Read its `name` and `system.levels`
3. Append `{ id: foundry.utils.randomID(), name, levels }` to the attribute's enhancements/limiters array
4. Call `attribute.update({ "system.enhancements": [...] })`

---

## Constraints

- No compendium population — items are created manually or via console for testing
- Possession and Skill item sheets are minimal stubs (name + description only)
- Gear budget reads from the `gearBudgetPerLevel` system setting
- All Svelte 5 runes, no Svelte 4 patterns
- Enhancement/limiter items are NOT stored as separate embedded items on the actor — they exist only as array entries inside the parent attribute
