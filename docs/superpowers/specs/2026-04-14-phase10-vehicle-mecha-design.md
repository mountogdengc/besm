# Phase 10 — Vehicle & Mecha Specialized Features: Design Spec

**Goal:** Upgrade vehicle and mecha sheets with interactive crew management, mecha pilot linking with stat fusion, and resolved actor names throughout.

**Exit criteria:** CrewTab shows crew member names with open/remove buttons, add crew via actor selection. Mecha sidebar shows pilot name with open/link/unlink. Mecha derived stats incorporate pilot bonuses (ACV/DCV use combined mecha + pilot stats).

---

## Crew Tab Upgrade

`src/components/tabs/CrewTab.svelte` — full rewrite.

**Current state:** Displays raw `actorId` strings and roles.

**New behavior:**
- Each crew member row resolves the actor name via `game.actors.get(member.actorId)`
- Shows: actor name (or "Unknown" if not found), role badge, "Open Sheet" button, "Remove" button
- Role selector: dropdown with choices "crew", "pilot", "gunner", "passenger"
- "Add Crew Member" section at bottom: text input for actor ID + role dropdown + "Add" button
- Passenger capacity display: "Passengers: X / Y" (current crew with role "passenger" vs capacity)

**Crew array mutations:**
- Add: append `{ actorId, role }` to `actor.system.crew`, call `actor.update()`
- Remove: filter out by index, call `actor.update()`
- Change role: update the entry at index, call `actor.update()`

---

## Mecha Pilot Link — Sidebar Upgrade

`src/components/sidebar/ActorSidebar.svelte` — modify the pilot section.

**Current state:** Shows raw `pilotId` string or "No pilot linked".

**New behavior:**
- Resolve pilot actor via `game.actors.get(actor.system.pilotId)`
- If linked: show pilot name, "Open" button, "Unlink" button
- If not linked: text input for pilot actor ID + "Link" button
- Link: `actor.update({"system.pilotId": actorId})`
- Unlink: `actor.update({"system.pilotId": ""})`
- Open: `pilotActor.sheet.render(true)`

---

## Mecha Pilot Stat Fusion

`src/models/actors/MechaData.mjs` — update `prepareDerivedData()`.

**Current state:** Computes baseCv from mecha's own stats (Body usually normal, Mind/Soul usually missing).

**New behavior:** When `pilotId` is set and the pilot actor exists:
1. Read pilot's stat values (body, mind, soul)
2. Store in `pilotBonus`: `{ body: pilotBody, mind: pilotMind, soul: pilotSoul }`
3. For CV calculation, use combined stats: `computeBaseCv(mechaBody + pilotBody, pilotMind, pilotSoul)`
4. This means the mecha uses its own Body stat plus all the pilot's stats for combat values

When no pilot is linked, mecha uses its own stats only (current behavior).

**Pure function:** No new pure function needed — `computeBaseCv` already handles any three values. We just pass different inputs.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/components/tabs/CrewTab.svelte` | Rewrite | Interactive crew management |
| `src/components/sidebar/ActorSidebar.svelte` | Modify | Upgrade pilot link section |
| `src/models/actors/MechaData.mjs` | Modify | Pilot stat fusion in prepareDerivedData() |

---

## Constraints

- Crew member actors must already exist — no actor creation from the crew tab
- Actor ID input is a text field (not a fancy actor picker — keep it simple)
- Pilot fusion only affects CV (ACV/DCV) calculation, not HP/EP/movement
- If the pilot actor doesn't exist (deleted/invalid ID), fall back to mecha-only stats
- All buttons use `type="button"` to prevent Foundry form interception
