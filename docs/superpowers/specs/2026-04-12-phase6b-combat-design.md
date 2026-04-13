# Phase 6b — Combat System: Design Spec

**Goal:** Implement the full combat loop: opposed attack/defence rolls via sequential chat cards, damage calculation and application, EP bonus prompt, status effects, sanity rolls, and social combat with the 10-category edge checklist.

**Exit criteria:** Attacker rolls Attack from a weapon attribute, defender clicks Defend on the chat card, damage calculates and can be applied with one click, shock value stun and unconscious at 0 HP trigger automatically. EP bonus available after rolls. Sanity and social combat rolls work when their settings are enabled.

---

## Opposed Attack/Defence Flow

### Sequence

1. **Attacker clicks Attack** on a weapon attribute row → `performAttackRoll(attacker, weaponAttr)` evaluates `2d6 + ACV + bonuses` → posts a chat card showing the attack total with a **"Defend"** button and the defender target (selected token or prompted)
2. **Defender clicks "Defend"** on the chat card → `performDefenceRoll(defender, attackMessageId)` evaluates `2d6 + DCV` → compares totals via `resolveOpposed()` → posts result card
3. **Result card** shows: both rolls, margin, attacker wins (>=) or defender wins. If attacker wins, shows calculated damage and an **"Apply Damage"** button
4. **GM clicks "Apply Damage"** → `applyDamage(defender, amount)` reduces `currentHp`, checks shock value for stun, checks 0 HP for unconscious

NPC defenders: the GM can click "Auto-Defend" on the attack card to roll defence automatically without waiting.

### Chat Card Data

Attack and result cards store data in `message.flags.besm` so button click handlers can retrieve context:

```js
// Attack card flags
flags.besm = {
  type: "attack",
  attackerId: String,
  attackTotal: Number,
  weaponName: String,
  weaponLevel: Number,
  isMuscle: Boolean,
}

// Result card flags
flags.besm = {
  type: "attackResult",
  attackerId: String,
  defenderId: String,
  damage: Number,
  attackerWins: Boolean,
  margin: Number,
}
```

### Chat Card Button Handlers

Register a `renderChatMessage` hook to attach click handlers to buttons in chat cards. Buttons identified by `data-action` attributes:

- `data-action="defend"` → triggers defence roll
- `data-action="auto-defend"` → triggers auto defence roll (no dialog)
- `data-action="apply-damage"` → applies damage to defender
- `data-action="spend-ep"` → opens EP bonus dialog

---

## Damage Calculation

### calculateDamage(dm, weaponLevel, acv, ar)

```
Formula: max(0, (dm * weaponLevel) + acv - ar)

dm: damage multiplier (base or melee depending on weapon type)
weaponLevel: weapon attribute's effective level
acv: attacker's ACV
ar: defender's AR

Returns: integer (damage amount, minimum 0)
```

### applyDamage(actor, amount)

```
1. Reduce currentHp: newHP = max(0, currentHp - amount)
2. Update actor: system.derived.currentHp = newHP
3. If amount >= actor's shock value → apply "stunned" status
4. If newHP === 0 → apply "unconscious" status
```

---

## EP Bonus

After any stat or skill roll posts to chat, the chat card includes a "Spend EP?" button.

### EP Bonus Dialog

Clicking opens a DialogV2 prompt:
- Shows: current EP, max bonus (Soul value), max affordable (floor(currentEp / 10))
- Input: number from 0 to min(soulValue, maxAffordable)
- Confirm: deducts EP (bonus * 10), adds bonus to the roll total, updates the chat card content

### computeEpBonus(soulValue, currentEp)

```
maxBonus = soulValue
maxAffordable = floor(currentEp / 10)
cap = min(maxBonus, maxAffordable)
Returns: cap (0 if no EP available or soul is missing)
```

---

## Status Effects

Registered in `CONFIG.statusEffects` during init:

| ID | Label | Icon |
|---|---|---|
| `stunned` | Stunned | `icons/svg/daze.svg` |
| `prone` | Prone | `icons/svg/falling.svg` |
| `unconscious` | Unconscious | `icons/svg/unconscious.svg` |
| `dead` | Dead | `icons/svg/skull.svg` |
| `energyDepleted` | Energy Depleted | `icons/svg/lightning.svg` |
| `burning` | Burning | `icons/svg/fire.svg` |
| `bound` | Bound | `icons/svg/net.svg` |

