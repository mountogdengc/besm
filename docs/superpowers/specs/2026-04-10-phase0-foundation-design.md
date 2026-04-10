# Phase 0 — Foundation: Design Spec

**Goal:** Prove the Svelte 5 + Vite 6 + Tailwind CSS + ApplicationV2 integration works before writing any game logic.

**Exit criteria:** A blank character sheet that opens, mounts a Svelte 5 component, and reactively displays actor name when renamed in Foundry. Zero deprecation warnings in the console.

---

## Errata from Plan Review

The following issues were identified in the master plan (`BESM4e-FoundryVTT-System-Plan.md`) and should be corrected in a future pass:

1. **Opposed roll ties (line 984):** Prose says "Ties go to the defender" but code (line 1039) correctly uses `>=` (attacker wins). Fix the prose — attacker wins ties on physical combat.
2. **Mixed Svelte syntax:** Part 9 uses Svelte 5 runes correctly, but `AttributeRow.svelte` (Part 10, line 1540) uses Svelte 4 (`export let`, `$:`). All components must use Svelte 5 runes (`$props()`, `$derived()`, `$state()`, `$effect()`).
3. **Broken settings registry (Part 14, lines 1783-1788):** Two settings objects are missing their `key` fields. These are `allowStatsAbove12` and `allowGeniusSkills`.
4. **Phase ordering:** Templates (Phase 11) should move to Phase 8. New order: Phase 8 = Templates, Phase 9 = Compendium Population, Phase 10 = Vehicle/Mecha Sheets, Phase 11 = Polish & QoL.
5. **Initiative formula label:** Settings (Part 14, line 1811) labels the default mode as "CV + 1d6" but the actual formula is `2d6 + ACV`. Fix label to "ACV + 2d6".
6. **Template document type (Phase 11, line 2059):** Says "BESMTemplate document class" but Part 2 correctly defines templates as an Item sub-type via `TypeDataModel`. Phase 11 should reference the Item sub-type pattern, not a custom Document class.

---

## Project Structure

```
besm/
├── src/
│   ├── besm4e.mjs              <- module entry point, registers sheet + hooks
│   ├── sheets/
│   │   └── BESMActorSheet.mjs  <- DocumentSheetV2, mounts Svelte root
│   └── components/
│       └── sheets/
│           └── CharacterSheet.svelte  <- proof-of-life Svelte 5 component
├── dist/                       <- build output (git-ignored)
│   ├── besm4e.js
│   └── style.css
├── system.json                 <- Foundry system manifest
├── package.json
├── vite.config.mjs
├── svelte.config.js
├── tailwind.config.js
├── postcss.config.js
└── BESM4e-FoundryVTT-System-Plan.md
```

The Vite build compiles `src/besm4e.mjs` into `dist/besm4e.js` (ES module). `system.json` points Foundry at the built output. The `src/` tree is source-only — Foundry loads from `dist/`.

---

## system.json

Minimal manifest registering one actor type with no schema fields:

```json
{
  "id": "besm4e",
  "title": "BESM 4th Edition",
  "description": "Big Eyes, Small Mouth 4th Edition for Foundry VTT",
  "version": "0.0.1",
  "compatibility": {
    "minimum": "14",
    "verified": "14"
  },
  "esmodules": ["dist/besm4e.js"],
  "styles": ["dist/style.css"],
  "documentTypes": {
    "Actor": {
      "character": {}
    }
  },
  "authors": [{ "name": "mountogdengc" }],
  "socket": false,
  "url": "https://github.com/mountogdengc/besm.git"
}
```

No `template.json`. The `character` type is registered here; its schema will be defined via `TypeDataModel` in Phase 1.

---

## Build Pipeline

### Vite 6 Configuration

- `@sveltejs/vite-plugin-svelte` handles `.svelte` file compilation
- Tailwind CSS via PostCSS — only utility classes used in components get included in output
- HMR configured on port 29999 for live dev against local Foundry V14
- Rollup externals exclude Foundry's own scripts (`/scripts/`, `/prosemirror`)
- Output: `dist/besm4e.js` (ES format) + `dist/style.css`

### Dev Workflow

Run `npm run dev` (Vite dev server with HMR) while Foundry V14 is running. Edit Svelte components, see changes reflected live without full page reload.

### Dependencies

```json
{
  "dependencies": {
    "svelte": "^5.0.0"
  },
  "devDependencies": {
    "vite": "^6.0.0",
    "@sveltejs/vite-plugin-svelte": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.0.0"
  }
}
```

---

## ApplicationV2 Mount Pattern

`BESMActorSheet` extends `foundry.applications.api.DocumentSheetV2`:

1. **`_renderHTML(context, options)`** — creates a `<div class="svelte-mount">` element and returns it. This is the mount target for Svelte.
2. **`_replaceHTML(element, html, options)`** — on first render, calls Svelte 5's `mount()` to attach `CharacterSheet.svelte` to the mount target div, passing `{ document: this.document, sheet: this }` as props. On subsequent renders, Svelte's own reactivity handles updates — no manual `$set()` or re-mounting needed.
3. **`close(options)`** — calls `unmount()` on the Svelte component to clean up, then delegates to `super.close()`.

No TRL. No writable stores. No jQuery. No legacy `Application` class.

---

## Proof-of-Life Svelte Component

`CharacterSheet.svelte` is intentionally minimal:

- Receives initial `document` via `$props()` and copies it into a local `$state()` variable (props are not directly reassignable in Svelte 5 — a local `$state()` is needed for the hook to trigger reactivity)
- Displays the actor's name in a Tailwind-styled container
- Uses `$effect()` to register a Foundry `updateActor` hook that re-assigns the local `$state()` variable when the actor changes, triggering Svelte 5 reactivity
- Hook cleanup via `$effect()` return function

### Reactivity Flow

```
Actor renamed in sidebar
  -> Foundry fires "updateActor" hook
    -> $effect() callback re-assigns $state() variable
      -> Svelte 5 reactivity re-renders the name display
```

No manual subscription management beyond the hook setup/teardown in `$effect()`.

---

## Constraints

- **No `template.json`** — TypeDataModels only (V16 removes template.json)
- **No `Application` class** — DocumentSheetV2 only (V16 removes legacy Application)
- **No `Dialog` class** — DialogV2 only (V16 removes Dialog)
- **No jQuery** — native DOM via Svelte
- **No TRL** — manual Svelte mount, consistent with SWSE v14 reference pattern
- **Node.js v24+** — required by Foundry V14 / Electron 40

---

## Verification Checklist

- [ ] `npm run build` produces `dist/besm4e.js` and `dist/style.css`
- [ ] `npm run dev` starts Vite HMR server on port 29999
- [ ] Foundry V14 loads the system without errors
- [ ] Creating a `character` actor opens the sheet
- [ ] Sheet displays actor name via Svelte 5 component
- [ ] Renaming actor in sidebar updates the sheet reactively (no manual refresh)
- [ ] Editing a Svelte component with HMR running updates the sheet live
- [ ] Tailwind utility class renders correctly (confirms CSS pipeline)
- [ ] Console shows zero deprecation warnings
- [ ] No `template.json` file exists in the project
- [ ] `grep -r "Application\b" src/` returns zero hits (no legacy Application)
- [ ] `grep -r "Dialog\b" src/` returns zero hits (no legacy Dialog)
- [ ] `grep -r "\\$(" src/` returns zero hits (no jQuery)
