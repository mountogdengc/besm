# Phase 7a — Character Folders + Linked Actors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auto-create/rename folders for character actors, and enable Companion/Minion attributes to link to separate actor documents with CP validation and folder placement.

**Architecture:** Folder management via Foundry hooks in a dedicated hooks file. Linked actor reference stored as a `linkedActorId` field on AttributeData. A `LinkedActorBadge` Svelte component displays the link status and CP validation on the attribute row. The attribute item sheet gets a linked actor section for creating, linking, and unlinking actors.

**Tech Stack:** Foundry VTT V14 Hooks API, Folder API, Svelte 5

**Spec:** `docs/superpowers/specs/2026-04-13-phase7a-folders-linked-actors-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/hooks/folderHooks.mjs` | Create | Auto-create/rename folders for character actors |
| `src/components/ui/LinkedActorBadge.svelte` | Create | Badge showing linked actor name, open button, CP validity |
| `src/models/items/AttributeData.mjs` | Modify | Add `linkedActorId` field |
| `src/components/items/AttributeSheet.svelte` | Modify | Add linked actor section |
| `src/components/ui/AttributeRow.svelte` | Modify | Show LinkedActorBadge when linked |
| `src/besm4e.mjs` | Modify | Register folder hooks |

---

### Task 1: Folder Hooks

**Files:**
- Create: `src/hooks/folderHooks.mjs`

- [ ] **Step 1: Create folderHooks.mjs**

```js
export function registerFolderHooks() {
  Hooks.on("createActor", async (actor) => {
    if (actor.type !== "character") return;
    if (actor.folder) return;

    const folder = await Folder.create({
      name: actor.name,
      type: "Actor",
      color: "#555555",
    });
    await actor.update({ folder: folder.id });
  });

  Hooks.on("updateActor", async (actor, changes) => {
    if (!changes.name) return;
    if (!actor.folder) return;
    const folder = game.folders.get(actor.folder);
    if (!folder) return;
    // Only rename if the folder name matches the old name
    // actor._source.name has the pre-update name in some contexts,
    // but after update it's already changed. Use a heuristic:
    // if the folder contains this actor and has only one direct actor child, rename.
    const folderActors = game.actors.filter(a => a.folder === actor.folder);
    const isMainActor = folderActors.some(a => a.id === actor.id && a.type === "character");
    if (isMainActor && folder.name !== changes.name) {
      await folder.update({ name: changes.name });
    }
  });
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/hooks/folderHooks.mjs
git commit -m "feat: add folder auto-create and auto-rename hooks for character actors"
```

---

### Task 2: Add linkedActorId to AttributeData

**Files:**
- Modify: `src/models/items/AttributeData.mjs`

- [ ] **Step 1: Read the file**

Read `src/models/items/AttributeData.mjs`.

- [ ] **Step 2: Add field to schema**

In `defineSchema()`, after the `sourceTemplateName` field and before the `notes` field, add:

```js
      linkedActorId: new fields.StringField({ initial: "" }),
```

- [ ] **Step 3: Build and test**

Run: `npm run build && npx vitest run`
Expected: Build succeeds, all tests pass

- [ ] **Step 4: Commit**

```bash
git add src/models/items/AttributeData.mjs
git commit -m "feat: add linkedActorId field to AttributeData"
```

---

### Task 3: LinkedActorBadge Component

**Files:**
- Create: `src/components/ui/LinkedActorBadge.svelte`

- [ ] **Step 1: Create LinkedActorBadge.svelte**

```svelte
<script>
  let { attribute, actor } = $props();

  let linkedActor = $derived(
    attribute.system.linkedActorId
      ? game.actors.get(attribute.system.linkedActorId)
      : null
  );

  let cpBudget = $derived(attribute.system.effectiveLevel * 10);

  let cpSpent = $derived(linkedActor?.system.cpSpent ?? 0);

  let cpValid = $derived(cpSpent <= cpBudget);

  function openLinkedSheet(e) {
    e.stopPropagation();
    if (linkedActor) linkedActor.sheet.render(true);
  }
</script>

{#if linkedActor}
  <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700 text-xs flex-shrink-0">
    <span class="text-slate-300">{linkedActor.name}</span>
    <span class="px-1 rounded text-xs {cpValid ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}">
      {cpSpent}/{cpBudget} CP
    </span>
    <button
      class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs p-0"
      onclick={openLinkedSheet}
      title="Open {linkedActor.name} sheet"
    >Open</button>
  </span>
{/if}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/LinkedActorBadge.svelte
git commit -m "feat: add LinkedActorBadge component with CP validation"
```

---

### Task 4: Add Linked Actor Section to AttributeSheet

**Files:**
- Modify: `src/components/items/AttributeSheet.svelte`

- [ ] **Step 1: Read the file**

Read `src/components/items/AttributeSheet.svelte`.

- [ ] **Step 2: Add linked actor section**

In the `<script>` block, add these after the existing `removeLimiter` function:

