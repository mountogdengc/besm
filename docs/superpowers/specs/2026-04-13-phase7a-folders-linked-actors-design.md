# Phase 7a — Character Folders + Companion/Minion Linked Actors: Design Spec

**Goal:** Auto-create and auto-rename folders for character actors. Companion and Minion attributes can link to a separate actor with CP validation. Linked actors are auto-placed in the parent character's folder.

**Exit criteria:** Creating a character auto-creates a folder. Renaming the character renames the folder. A Companion attribute can create or link a separate actor. The linked actor appears in the character's folder. CP validity badge shows green/red on the attribute row. Clicking "Open Sheet" on the badge opens the linked actor's sheet.

---

## Character Folder System

### src/hooks/folderHooks.mjs

Two hooks registered via `Hooks.on()`:

**createActor hook:**
- Fires when any actor is created
- If `actor.type === "character"`: create a Folder with the actor's name, type "Actor", then update the actor's `folder` to the new folder's ID
- Skip if the actor already has a folder assigned

**updateActor hook:**
- Fires when any actor is updated
- If the update includes a name change (`changes.name`): find the actor's folder, check if the folder name matches the actor's previous name, rename the folder if so

### Registration

Import and call `registerFolderHooks()` in `besm4e.mjs` inside the init hook (or as a `ready` hook if folder creation requires the game to be fully loaded).

---

## Schema Addition: AttributeData

Add to `src/models/items/AttributeData.mjs` defineSchema():

```js
linkedActorId: new fields.StringField({ initial: "" }),
```

The CP budget is derived in `prepareDerivedData()`:
- `linkedActorCpBudget = effectiveLevel * 10` (fixed multiplier of 10 CP per level for Companion/Minion)

The CP validity check reads the linked actor's `cpSpent` at display time in the UI component (not in prepareDerivedData, since cross-document reads in derived data can cause timing issues).

---

## LinkedActorBadge Component

`src/components/ui/LinkedActorBadge.svelte`

**Props:** `attribute` (item document), `actor` (parent actor)

**Behavior:**
- Resolves `linkedActorId` via `game.actors.get()` to get the linked actor
- Displays: linked actor name, "Open Sheet" button, CP badge
- CP badge: compares `linkedActor.system.cpSpent` vs `attribute.system.effectiveLevel * 10`
  - Green if within budget, red if over
- "Open Sheet" button calls `linkedActor.sheet.render(true)`

---

## AttributeSheet Linked Actor Section

Added to `src/components/items/AttributeSheet.svelte` — a new section at the bottom, shown when the attribute name includes "Companion", "Minion", or "Alternate Form":

**When no actor is linked (`linkedActorId` is empty):**
- "Create Linked Actor" button — creates a new `character` actor named "[Attribute Name] of [Parent Actor Name]", places it in the parent's folder, sets `linkedActorId` on the attribute
- Manual UUID input field — text input where user can paste/type an actor ID, saved on blur

**When an actor is linked:**
- Shows linked actor name + "Open Sheet" button
- CP budget display: "Budget: X CP, Spent: Y CP" with green/red indicator
- "Unlink" button — clears `linkedActorId` (does NOT delete the linked actor)

---

## AttributeRow Integration

`src/components/ui/AttributeRow.svelte` — when `attribute.system.linkedActorId` is non-empty, render `LinkedActorBadge` inline on the row after the enhancement/limiter tags.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/hooks/folderHooks.mjs` | Create | Auto-create/rename folders for character actors |
| `src/components/ui/LinkedActorBadge.svelte` | Create | Badge with actor name, open button, CP validity |
| `src/models/items/AttributeData.mjs` | Modify | Add `linkedActorId` field |
| `src/components/items/AttributeSheet.svelte` | Modify | Add linked actor section (create/link/unlink) |
| `src/components/ui/AttributeRow.svelte` | Modify | Show LinkedActorBadge when linked |
| `src/besm4e.mjs` | Modify | Register folder hooks |

---

## Constraints

- Folder auto-creation only fires for `character` type actors (not NPC, vehicle, mecha)
- Linked actor creation always creates a `character` type actor (Companions are full characters)
- CP budget uses a fixed multiplier of 10 CP per effective level
- Unlinking does NOT delete the linked actor — just clears the reference
- The linked actor section only appears for attributes named "Companion", "Minion", or "Alternate Form" (simple string matching, case-insensitive)
- Cross-document CP reads happen in the UI component, not in prepareDerivedData()
- Alternate Form token swap is deferred to Phase 7b
- Shared assets deferred to Phase 7b
