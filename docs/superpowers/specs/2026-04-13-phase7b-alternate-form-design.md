# Phase 7b — Alternate Form Token Swap: Design Spec

**Goal:** Implement the Alternate Form token swap — clicking "Swap Form" on an Alternate Form attribute replaces the current token with the alternate form actor's token, carrying over absolute HP damage and transferring status effects.

**Exit criteria:** A character with an Alternate Form attribute linked to another actor can click "Swap Form" on the attribute row. The current token is replaced with the alt form's token at the same position. HP damage carries over (absolute, not proportional). Status effects transfer. A Healing attribute with `transformationHeal: true` on the alt form reduces carried damage.

---

## Pure Function (src/engine/alternateForm.mjs)

### computeTransformDamage(currentMaxHP, currentHP, altMaxHP, healAmount)

```
Input:
  currentMaxHP: integer (current form's max HP)
  currentHP: integer (current form's current HP)
  altMaxHP: integer (alternate form's max HP)
  healAmount: integer (HP healed during transformation, from Healing attribute)
Output: integer (new current HP for the alt form)

Formula:
  damageTaken = max(0, currentMaxHP - currentHP)
  adjustedDamage = max(0, damageTaken - healAmount)
  newHP = max(0, altMaxHP - adjustedDamage)
  return newHP

Examples:
  computeTransformDamage(100, 80, 120, 0) = 100  // 20 damage, 120-20 = 100
  computeTransformDamage(100, 80, 60, 0) = 40     // 20 damage, 60-20 = 40
  computeTransformDamage(100, 80, 120, 10) = 110   // 20 damage - 10 heal = 10, 120-10 = 110
  computeTransformDamage(100, 10, 50, 0) = 0       // 90 damage > 50 max, arrives at 0
  computeTransformDamage(100, 100, 80, 0) = 80     // 0 damage, full HP
```

---

## Token Swap Function (src/hooks/alternateForm.mjs)

### swapToAlternateForm(parentActor, altFormActor)

Requires an active scene with a token for the parent actor.

```
1. Find parent actor's active token: parentActor.getActiveTokens()[0]
   If no token found, show warning and return
2. Get current HP state:
   currentMaxHP = parentActor.system.derived.hpMax
   currentHP = parentActor.system.derived.currentHp
3. Get alt form's max HP: altMaxHP = altFormActor.system.derived.hpMax
4. Check for transformation healing:
   Find a Healing attribute on altFormActor with transformationHeal === true
   healAmount = healingAttr ? healingAttr.system.effectiveLevel * 5 : 0
5. Compute new HP via computeTransformDamage()
6. Update alt form's current HP: altFormActor.update({"system.derived.currentHp": newHP})
7. Transfer active status effects:
   Copy all ActiveEffect documents from the token's actor to altFormActor
8. Record token position: { x, y, elevation } from current token
9. Delete current token
10. Create new token for alt form at same position via TokenDocument
```

---

## Schema Addition: AttributeData

Add to defineSchema():

```js
transformationHeal: new fields.BooleanField({ initial: false }),
```

This field is only relevant on Healing attributes that live on Alternate Form actors. When true, the attribute's effective level contributes healing during form transformation (effectiveLevel * 5 HP).

---

## UI: LinkedActorBadge Addition

The existing LinkedActorBadge (`src/components/ui/LinkedActorBadge.svelte`) gains a "Swap Form" button, shown only when the parent attribute's name contains "Alternate" (case-insensitive).

Clicking the button:
1. Imports and calls `swapToAlternateForm(actor, linkedActor)`
2. The actor prop is the parent character (owner of the attribute)
3. The linkedActor is resolved from `attribute.system.linkedActorId`

The button only appears when:
- A linked actor exists
- The attribute name matches /alternate/i
- The game has an active scene (canvas available)

---

## AttributeSheet Addition

The existing AttributeSheet flags section gains a new checkbox:

```
transformationHeal: checkbox labeled "Transformation Heal (heals on form swap)"
```

Only shown when `isLinkable` is true (attribute name matches companion/minion/alternate pattern). This allows the GM to flag a Healing attribute on the alt form actor as providing transformation healing.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/engine/alternateForm.mjs` | Create | Pure damage carry-over function |
| `tests/engine/alternateForm.test.mjs` | Create | Tests for damage computation |
| `src/hooks/alternateForm.mjs` | Create | swapToAlternateForm() with Foundry canvas API |
| `src/models/items/AttributeData.mjs` | Modify | Add `transformationHeal` field |
| `src/components/ui/LinkedActorBadge.svelte` | Modify | Add "Swap Form" button for Alternate Form |
| `src/components/items/AttributeSheet.svelte` | Modify | Add transformationHeal checkbox |

---

## Constraints

- Token swap requires an active scene with the parent actor's token placed
- If the alt form has lower max HP than damage taken, the character arrives at 0 HP (unconscious status not auto-applied — that's the GM's call during the swap)
- Status effects are copied, not moved — the original token is deleted so this is effectively a move
- The Healing attribute must be on the alternate form actor (not the parent) and must have `transformationHeal: true`
- Heal amount = effectiveLevel * 5 HP (fixed multiplier)
- Shared Assets feature is deferred to a later phase