Icons use Foundry's built-in SVG icons.

---

## Sanity Rolls

Only available when `sanityEnabled` setting is active.

### performSanityRoll(actor)

```
Formula: 2d6 + floor((Mind + Soul) / 2)
Posts chat card with total
If Mind or Soul is missing → use computeSocv logic (already handles nulls)
```

Uses the existing `computeSocv` function from `calculations.mjs` to get the base value (it's the same formula: floor((Mind + Soul) / 2)).

---

## Social Combat

Only available when `socialCombatEnabled` setting is active.

### performSocialRoll(actor, skillLevel, skillName, edge)

```
Formula: 2d6 + SoCV + skillLevel
Posts chat card with "Social Defend" button (same sequential pattern as physical combat)
```

### Social Opposed Resolution

Uses `resolveSocialOpposed(attackerTotal, defenderTotal)`:
- Ties are rerolled (return `{ tie: true }`) — unlike physical combat where attacker wins ties
- Otherwise: `{ tie: false, attackerWins: total > defenderTotal, margin }`

### Social Damage Table

```
socialDamage(margin):
  margin 1-2  → 1 SP damage
  margin 3-5  → 2 SP damage
  margin 6-11 → 3 SP damage
  margin 12-17 → 4 SP damage
  margin 18+  → 5 SP damage
  margin 0 or negative → 0
```

### 10-Category Edge Checklist

A pre-combat dialog the GM opens before a social combat encounter. For each of 10 categories, the GM marks: No Advantage / Significant / Overwhelming.

Categories:
1. More societal privilege (GM judgment)
2. Higher Body Stat (auto-evaluable)
3. More Features (Appearance) assignments (auto-evaluable)
4. Greater wealth or valuable assets (GM judgment)
5. Higher Connected Attribute (auto-evaluable)
6. Greater number of nearby supportive allies (GM judgment)
7. Moral high ground (GM judgment)
8. Fewer combined public social and physical Defects (auto-evaluable)
9. Better or more powerful special abilities (GM judgment)
10. Relevant secret knowledge or advanced preparation (GM judgment)

Auto-evaluable categories pre-fill with a suggested value when two actors are compared. GM can override any.

Net edges: count Significant as minor edge, Overwhelming as major edge. For each side, tally their edges. The side with more edges gets the net edge applied to their roll formula.

Implementation: `SocialEdgeDialog` — a function that opens DialogV2 with the checklist, compares two actors for auto-fill, returns the net edge result.

---

## Pure Functions (src/engine/combat.mjs)

All testable via Vitest:

- `calculateDamage(dm, weaponLevel, acv, ar)` → integer
- `resolveOpposed(attackerTotal, defenderTotal)` → `{ attackerWins: boolean, margin: number }`
- `resolveSocialOpposed(attackerTotal, defenderTotal)` → `{ tie: boolean, attackerWins?: boolean, margin?: number }`
- `socialDamage(margin)` → integer (0-5)
- `computeEpBonus(soulValue, currentEp)` → integer (max bonus cap)

---

## File Structure

```
src/
├── engine/
│   └── combat.mjs               ← pure combat functions (testable)
├── rolls/
│   ├── BESMRoll.mjs              ← modified: add EP bonus button to chat cards
│   └── BESMCombat.mjs            ← attack/defence/damage/social combat execution
├── combat/
│   └── statusEffects.mjs         ← status effect definitions array
├── components/
│   ├── ui/
│   │   └── AttributeRow.svelte   ← modified: show attack button for weapon attributes
│   └── tabs/
│       └── CombatTab.svelte      ← modified: add social combat section
└── besm4e.mjs                    ← modified: register status effects, chat message hook
```

---

## Constraints

- Chat card buttons use `data-action` attributes, handlers attached via `renderChatMessage` hook
- Status effect icons use Foundry's built-in SVGs only
- Social combat edge checklist is a function-based dialog, not a separate ApplicationV2 sheet
- Society Point recovery via world time hook is deferred — manual "Recover 1 SP" button only
- The EP bonus modifies the displayed total on the existing chat card via `message.update()`
- All pure functions in `combat.mjs` are testable with zero Foundry dependencies
