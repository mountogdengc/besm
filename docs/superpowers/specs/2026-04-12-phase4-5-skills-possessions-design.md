# Phase 4+5 — Skills & Possessions Interactive Tabs: Design Spec

**Goal:** Upgrade the Skills and Possessions tabs to be fully interactive with drag-and-drop from compendium, click-to-edit via item sheets, skill availability display, specialisation management, and gear budget in the Possessions tab.

**Exit criteria:** Drop skill/possession items from compendium onto their respective tabs. Click a skill to open its sheet and edit rank/specialisations. Unavailable skills shown grayed out. Flavor skills show zero cost. Specialisations manageable from the skill sheet. Gear budget displays in Possessions tab. Both skill modes (point-buy and group) render correctly.

---

## New Components

| Component | Responsibility |
|---|---|
| `src/components/ui/SkillRow.svelte` | Interactive skill display: name, rank, SP cost, linked stat, specialisation tags, availability state. Click opens skill sheet. |
| `src/components/ui/PossessionRow.svelte` | Interactive possession display: name, category badge, mechanical/flavor indicator, linked attribute name. Click opens possession sheet. |

## Modified Components

| Component | Changes |
|---|---|
| `src/components/tabs/SkillsTab.svelte` | Replace inline markup with SkillRow components. Add drop handler for skill items. In group mode, reuse AttributeRow for skill group attributes. |
| `src/components/tabs/PossessionsTab.svelte` | Replace inline markup with PossessionRow components. Add drop handler for possession items. Add GearBudget display. |
| `src/components/tabs/AttributesTab.svelte` | Remove GearBudget import and usage (moved to PossessionsTab). |
| `src/components/items/SkillSheet.svelte` | Upgrade from stub: add specialisation management (list, add, remove). First specialisation is free, additional cost 1 SP each. |

---

## SkillRow Component

Displays a single skill item:

```
[Acrobatics]  Rank 3  body  [Tumbling (free)] [Dodging (1 SP)]  3 SP
```

**Props:** `skill` (item document)

**Behavior:**
- Click → opens skill sheet via `skill.sheet.render(true)`
- If `isAvailable === false` → row styled with `opacity-40 line-through`
- If `isFlavor === true` → "(flavor)" tag shown, cost displays as "0 SP"
- Specialisations rendered as inline tags
- Linked stat shown as abbreviated label

---

## PossessionRow Component

Displays a single possession item:

```
[Sword]  gear  [mechanical]  Budget: 3
```

**Props:** `possession` (item document), `actor` (parent actor)

**Behavior:**
- Click → opens possession sheet via `possession.sheet.render(true)`
- Category shown as badge (gear/feature/other)
- Mechanical/flavor indicator badge
- If `linkedAttributeId` set, resolve and show linked attribute name
- If `isMechanical`, show budget cost

---

## SkillsTab Changes

**Point-buy mode:**
- Drop zone for skill items from compendium → `actor.createEmbeddedDocuments("Item", [...])`
- Each skill rendered via `SkillRow` component
- Skills sorted: available first, then unavailable

**Group mode:**
- Drop zone for attribute items with `isSkillGroup: true`
- Skill group attributes rendered via `AttributeRow` (reused from Phase 3)
- No individual skill rows in group mode

---

## PossessionsTab Changes

- Drop zone for possession items from compendium
- Each possession rendered via `PossessionRow`
- `GearBudget` component displayed at top when a Gear attribute exists on the actor

---

## SkillSheet Specialisation Management

The existing SkillSheet stub already has rank, cost class, linked stat, and flags. Add a specialisations section:

- List existing specialisations with name, free/paid indicator, and remove button
- "Add Specialisation" button at bottom
- First specialisation added gets `isFree: true, spCost: 0`
- Subsequent specialisations get `isFree: false, spCost: 1`
- Adding: prompt for name via inline text input, append to array, update item
- Removing: filter from array, update item. If the free one is removed and others exist, the first remaining becomes free.

---

## Constraints

- No genre template compendium data — Layer 2 overrides remain empty until Phase 8
- World overrides (Layer 3) already work from Phase 1c
- Gear budget component already exists — just moving it from AttributesTab to PossessionsTab
- All Svelte 5 runes, no Svelte 4 patterns
- No new sheet hosts needed — items already use BESMItemSheet from Phase 3
