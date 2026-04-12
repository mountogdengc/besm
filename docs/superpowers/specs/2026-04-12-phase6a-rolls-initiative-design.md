# Phase 6a — Roll Engine, Chat Messages, Initiative: Design Spec

**Goal:** Implement a roll engine for stat rolls, skill rolls, and initiative. Rolls post formatted chat messages with dice breakdown. Initiative overrides Foundry's default. Roll buttons appear on the character sheet sidebar and skills tab.

**Exit criteria:** Click a stat roll button, see a 2d6 + stat value chat message. Click a skill roll button, see 2d6 + stat + rank. Run combat, initiative uses 2d6 + ACV. Missing stat substitution prompts the player to choose.

---

## File Structure

```
src/
├── engine/
│   └── rolls.mjs                ← pure calculation helpers (testable)
├── rolls/
│   └── BESMRoll.mjs             ← roll execution + chat message posting
├── components/
│   ├── ui/
│   │   └── RollButton.svelte    ← dice icon button, triggers rolls
│   ├── sidebar/
│   │   ├── StatInput.svelte     ← modified: add roll button
│   │   └── ActorSidebar.svelte  ← modified: pass roll handler
│   └── tabs/
│       └── SkillsTab.svelte     ← modified: pass roll handler
│       └── (SkillRow.svelte)    ← modified: add roll button
└── besm4e.mjs                   ← modified: register initiative formula
```

---

## Pure Functions (src/engine/rolls.mjs)

### resolveRollTotal(diceTotal, ...modifiers)

```
Input: diceTotal (integer), ...modifiers (integers)
Output: integer (sum of all)
```

### resolveEdgeFormula(edge)

```
Input: null | "minor" | "major"
Output: string

Rules:
  null → "2d6"
  "minor" → "3d6kl2" (roll 3, keep lowest 2)
  "major" → "4d6kl2" (roll 4, keep lowest 2)
```

### formatRollBreakdown(type, rollResult, modifiers)

```
Input:
  type: "stat" | "skill" | "initiative"
  rollResult: { total: number, terms: [{results: [{result}]}] } (Foundry Roll object shape)
  modifiers: array of { label: string, value: number }
Output: HTML string

Generates:
  <div class="besm-roll">
    <div class="roll-header">[Type] Roll</div>
    <div class="roll-dice">2d6 = [die1] + [die2]</div>
    <div class="roll-mods">+5 Body, +3 Acrobatics</div>
    <div class="roll-total">Total: 15</div>
  </div>
```

---

## BESMRoll (src/rolls/BESMRoll.mjs)

### performStatRoll(actor, statKey, options)

```
1. Resolve stat value — call resolveStatForRoll(actor, statKey)
   If null returned (no roll possible), show notification and return
2. Build formula via resolveEdgeFormula(options.edge ?? null)
3. Evaluate: new Roll(formula).evaluate()
4. Compute total: diceTotal + statValue
5. Build modifiers array: [{ label: "Body", value: 5 }]
6. Format HTML via formatRollBreakdown("stat", roll, modifiers)
7. Post chat message via ChatMessage.create({ content, speaker })
8. Return { roll, total, statValue }
```

### performSkillRoll(actor, statKey, skillLevel, skillName, options)

```
1. Resolve stat value — same as stat roll
2. Build formula, evaluate
3. Compute total: diceTotal + statValue + skillLevel
4. Build modifiers: [{ label: statLabel, value }, { label: skillName, value: skillLevel }]
5. Format and post
6. Return { roll, total, statValue, skillLevel }
```

### resolveStatForRoll(actor, nominalStat)

```
1. Check if the nominated stat's mode is not "missing" → return its value
2. Find all non-missing stats
3. If none → return null (no roll possible)
4. If one → return that stat's value
5. If two → prompt player to choose via DialogV2.wait() with buttons
6. Return chosen stat's value
```

The DialogV2 prompt shows buttons like "Body (5)" and "Soul (6)" for each available substitute.

---

## Initiative Override

In `besm4e.mjs` init hook:

```js
CONFIG.Combat.initiative = {
  formula: "2d6 + @derived.acv",
  decimals: 0
};
```

For `cv_static` mode, check the setting and use a different formula:

```js
try {
  const mode = game.settings.get("besm", "initiativeMode");
  if (mode === "cv_static") {
    CONFIG.Combat.initiative = { formula: "@derived.acv", decimals: 0 };
  }
} catch {}
```

This runs in the init hook. The setting is already registered from Phase 1a.

---

## RollButton Component

Small dice icon button. Props: `onclick` handler.

```svelte
<button class="roll-btn" onclick={onclick} title={title}>
  🎲
</button>
```

Styled as a small inline button that fits next to stat values and skill rows.

---

## Sheet Integration

### StatInput.svelte changes:
- Add optional `onRoll` prop
- When provided, render a RollButton next to the stat value
- Clicking triggers `onRoll(statKey)` which calls `performStatRoll()`

### ActorSidebar.svelte changes:
- Import `performStatRoll` from BESMRoll
- Pass `onRoll` handler to each StatInput that calls `performStatRoll(actor, statKey)`

### SkillRow.svelte changes:
- Add a RollButton at the end of the row
- Clicking triggers `performSkillRoll(actor, skill.system.linkedStat, skill.system.rank, skill.name)`
- For skill groups in group mode (AttributeRow), the roll uses the group's purchased level as the skill level

---

## Constraints

- No opposed rolls (attack/defence) — that's Phase 6b
- No damage application — Phase 6b
- No EP bonus prompt — Phase 6b
- No sanity or social combat rolls — Phase 6b
- No status effects — Phase 6b
- Chat messages are plain HTML strings, not Handlebars templates
- Edge bonus (specialisation) is supported in the formula but not automatically detected — the caller passes `options.edge` if applicable
- All pure functions in `rolls.mjs` are testable via Vitest