```js
  let isLinkable = $derived(
    /companion|minion|alternate/i.test(item.name)
  );

  let linkedActor = $derived(
    item.system.linkedActorId
      ? game.actors.get(item.system.linkedActorId)
      : null
  );

  let cpBudget = $derived(item.system.effectiveLevel * 10);

  async function createLinkedActor() {
    const parent = item.parent;
    if (!parent) return;
    const newActor = await Actor.create({
      name: `${item.name} of ${parent.name}`,
      type: "character",
      folder: parent.folder || undefined,
    });
    if (newActor) {
      await item.update({ "system.linkedActorId": newActor.id });
    }
  }

  async function unlinkActor() {
    await item.update({ "system.linkedActorId": "" });
  }

  function openLinkedSheet() {
    if (linkedActor) linkedActor.sheet.render(true);
  }
```

In the template, before the `<!-- Notes -->` section (before the last `<div>` containing the Notes textarea), add:

```svelte
  <!-- Linked Actor -->
  {#if isLinkable}
    <div class="border border-slate-700 rounded p-2">
      <div class="text-xs text-slate-500 uppercase mb-2">Linked Actor</div>
      {#if linkedActor}
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-200">{linkedActor.name}</span>
          <span class="px-1.5 py-0.5 rounded {linkedActor.system.cpSpent <= cpBudget ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}">
            {linkedActor.system.cpSpent} / {cpBudget} CP
          </span>
          <button class="px-2 py-1 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600"
            onclick={openLinkedSheet}>Open Sheet</button>
          <button class="px-2 py-1 bg-slate-700 text-slate-300 rounded border-0 cursor-pointer text-xs hover:bg-slate-600"
            onclick={unlinkActor}>Unlink</button>
        </div>
      {:else}
        <div class="flex flex-col gap-2">
          <button class="px-2 py-1 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600 self-start"
            onclick={createLinkedActor}>Create Linked Actor</button>
          <div class="flex items-center gap-2">
            <input
              class="flex-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"
              placeholder="Paste actor ID to link..."
              value={item.system.linkedActorId}
              onchange={(e) => update("system.linkedActorId", e.target.value)}
            />
          </div>
        </div>
      {/if}
    </div>
  {/if}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/items/AttributeSheet.svelte
git commit -m "feat: add linked actor section to AttributeSheet with create/link/unlink"
```

---

### Task 5: Show LinkedActorBadge on AttributeRow

**Files:**
- Modify: `src/components/ui/AttributeRow.svelte`

- [ ] **Step 1: Read the file**

Read `src/components/ui/AttributeRow.svelte`.

- [ ] **Step 2: Add LinkedActorBadge import and usage**

At the top of the `<script>` block, add:
```js
  import LinkedActorBadge from "./LinkedActorBadge.svelte";
```

In the template, after the attack button section (`{#if attribute.system.isWeapon}...{/if}`) and before the closing `</div>`, add:

```svelte
  {#if attribute.system.linkedActorId}
    <LinkedActorBadge {attribute} {actor} />
  {/if}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/AttributeRow.svelte
git commit -m "feat: show LinkedActorBadge on attribute rows with linked actors"
```

---

### Task 6: Register Folder Hooks in Entry Point

**Files:**
- Modify: `src/besm4e.mjs`

- [ ] **Step 1: Read besm4e.mjs**

Read `src/besm4e.mjs`.

- [ ] **Step 2: Add import and registration**

At the top, add:
```js
import { registerFolderHooks } from "./hooks/folderHooks.mjs";
```

Inside the `init` hook, after `registerSettings();` and before the initiative override, add:
```js
  registerFolderHooks();
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/besm4e.mjs
git commit -m "feat: register character folder hooks in init"
```

---

### Task 7: Foundry Verification

**Files:**
- None — manual testing

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Test folder auto-creation**

Create a character actor. Check:
- A folder with the character's name appears in the Actor sidebar
- The character is inside the folder

- [ ] **Step 3: Test folder auto-rename**

Rename the character. Check:
- The folder name updates to match

- [ ] **Step 4: Test linked actor creation**

Create an attribute item on the character:

```js
let c=game.actors.contents.find(a=>a.type==="character");c.createEmbeddedDocuments("Item",[{name:"Companion",type:"attribute",system:{baseCostPerLevel:4,purchasedLevel:3}}])
```

Open the character sheet → Attributes tab → click the "Companion" attribute to open its item sheet. Check:
- "Linked Actor" section appears (because name contains "Companion")
- "Create Linked Actor" button is visible
- Click it → a new actor "Companion of [CharName]" is created in the same folder
- The linked actor badge appears on the attribute row with CP validation

- [ ] **Step 5: Test manual linking**

Create another attribute:
```js
let c=game.actors.contents.find(a=>a.type==="character");c.createEmbeddedDocuments("Item",[{name:"Minion",type:"attribute",system:{baseCostPerLevel:2,purchasedLevel:2}}])
```

Open the Minion item sheet. Paste an existing actor's ID into the link field. Check:
- Badge appears on the row
- "Open" button on the badge opens the linked actor's sheet

- [ ] **Step 6: Test unlinking**

Open the Companion item sheet. Click "Unlink". Check:
- Badge disappears from the row
- The linked actor still exists (not deleted)

- [ ] **Step 7: Clean up**

```js
for(const f of game.folders)await f.delete({deleteSubfolders:true,deleteContents:true});for(const a of game.actors)await a.delete();
```
