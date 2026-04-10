# Phase 0 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove the Svelte 5 + Vite 6 + Tailwind CSS + ApplicationV2 integration works in a Foundry VTT V14 system before writing any game logic.

**Architecture:** A minimal Foundry VTT system that registers a single `character` actor type, opens a `DocumentSheetV2` subclass as its sheet, and mounts a Svelte 5 component into it via `mount()`. The Svelte component uses runes (`$props()`, `$state()`, `$effect()`) to reactively display the actor's name. Vite 6 builds the source into a single ES module + CSS file. Tailwind CSS is included via PostCSS.

**Tech Stack:** Foundry VTT V14, Svelte 5, Vite 6, @sveltejs/vite-plugin-svelte 5, Tailwind CSS 4, PostCSS 8, Node.js v24+

**Spec:** `docs/superpowers/specs/2026-04-10-phase0-foundation-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Dependencies, scripts (`dev`, `build`) |
| `.gitignore` | Create | Ignore `node_modules/`, `dist/` |
| `vite.config.mjs` | Create | Vite 6 build config, Svelte plugin, Rollup externals, HMR port |
| `svelte.config.js` | Create | Svelte 5 compiler options |
| `postcss.config.js` | Create | PostCSS with Tailwind plugin |
| `tailwind.config.js` | Create | Tailwind content paths |
| `system.json` | Create | Foundry system manifest, actor type registration |
| `src/besm4e.mjs` | Create | Module entry point, imports sheet class, registers it on `init` hook |
| `src/sheets/BESMActorSheet.mjs` | Create | DocumentSheetV2 subclass, Svelte mount/unmount lifecycle |
| `src/components/sheets/CharacterSheet.svelte` | Create | Proof-of-life Svelte 5 component with reactive actor name |
| `src/styles/global.css` | Create | Tailwind directives import |

---

### Task 1: Initialize npm Project and Dependencies

**Files:**
- Create: `package.json`
- Create: `.gitignore`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "besm4e",
  "version": "0.0.1",
  "description": "BESM 4th Edition system for Foundry VTT",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "svelte": "^5.0.0"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^5.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^4.0.0",
    "vite": "^6.0.0"
  }
}
```

- [ ] **Step 2: Create .gitignore**

```
node_modules/
dist/
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`

Expected: Clean install with no errors. `node_modules/` created. `package-lock.json` generated.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: initialize npm project with Svelte 5 + Vite 6 + Tailwind CSS 4"
```

---

### Task 2: Configure Build Pipeline

**Files:**
- Create: `vite.config.mjs`
- Create: `svelte.config.js`
- Create: `postcss.config.js`
- Create: `tailwind.config.js`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create vite.config.mjs**

```js
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/besm4e.mjs",
      formats: ["es"],
      fileName: "besm4e",
    },
    rollupOptions: {
      external: [/^\/scripts\//, /^\/prosemirror/],
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 29999,
    hmr: { port: 29999 },
  },
});
```

- [ ] **Step 2: Create svelte.config.js**

```js
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    runes: true,
  },
};
```

Setting `runes: true` enforces Svelte 5 rune mode globally — any Svelte 4 syntax (`export let`, `$:`) will produce a compiler error, preventing accidental use of legacy patterns.

- [ ] **Step 3: Create postcss.config.js**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 4: Create tailwind.config.js**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{svelte,js,mjs}"],
};
```

- [ ] **Step 5: Create src/styles/global.css**

```css
@import "tailwindcss";
```

This is the Tailwind v4 entry point. Vite picks it up via the Svelte component imports.

- [ ] **Step 6: Commit**

```bash
git add vite.config.mjs svelte.config.js postcss.config.js tailwind.config.js src/styles/global.css
git commit -m "chore: configure Vite 6 + Svelte 5 + Tailwind CSS 4 build pipeline"
```

---

### Task 3: Create Foundry System Manifest

**Files:**
- Create: `system.json`

