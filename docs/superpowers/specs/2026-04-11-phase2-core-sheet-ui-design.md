# Phase 2 — Core Sheet UI: Design Spec

**Goal:** Build functional Svelte 5 character sheets for all four actor types (character, NPC, vehicle, mecha) using a sidebar + tabs layout. Stats are editable, CP/SP/derived values update live, benchmark warnings display. No item editing UI yet — items are added via console or drag-and-drop from sidebar.

**Exit criteria:** A GM can create any actor type, open its sheet, edit stats with +/- buttons or direct input, see CP/SP trackers update live, see derived stats recalculate, see attributes and defects listed on the sheet, and see benchmark warnings appear/clear as values change.

---

## Layout: Sidebar + Tabs

All four actor sheets share the same structural pattern:

**Sidebar (left, fixed width ~180px):**
- Actor name (editable input)
- Stats section: Body/Mind/Soul with +/- buttons AND direct number input, CP cost per stat displayed
- CP Tracker: total / spent / remaining
- SP Tracker: pool / spent / remaining (character only, point-buy mode only)
- Derived stats grid: HP (current/max), EP (current/max), ACV, DCV, SV, DM (base/melee), AR

**Main area (right, flex):**
- Tab bar across the top
- Active tab content below
- Benchmark panel (collapsible, amber-styled) appears at top of content area when warnings exist

Stats with `mode: "missing"` are hidden from the sidebar. Stats with `mode: "zero"` show as locked at 0.

---

## Sheets by Actor Type

### CharacterSheet

**Sidebar:** Full — name, all 3 stats, CP tracker, SP tracker, all derived stats
**Tabs:** Attributes | Skills | Possessions | Combat | Biography

- **Attributes tab:** Collapsible "Attributes" section listing attribute items (name, Lv/Eff, CP cost). Collapsible "Defects" section listing defect items (name, rank, CP granted in green). Defects section header styled in red.
- **Skills tab:** In point-buy mode: list of skill items (name, rank, SP cost, linked stat). In group mode: list of skill group attributes. (Basic list display — no editing in Phase 2)
- **Possessions tab:** List of possession items (name, category, mechanical/flavor badge). (Basic list display)
- **Combat tab:** Derived combat values displayed larger (ACV, DCV, DM, AR, SV, initiative). HP/EP bars with current value inputs.
- **Biography tab:** Rich text editor for biography field. Notes field.

### NPCSheet

**Sidebar:** Name, all 3 stats, CP tracker (no SP tracker), derived stats
**Tabs:** Attributes | Combat | Biography

Same components as CharacterSheet but fewer tabs. No Skills or Possessions tabs. No advancement.

### VehicleSheet

**Sidebar:** Name, Body stat only (Mind/Soul hidden since default "missing"), CP tracker, HP and AR only in derived section
**Tabs:** Attributes | Crew | Biography

- **Crew tab:** List of crew entries (actor name/UUID, role). Display only in Phase 2.

### MechaSheet

**Sidebar:** Name, Body stat (Mind/Soul hidden), CP tracker, HP/AR/ACV/DCV/DM in derived section, pilot link
**Tabs:** Attributes | Crew | Combat | Biography

- Pilot link shown as a text field in sidebar with "Open Pilot" button
- Combat tab same as CharacterSheet

---

## Component Architecture

```
src/components/
├── sheets/
│   ├── CharacterSheet.svelte     ← root component for character actors
│   ├── NPCSheet.svelte           ← root component for NPC actors
│   ├── VehicleSheet.svelte       ← root component for vehicle actors
│   └── MechaSheet.svelte         ← root component for mecha actors
├── sidebar/
│   ├── ActorSidebar.svelte       ← sidebar container (shared by all sheets)
│   ├── StatInput.svelte          ← single stat with +/- buttons + number input + CP cost
│   ├── CPTracker.svelte          ← CP total/spent/remaining display
│   ├── SPTracker.svelte          ← SP pool/spent/remaining display
│   └── DerivedStats.svelte       ← grid of derived stat values
├── tabs/
│   ├── TabBar.svelte             ← tab navigation
│   ├── AttributesTab.svelte      ← collapsible attributes + defects lists
│   ├── SkillsTab.svelte          ← skill list (point-buy or group mode)
│   ├── PossessionsTab.svelte     ← possession item list
│   ├── CombatTab.svelte          ← combat values + HP/EP bars
│   ├── BiographyTab.svelte       ← rich text editor
│   └── CrewTab.svelte            ← crew list (vehicle/mecha)
└── ui/
    ├── CollapsibleSection.svelte ← collapsible section with header + toggle
    ├── BenchmarkPanel.svelte     ← amber warning panel
    └── ResourceBar.svelte        ← HP/EP bar with current value input
```

Each sheet component composes from shared sidebar and tab components. The sidebar accepts props to control which sections to show (e.g., VehicleSheet passes `showSP={false}`, `showEP={false}`).

---

## Sheet Registration

Each actor type gets its own `DocumentSheetV2` subclass in `src/sheets/`:

- `BESMActorSheet.mjs` — existing, updated to mount CharacterSheet.svelte
- `BESMNPCSheet.mjs` — new, mounts NPCSheet.svelte
- `BESMVehicleSheet.mjs` — new, mounts VehicleSheet.svelte
- `BESMMechaSheet.mjs` — new, mounts MechaSheet.svelte

All four registered in `besm4e.mjs` init hook. Each follows the same `mount()`/`unmount()` pattern from Phase 0.

---

## Reactivity Pattern

Same pattern as Phase 0: each root Svelte component receives the actor document via `$props()`, copies to `$state()`, and listens for `updateActor` hook to refresh.

For stat editing, the component calls `actor.update({"system.stats.body.value": newValue})` which triggers Foundry's document update pipeline, fires `prepareDerivedData()`, and the hook refreshes the component with the updated actor.

---

## Styling

Tailwind CSS utility classes (no preflight — already disabled). Dark theme matching Foundry's aesthetic:
- Background: slate-900 / slate-800
- Text: slate-100 (primary), slate-400 (secondary)
- Borders: slate-700
- Accent: blue-500 (active tab), green-400 (positive values), red-400 (negative/defects), amber-500 (benchmark warnings)

---

## Constraints

- No item creation/editing UI — items are added via Foundry sidebar drag-and-drop or console. The sheet only displays them.
- No item sheet — clicking an item in the list does nothing in Phase 2.
- Biography uses Foundry's built-in ProseMirror editor (not a custom rich text component).
- All Svelte 5 runes — no Svelte 4 patterns.
- No jQuery, no legacy Application class.