- [ ] **Step 1: Create system.json**

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
  "authors": [
    {
      "name": "mountogdengc"
    }
  ],
  "socket": false,
  "url": "https://github.com/mountogdengc/besm.git"
}
```

Key points:
- `esmodules` points to `dist/besm4e.js` — the Vite build output
- `styles` points to `dist/style.css` — the Vite CSS output
- `documentTypes.Actor.character` registers the actor type without any schema (Phase 1 adds the TypeDataModel)
- No `template.json` anywhere in the project

- [ ] **Step 2: Commit**

```bash
git add system.json
git commit -m "chore: add Foundry VTT V14 system manifest"
```

---

### Task 4: Create Module Entry Point

**Files:**
- Create: `src/besm4e.mjs`

- [ ] **Step 1: Create src/besm4e.mjs**

```js
import "./styles/global.css";
import { BESMActorSheet } from "./sheets/BESMActorSheet.mjs";

Hooks.on("init", () => {
  console.log("BESM 4e | Initializing BESM 4th Edition system");

  Actors.registerSheet("besm4e", BESMActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "BESM4e.SheetCharacter",
  });
});
```

This file:
- Imports the global CSS (Tailwind directives) so Vite includes it in the build
- Imports the sheet class
- Registers it as the default sheet for `character` actors on the `init` hook

- [ ] **Step 2: Commit**

```bash
git add src/besm4e.mjs
git commit -m "feat: add module entry point with actor sheet registration"
```

---

### Task 5: Create ApplicationV2 Sheet Host

**Files:**
- Create: `src/sheets/BESMActorSheet.mjs`

- [ ] **Step 1: Create src/sheets/BESMActorSheet.mjs**

```js
import { mount, unmount } from "svelte";
import CharacterSheet from "../components/sheets/CharacterSheet.svelte";

export class BESMActorSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "actor-sheet"],
    position: { width: 800, height: 650 },
    window: { resizable: true },
  };

  #svelteComponent = null;

  async _renderHTML(context, options) {
    const el = document.createElement("div");
    el.classList.add("svelte-mount");
    return el;
  }

  _replaceHTML(element, html, options) {
    super._replaceHTML(element, html, options);
    const target = element.querySelector(".svelte-mount") ?? element;

    if (!this.#svelteComponent) {
      this.#svelteComponent = mount(CharacterSheet, {
        target,
        props: { document: this.document, sheet: this },
      });
    }
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

Key details:
- Extends `DocumentSheetV2`, not the legacy `Application` class
- `_renderHTML` returns a plain div — Svelte takes over from there
- `_replaceHTML` calls `mount()` only once on first render; Svelte reactivity handles updates
- `close()` calls `unmount()` for clean teardown
- The `#svelteComponent` private field tracks the mounted instance

- [ ] **Step 2: Commit**

```bash
git add src/sheets/BESMActorSheet.mjs
git commit -m "feat: add DocumentSheetV2 subclass with Svelte 5 mount pattern"
```

---

### Task 6: Create Proof-of-Life Svelte Component

**Files:**
- Create: `src/components/sheets/CharacterSheet.svelte`

- [ ] **Step 1: Create src/components/sheets/CharacterSheet.svelte**

```svelte
<script>
  let { document: actorDocument } = $props();

  let actor = $state(actorDocument);

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) {
        actor = updatedActor;
      }
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>

<div class="p-4 text-lg font-bold text-white bg-gray-800 rounded">
  {actor.name}
</div>
```

Key details:
- `$props()` destructures the initial document prop (renamed to `actorDocument` to avoid shadowing the global `document`)
- `$state(actorDocument)` creates a local reactive copy that can be reassigned
- `$effect()` registers a Foundry `updateActor` hook that reassigns the `$state()` variable, triggering Svelte 5 reactivity
- The return function inside `$effect()` cleans up the hook when the component is destroyed
- Tailwind classes (`p-4`, `text-lg`, etc.) confirm the CSS pipeline works
- No `export let`, no `$:`, no Svelte 4 patterns — rune mode is enforced by `svelte.config.js`

- [ ] **Step 2: Commit**

```bash
git add src/components/sheets/CharacterSheet.svelte
git commit -m "feat: add proof-of-life Svelte 5 character sheet component"
```

---

### Task 7: Build and Verify

**Files:**
- None created — verification only

- [ ] **Step 1: Run the production build**

Run: `npm run build`

Expected: Vite outputs two files:
- `dist/besm4e.js` — ES module containing the compiled Svelte component and sheet class
- `dist/style.css` — compiled Tailwind CSS

Verify both files exist:
Run: `ls dist/`
Expected: `besm4e.js` and `style.css` listed

- [ ] **Step 2: Verify no banned patterns in source**

Run: `grep -rn "export let" src/ || echo "PASS: no Svelte 4 export let"`
Expected: "PASS: no Svelte 4 export let"

Run: `grep -rn "\\$:" src/ || echo "PASS: no Svelte 4 reactive declarations"`
Expected: "PASS: no Svelte 4 reactive declarations"

Run: `grep -rn "template.json" . --include="*.json" --include="*.mjs" --include="*.js" || echo "PASS: no template.json references"`
Expected: "PASS: no template.json references"

- [ ] **Step 3: Verify no template.json file exists**

Run: `test -f template.json && echo "FAIL: template.json exists" || echo "PASS: no template.json"`
Expected: "PASS: no template.json"

- [ ] **Step 4: Commit the build output**

The `dist/` directory is git-ignored. This step is a no-op — just confirming the ignore works:

Run: `git status`
Expected: `dist/` does not appear in untracked files

---

### Task 8: Manual Foundry Verification

**Files:**
- None — manual testing in Foundry VTT V14

This task requires a running Foundry VTT V14 instance with the `besm4e` system installed (this project directory is already inside `Data/systems/besm`; Foundry reads `system.json` from it — but note the system ID in `system.json` is `besm4e` while the folder is `besm`. If Foundry doesn't find the system, rename the folder to `besm4e` or change the `id` in `system.json` to `besm`).

- [ ] **Step 1: Build the system**

Run: `npm run build`
Expected: `dist/besm4e.js` and `dist/style.css` exist

- [ ] **Step 2: Launch Foundry and create a test world**

1. Start Foundry VTT V14
2. Create a new world using the "BESM 4th Edition" system
3. Launch the world
4. Open the browser console (F12)

Expected: Console shows `BESM 4e | Initializing BESM 4th Edition system`. No deprecation warnings.

- [ ] **Step 3: Create a character actor**

1. Go to the Actors tab in the sidebar
2. Click "Create Actor"
3. Name it "Test Character", select type "character"
4. Click "Create"

Expected: The actor sheet opens automatically. It displays "Test Character" in white text on a dark gray background (Tailwind-styled).

- [ ] **Step 4: Test reactive updates**

1. Close the sheet
2. Right-click the actor in the sidebar → "Edit"
3. Alternatively: keep the sheet open and rename the actor in the sidebar header
4. Change the name to "Renamed Character"

Expected: The sheet updates to show "Renamed Character" without needing to close and reopen.

- [ ] **Step 5: Verify zero deprecation warnings**

Check the browser console for any warnings containing:
- "template.json" — should not appear
- "Application" (legacy class) — should not appear
- "Dialog" (legacy class) — should not appear
- "deprecated" — should not appear

Expected: Zero deprecation warnings related to this system.

- [ ] **Step 6: Test HMR (optional but recommended)**

1. In a terminal, run: `npm run dev`
2. Open the test world in Foundry (or refresh if already open)
3. Open a character sheet
4. Edit `src/components/sheets/CharacterSheet.svelte` — change the text color class from `text-white` to `text-green-400`
5. Save the file

Expected: The sheet updates live without a full page reload. The actor name turns green.

6. Revert the change back to `text-white` and save.
