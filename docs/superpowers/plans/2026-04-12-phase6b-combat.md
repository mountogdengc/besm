# Phase 6b — Combat System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full combat loop — opposed attack/defence via chat cards, damage calculation and application, EP bonus, status effects, sanity rolls, and social combat with edge checklist.

**Architecture:** Pure combat functions in `src/engine/combat.mjs` (testable). Combat execution logic in `src/rolls/BESMCombat.mjs` (Foundry API). Chat card buttons handled via `renderChatMessage` hook. Status effects registered in CONFIG. Social combat edge checklist via DialogV2.

**Tech Stack:** Vitest, Foundry VTT V14 Roll/ChatMessage/DialogV2 API, Svelte 5

**Spec:** `docs/superpowers/specs/2026-04-12-phase6b-combat-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/engine/combat.mjs` | Create | Pure combat functions |
| `tests/engine/combat.test.mjs` | Create | Tests for combat functions |
| `src/combat/statusEffects.mjs` | Create | Status effect definitions |
| `src/rolls/BESMCombat.mjs` | Create | Attack/defence/damage/social execution |
| `src/rolls/BESMRoll.mjs` | Modify | Add EP bonus button to chat cards |
| `src/components/ui/AttributeRow.svelte` | Modify | Add attack button for weapons |
| `src/components/tabs/CombatTab.svelte` | Modify | Add sanity/social roll buttons |
| `src/besm4e.mjs` | Modify | Register status effects + chat hook |

---

### Task 1: Pure Combat Functions (TDD)

**Files:**
- Create: `tests/engine/combat.test.mjs`
- Create: `src/engine/combat.mjs`

- [ ] **Step 1: Write failing tests**

Create `tests/engine/combat.test.mjs`:

```js
import { describe, it, expect } from "vitest";
import {
  calculateDamage, resolveOpposed, resolveSocialOpposed,
  socialDamage, computeEpBonus,
} from "../../src/engine/combat.mjs";

describe("calculateDamage", () => {
  it("computes damage from DM, weapon level, ACV, and AR", () => {
    expect(calculateDamage(5, 3, 6, 2)).toBe(19);
  });

  it("floors at 0", () => {
    expect(calculateDamage(5, 1, 2, 50)).toBe(0);
  });

  it("handles zero weapon level", () => {
    expect(calculateDamage(5, 0, 6, 2)).toBe(4);
  });
});

describe("resolveOpposed", () => {
  it("attacker wins when total is higher", () => {
    const r = resolveOpposed(15, 12);
    expect(r.attackerWins).toBe(true);
    expect(r.margin).toBe(3);
  });

  it("attacker wins on tie", () => {
    const r = resolveOpposed(12, 12);
    expect(r.attackerWins).toBe(true);
    expect(r.margin).toBe(0);
  });

  it("defender wins when higher", () => {
    const r = resolveOpposed(10, 14);
    expect(r.attackerWins).toBe(false);
    expect(r.margin).toBe(-4);
  });
});

describe("resolveSocialOpposed", () => {
  it("attacker wins when higher (strict)", () => {
    const r = resolveSocialOpposed(15, 12);
    expect(r.tie).toBe(false);
    expect(r.attackerWins).toBe(true);
    expect(r.margin).toBe(3);
  });

  it("tie on equal totals", () => {
    const r = resolveSocialOpposed(12, 12);
    expect(r.tie).toBe(true);
  });

  it("defender wins when higher", () => {
    const r = resolveSocialOpposed(10, 14);
    expect(r.tie).toBe(false);
    expect(r.attackerWins).toBe(false);
    expect(r.margin).toBe(4);
  });
});

describe("socialDamage", () => {
  it("returns 0 for margin 0", () => {
    expect(socialDamage(0)).toBe(0);
  });

  it("returns 1 for margin 1-2", () => {
    expect(socialDamage(1)).toBe(1);
    expect(socialDamage(2)).toBe(1);
  });

  it("returns 2 for margin 3-5", () => {
    expect(socialDamage(3)).toBe(2);
    expect(socialDamage(5)).toBe(2);
  });

  it("returns 3 for margin 6-11", () => {
    expect(socialDamage(6)).toBe(3);
    expect(socialDamage(11)).toBe(3);
  });

  it("returns 4 for margin 12-17", () => {
    expect(socialDamage(12)).toBe(4);
    expect(socialDamage(17)).toBe(4);
  });

  it("returns 5 for margin 18+", () => {
    expect(socialDamage(18)).toBe(5);
    expect(socialDamage(25)).toBe(5);
  });

  it("returns 0 for negative margin", () => {
    expect(socialDamage(-3)).toBe(0);
  });
});

describe("computeEpBonus", () => {
  it("returns min of soul value and affordable", () => {
    expect(computeEpBonus(5, 100)).toBe(5);
  });

  it("caps at affordable EP", () => {
    expect(computeEpBonus(10, 30)).toBe(3);
  });

  it("returns 0 when no EP", () => {
    expect(computeEpBonus(5, 0)).toBe(0);
  });

  it("returns 0 when soul is 0", () => {
    expect(computeEpBonus(0, 100)).toBe(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/engine/combat.test.mjs`
Expected: FAIL — cannot find module

- [ ] **Step 3: Implement combat.mjs**

Create `src/engine/combat.mjs`:

```js
export function calculateDamage(dm, weaponLevel, acv, ar) {
  return Math.max(0, (dm * weaponLevel) + acv - ar);
}

export function resolveOpposed(attackerTotal, defenderTotal) {
  return {
    attackerWins: attackerTotal >= defenderTotal,
    margin: attackerTotal - defenderTotal,
  };
}

export function resolveSocialOpposed(attackerTotal, defenderTotal) {
  if (attackerTotal === defenderTotal) return { tie: true };
  return {
    tie: false,
    attackerWins: attackerTotal > defenderTotal,
    margin: Math.abs(attackerTotal - defenderTotal),
  };
}

export function socialDamage(margin) {
  if (margin >= 18) return 5;
  if (margin >= 12) return 4;
  if (margin >= 6) return 3;
  if (margin >= 3) return 2;
  if (margin >= 1) return 1;
  return 0;
}

export function computeEpBonus(soulValue, currentEp) {
  const maxAffordable = Math.floor(currentEp / 10);
  return Math.min(soulValue, maxAffordable);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run tests/engine/combat.test.mjs`
Expected: All tests PASS

- [ ] **Step 5: Run all tests**

Run: `npx vitest run`
Expected: All tests PASS

- [ ] **Step 6: Commit**

```bash
git add src/engine/combat.mjs tests/engine/combat.test.mjs
git commit -m "feat: add pure combat functions with tests"
```

---

### Task 2: Status Effects

**Files:**
- Create: `src/combat/statusEffects.mjs`

- [ ] **Step 1: Create statusEffects.mjs**

```js
export const BESM_STATUS_EFFECTS = [
  {
    id: "stunned",
    name: "Stunned",
    icon: "icons/svg/daze.svg",
  },
  {
    id: "prone",
    name: "Prone",
    icon: "icons/svg/falling.svg",
  },
  {
    id: "unconscious",
    name: "Unconscious",
    icon: "icons/svg/unconscious.svg",
  },
  {
    id: "dead",
    name: "Dead",
    icon: "icons/svg/skull.svg",
  },
  {
    id: "energyDepleted",
    name: "Energy Depleted",
    icon: "icons/svg/lightning.svg",
  },
  {
    id: "burning",
    name: "Burning",
    icon: "icons/svg/fire.svg",
  },
  {
    id: "bound",
    name: "Bound",
    icon: "icons/svg/net.svg",
  },
];
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/combat/statusEffects.mjs
git commit -m "feat: add BESM status effect definitions"
```

---

### Task 3: BESMCombat — Attack, Defence, Damage Execution

**Files:**
- Create: `src/rolls/BESMCombat.mjs`

- [ ] **Step 1: Create BESMCombat.mjs**

```js
import { resolveRollTotal, resolveEdgeFormula, formatRollBreakdown } from "../engine/rolls.mjs";
import { calculateDamage, resolveOpposed, computeEpBonus } from "../engine/combat.mjs";

function extractDice(roll) {
  const terms = roll.terms ?? [];
  const diceTerm = terms.find(t => t.results);
  if (!diceTerm) return { dice: [], diceTotal: roll.total };
  const dice = diceTerm.results.map(r => r.result);
  const diceTotal = dice.reduce((s, d) => s + d, 0);
  return { dice, diceTotal };
}

export async function performAttackRoll(attacker, weaponAttr, targetActorId = null) {
  const acv = attacker.system.derived.acv;
  const formula = "2d6";
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, acv);

  const isMuscle = weaponAttr.system.weaponOptions?.isMuscleAttack ?? false;
  const dm = isMuscle
    ? attacker.system.derived.meleeDamageMultiplier
    : attacker.system.derived.damageMultiplier;

  const modifiers = [{ label: "ACV", value: acv }];
  const rollHtml = formatRollBreakdown("attack", rollData, modifiers, total);

  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:8px; display:flex; gap:4px; flex-wrap:wrap;">
  <button data-action="defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Defend</button>
  <button data-action="auto-defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Auto-Defend (NPC)</button>
</div>`;

  const msg = await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor: attacker }),
    rolls: [roll],
    flags: {
      besm: {
        type: "attack",
        attackerId: attacker.id,
        attackTotal: total,
        weaponName: weaponAttr.name,
        weaponLevel: weaponAttr.system.effectiveLevel,
        isMuscle,
        dm,
        targetActorId,
      },
    },
  });

  // Patch message IDs into buttons
  const el = document.createElement("div");
  el.innerHTML = msg.content;
  el.querySelectorAll("[data-message-id]").forEach(btn => {
    btn.setAttribute("data-message-id", msg.id);
  });
  await msg.update({ content: el.innerHTML });

  return { roll, total, acv };
}

export async function performDefenceRoll(defender, attackMessage) {
  const flags = attackMessage.flags.besm;
  const dcv = defender.system.derived.dcv;

  const roll = await new Roll("2d6").evaluate();
  const rollData = extractDice(roll);
  const defenceTotal = resolveRollTotal(rollData.diceTotal, dcv);

  const result = resolveOpposed(flags.attackTotal, defenceTotal);

  let damage = 0;
  let damageHtml = "";
  if (result.attackerWins) {
    damage = calculateDamage(flags.dm, flags.weaponLevel, flags.attackTotal - rollData.diceTotal, defender.system.derived.ar);
    // Recalculate with proper values
    damage = calculateDamage(flags.dm, flags.weaponLevel, 0, defender.system.derived.ar);
    // Actually: damage = (DM * weaponLevel) + attacker ACV - defender AR
    const attacker = game.actors.get(flags.attackerId);
    const attackerAcv = attacker?.system.derived.acv ?? 0;
    damage = calculateDamage(flags.dm, flags.weaponLevel, attackerAcv, defender.system.derived.ar);

    damageHtml = `
<div style="margin-top:4px; font-size:12px; color:#f87171;">
  Damage: ${damage} (DM ${flags.dm} × Lv ${flags.weaponLevel} + ACV ${attackerAcv} - AR ${defender.system.derived.ar})
</div>
<button data-action="apply-damage" data-defender-id="${defender.id}" data-damage="${damage}" style="padding:2px 8px; font-size:11px; cursor:pointer; margin-top:4px;">Apply Damage</button>`;
  }

  const defenceModifiers = [{ label: "DCV", value: dcv }];
  const defenceHtml = formatRollBreakdown("defence", rollData, defenceModifiers, defenceTotal);

  const resultLabel = result.attackerWins
    ? `<span style="color:#f87171;">Hit! (margin ${result.margin})</span>`
    : `<span style="color:#4ade80;">Miss! (margin ${Math.abs(result.margin)})</span>`;

  const content = `<div class="besm-roll-header">Attack vs Defence</div>
<div style="font-size:12px; margin:4px 0;">Attack: ${flags.attackTotal} vs Defence: ${defenceTotal}</div>
<div style="font-size:13px; font-weight:bold; margin:4px 0;">${resultLabel}</div>
${defenceHtml}
${damageHtml}`;

  await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor: defender }),
    rolls: [roll],
    flags: {
      besm: {
        type: "attackResult",
        attackerId: flags.attackerId,
        defenderId: defender.id,
        damage,
        attackerWins: result.attackerWins,
        margin: result.margin,
      },
    },
  });

  return { defenceTotal, result, damage };
}

export async function applyDamage(actor, amount) {
  const currentHp = actor.system.derived.currentHp;
  const newHP = Math.max(0, currentHp - amount);
  await actor.update({ "system.derived.currentHp": newHP });

  // Shock value check
  if (amount >= actor.system.derived.sv && actor.system.derived.sv > 0) {
    const token = actor.getActiveTokens()[0];
    if (token) {
      await token.toggleActiveEffect({ id: "stunned", name: "Stunned", icon: "icons/svg/daze.svg" });
    }
  }

  // Unconscious at 0 HP
  if (newHP === 0) {
    const token = actor.getActiveTokens()[0];
    if (token) {
      await token.toggleActiveEffect({ id: "unconscious", name: "Unconscious", icon: "icons/svg/unconscious.svg" });
    }
  }

  ui.notifications.info(`${actor.name} takes ${amount} damage. HP: ${currentHp} → ${newHP}`);
}

export async function promptEpBonus(actor, originalTotal, messageId) {
  const soulValue = actor.system.stats.soul.mode !== "missing" ? actor.system.stats.soul.value : 0;
  const currentEp = actor.system.derived.currentEp;
  const cap = computeEpBonus(soulValue, currentEp);

  if (cap === 0) {
    ui.notifications.warn("No EP available to spend.");
    return 0;
  }

  const buttons = [];
  for (let i = 1; i <= cap; i++) {
    buttons.push({
      label: `+${i} (${i * 10} EP)`,
      action: String(i),
      callback: () => i,
    });
  }
  buttons.unshift({
    label: "Skip",
    action: "0",
    callback: () => 0,
  });

  const bonus = await foundry.applications.api.DialogV2.wait({
    window: { title: "Spend Energy Points" },
    content: `<p>Spend EP for a roll bonus? (10 EP per +1, max +${cap})</p>`,
    buttons,
  });

  if (!bonus || bonus === 0) return 0;

  // Deduct EP
  await actor.update({
    "system.derived.currentEp": currentEp - (bonus * 10),
  });

  // Update the chat message with new total
  const msg = game.messages.get(messageId);
  if (msg) {
    const newTotal = originalTotal + bonus;
    const updatedContent = msg.content.replace(
      /Total: \d+/,
      `Total: ${newTotal} <span style="color:#60a5fa;">(+${bonus} EP)</span>`
    );
    await msg.update({ content: updatedContent });
  }

  return bonus;
}

export async function performSanityRoll(actor) {
  const mind = actor.system.stats.mind.mode !== "missing" ? actor.system.stats.mind.value : null;
  const soul = actor.system.stats.soul.mode !== "missing" ? actor.system.stats.soul.value : null;

  if (mind === null || soul === null) {
    ui.notifications.warn("Cannot make a sanity roll — Mind or Soul is missing.");
    return null;
  }

  const sanityBase = Math.floor((mind + soul) / 2);
  const roll = await new Roll("2d6").evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, sanityBase);

  const modifiers = [{ label: "Sanity Base", value: sanityBase }];
  const content = formatRollBreakdown("sanity", rollData, modifiers, total);

  await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
  });

  return { roll, total, sanityBase };
}
```

Note: `formatRollBreakdown` in `rolls.mjs` needs the "attack", "defence", and "sanity" types added to its label map. We'll handle that in the next step.

- [ ] **Step 2: Update rolls.mjs to add new roll type labels**

Read `src/engine/rolls.mjs` and update the `ROLL_TYPE_LABELS` object:

```js
const ROLL_TYPE_LABELS = {
  stat: "Stat Roll",
  skill: "Skill Roll",
  initiative: "Initiative",
  attack: "Attack Roll",
  defence: "Defence Roll",
  sanity: "Sanity Roll",
  social: "Social Combat Roll",
};
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/rolls/BESMCombat.mjs src/engine/rolls.mjs
git commit -m "feat: add combat execution — attack, defence, damage, EP bonus, sanity rolls"
```

---

### Task 4: Social Combat Execution

**Files:**
- Create: `src/rolls/BESMSocial.mjs`

- [ ] **Step 1: Create BESMSocial.mjs**

```js
import { resolveRollTotal, resolveEdgeFormula, formatRollBreakdown } from "../engine/rolls.mjs";
import { resolveSocialOpposed, socialDamage } from "../engine/combat.mjs";

function extractDice(roll) {
  const terms = roll.terms ?? [];
  const diceTerm = terms.find(t => t.results);
  if (!diceTerm) return { dice: [], diceTotal: roll.total };
  const dice = diceTerm.results.map(r => r.result);
  const diceTotal = dice.reduce((s, d) => s + d, 0);
  return { dice, diceTotal };
}

const EDGE_CATEGORIES = [
  { id: 1, label: "More societal privilege", autoEval: false },
  { id: 2, label: "Higher Body Stat", autoEval: true },
  { id: 3, label: "More Features (Appearance)", autoEval: true },
  { id: 4, label: "Greater wealth or valuable assets", autoEval: false },
  { id: 5, label: "Higher Connected Attribute", autoEval: true },
  { id: 6, label: "Greater number of nearby supportive allies", autoEval: false },
  { id: 7, label: "Moral high ground", autoEval: false },
  { id: 8, label: "Fewer combined public social/physical Defects", autoEval: true },
  { id: 9, label: "Better or more powerful special abilities", autoEval: false },
  { id: 10, label: "Relevant secret knowledge or advanced preparation", autoEval: false },
];

export function autoEvaluateEdges(attacker, defender) {
  const suggestions = {};

  // Category 2: Higher Body Stat
  const aBody = attacker.system.stats.body.mode !== "missing" ? attacker.system.stats.body.value : 0;
  const dBody = defender.system.stats.body.mode !== "missing" ? defender.system.stats.body.value : 0;
  if (aBody > dBody) suggestions[2] = "attacker";
  else if (dBody > aBody) suggestions[2] = "defender";
  else suggestions[2] = "none";

  // Category 3: More Features (Appearance) — count Feature attributes
  const aFeatures = [...attacker.items].filter(i => i.type === "attribute" && i.name.startsWith("Features")).length;
  const dFeatures = [...defender.items].filter(i => i.type === "attribute" && i.name.startsWith("Features")).length;
  if (aFeatures > dFeatures) suggestions[3] = "attacker";
  else if (dFeatures > aFeatures) suggestions[3] = "defender";
  else suggestions[3] = "none";

  // Category 5: Higher Connected Attribute
  const aConnected = [...attacker.items].find(i => i.type === "attribute" && i.name === "Connected");
  const dConnected = [...defender.items].find(i => i.type === "attribute" && i.name === "Connected");
  const aConnLvl = aConnected?.system.effectiveLevel ?? 0;
  const dConnLvl = dConnected?.system.effectiveLevel ?? 0;
  if (aConnLvl > dConnLvl) suggestions[5] = "attacker";
  else if (dConnLvl > aConnLvl) suggestions[5] = "defender";
  else suggestions[5] = "none";

  // Category 8: Fewer defects
  const aDefects = [...attacker.items].filter(i => i.type === "defect").length;
  const dDefects = [...defender.items].filter(i => i.type === "defect").length;
  if (aDefects < dDefects) suggestions[8] = "attacker";
  else if (dDefects < aDefects) suggestions[8] = "defender";
  else suggestions[8] = "none";

  return suggestions;
}

export async function openSocialEdgeDialog(attacker, defender) {
  const suggestions = autoEvaluateEdges(attacker, defender);

  let formHtml = `<p style="margin-bottom:8px;">Evaluate advantages for <strong>${attacker.name}</strong> vs <strong>${defender.name}</strong>:</p>
<table style="width:100%; font-size:11px; border-collapse:collapse;">
<tr style="border-bottom:1px solid #334155;"><th style="text-align:left; padding:4px;">Category</th><th style="padding:4px;">Attacker</th><th style="padding:4px;">None</th><th style="padding:4px;">Defender</th></tr>`;

  for (const cat of EDGE_CATEGORIES) {
    const suggested = suggestions[cat.id] ?? "none";
    const autoLabel = cat.autoEval ? " *" : "";
    formHtml += `<tr style="border-bottom:1px solid #1e293b;">
<td style="padding:4px;">${cat.id}. ${cat.label}${autoLabel}</td>
<td style="text-align:center; padding:4px;"><input type="radio" name="cat${cat.id}" value="attacker" ${suggested === "attacker" ? "checked" : ""}/></td>
<td style="text-align:center; padding:4px;"><input type="radio" name="cat${cat.id}" value="none" ${suggested === "none" ? "checked" : ""}/></td>
<td style="text-align:center; padding:4px;"><input type="radio" name="cat${cat.id}" value="defender" ${suggested === "defender" ? "checked" : ""}/></td>
</tr>`;
  }
  formHtml += `</table><p style="font-size:10px; color:#64748b; margin-top:4px;">* Auto-evaluated (GM can override)</p>`;

  const result = await foundry.applications.api.DialogV2.prompt({
    window: { title: "Social Combat — Edge Checklist" },
    content: formHtml,
    ok: {
      label: "Resolve Edges",
      callback: (event, button, dialog) => {
        const edges = { attacker: 0, defender: 0 };
        for (const cat of EDGE_CATEGORIES) {
          const selected = button.form.elements[`cat${cat.id}`]?.value;
          if (selected === "attacker") edges.attacker++;
          else if (selected === "defender") edges.defender++;
        }
        return edges;
      },
    },
  });

  if (!result) return null;

  let netEdge = null;
  const diff = result.attacker - result.defender;
  if (diff >= 3) netEdge = { side: "attacker", edge: "major" };
  else if (diff >= 1) netEdge = { side: "attacker", edge: "minor" };
  else if (diff <= -3) netEdge = { side: "defender", edge: "major" };
  else if (diff <= -1) netEdge = { side: "defender", edge: "minor" };

  return { edges: result, netEdge };
}

export async function performSocialAttackRoll(attacker, skillLevel, skillName, edge = null) {
  const socv = attacker.system.derived.socv ?? 0;
  const formula = edge ? resolveEdgeFormula(edge) : "2d6";
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, socv, skillLevel);

  const modifiers = [
    { label: "SoCV", value: socv },
    { label: skillName, value: skillLevel },
  ];
  const rollHtml = formatRollBreakdown("social", rollData, modifiers, total);

  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:8px;">
  <button data-action="social-defend" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Social Defend</button>
</div>`;

  const msg = await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor: attacker }),
    rolls: [roll],
    flags: {
      besm: {
        type: "socialAttack",
        attackerId: attacker.id,
        attackTotal: total,
        skillName,
      },
    },
  });

  const el = document.createElement("div");
  el.innerHTML = msg.content;
  el.querySelectorAll("[data-message-id]").forEach(btn => {
    btn.setAttribute("data-message-id", msg.id);
  });
  await msg.update({ content: el.innerHTML });

  return { roll, total };
}

export async function performSocialDefenceRoll(defender, attackMessage, edge = null) {
  const flags = attackMessage.flags.besm;
  const socv = defender.system.derived.socv ?? 0;
  const formula = edge ? resolveEdgeFormula(edge) : "2d6";
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const defenceTotal = resolveRollTotal(rollData.diceTotal, socv);

  const result = resolveSocialOpposed(flags.attackTotal, defenceTotal);

  let resultHtml;
  if (result.tie) {
    resultHtml = `<div style="font-size:13px; font-weight:bold; color:#fbbf24;">Tie — Reroll!</div>`;
  } else if (result.attackerWins) {
    const spDamage = socialDamage(result.margin);
    resultHtml = `<div style="font-size:13px; font-weight:bold; color:#f87171;">Social Hit! (margin ${result.margin})</div>
<div style="font-size:12px; color:#f87171;">Society Point Damage: ${spDamage}</div>
<button data-action="apply-social-damage" data-defender-id="${defender.id}" data-damage="${spDamage}" style="padding:2px 8px; font-size:11px; cursor:pointer; margin-top:4px;">Apply SP Damage</button>`;
  } else {
    resultHtml = `<div style="font-size:13px; font-weight:bold; color:#4ade80;">Social Defence succeeds!</div>`;
  }

  const defenceModifiers = [{ label: "SoCV", value: socv }];
  const defenceHtml = formatRollBreakdown("social", rollData, defenceModifiers, defenceTotal);

  const content = `<div class="besm-roll-header">Social Combat</div>
<div style="font-size:12px; margin:4px 0;">Attack: ${flags.attackTotal} vs Defence: ${defenceTotal}</div>
${resultHtml}
${defenceHtml}`;

  await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor: defender }),
    rolls: [roll],
  });

  return { defenceTotal, result };
}

export async function applySocialDamage(actor, amount) {
  const current = actor.system.derived.currentSocietyPoints;
  const newSP = Math.max(0, current - amount);
  await actor.update({ "system.derived.currentSocietyPoints": newSP });
  ui.notifications.info(`${actor.name} loses ${amount} Society Points. SP: ${current} → ${newSP}`);
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/rolls/BESMSocial.mjs
git commit -m "feat: add social combat execution with edge checklist dialog"
```

---

### Task 5: Chat Message Hook + Status Effects Registration

**Files:**
- Modify: `src/besm4e.mjs`

- [ ] **Step 1: Read besm4e.mjs**

Read `src/besm4e.mjs`.

- [ ] **Step 2: Add imports and registrations**

At the top of the file, add:

```js
import { BESM_STATUS_EFFECTS } from "./combat/statusEffects.mjs";
import { performDefenceRoll, applyDamage, promptEpBonus } from "./rolls/BESMCombat.mjs";
import { performSocialDefenceRoll, applySocialDamage } from "./rolls/BESMSocial.mjs";
```

Inside the `init` hook, after the initiative override and before the sheet registrations, add:

```js
  // Register BESM status effects
  CONFIG.statusEffects = BESM_STATUS_EFFECTS;
```

After the closing of the `init` hook (after the last `});`), add a new hook:

```js
Hooks.on("renderChatMessage", (message, html) => {
  // Defend button
  html.querySelectorAll('[data-action="defend"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const msgId = btn.getAttribute("data-message-id");
      const attackMsg = game.messages.get(msgId);
      if (!attackMsg) return;
      const controlled = canvas.tokens?.controlled?.[0];
      const defender = controlled?.actor ?? game.user.character;
      if (!defender) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await performDefenceRoll(defender, attackMsg);
    });
  });

  // Auto-Defend button
  html.querySelectorAll('[data-action="auto-defend"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const msgId = btn.getAttribute("data-message-id");
      const attackMsg = game.messages.get(msgId);
      if (!attackMsg) return;
      const controlled = canvas.tokens?.controlled?.[0];
      const defender = controlled?.actor;
      if (!defender) {
        ui.notifications.warn("Select the defending token first.");
        return;
      }
      await performDefenceRoll(defender, attackMsg);
    });
  });

  // Apply Damage button
  html.querySelectorAll('[data-action="apply-damage"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const defenderId = btn.getAttribute("data-defender-id");
      const damage = Number(btn.getAttribute("data-damage"));
      const defender = game.actors.get(defenderId);
      if (defender) await applyDamage(defender, damage);
    });
  });

  // Spend EP button
  html.querySelectorAll('[data-action="spend-ep"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const actorId = btn.getAttribute("data-actor-id");
      const total = Number(btn.getAttribute("data-total"));
      const msgId = btn.getAttribute("data-message-id");
      const actor = game.actors.get(actorId);
      if (actor) await promptEpBonus(actor, total, msgId);
    });
  });

  // Social Defend button
  html.querySelectorAll('[data-action="social-defend"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const msgId = btn.getAttribute("data-message-id");
      const attackMsg = game.messages.get(msgId);
      if (!attackMsg) return;
      const controlled = canvas.tokens?.controlled?.[0];
      const defender = controlled?.actor ?? game.user.character;
      if (!defender) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await performSocialDefenceRoll(defender, attackMsg);
    });
  });

  // Apply Social Damage button
  html.querySelectorAll('[data-action="apply-social-damage"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const defenderId = btn.getAttribute("data-defender-id");
      const damage = Number(btn.getAttribute("data-damage"));
      const defender = game.actors.get(defenderId);
      if (defender) await applySocialDamage(defender, damage);
    });
  });
});
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/besm4e.mjs
git commit -m "feat: register status effects and chat message button handlers"
```

---

### Task 6: Add EP Bonus Button to Stat/Skill Roll Chat Cards

**Files:**
- Modify: `src/rolls/BESMRoll.mjs`

- [ ] **Step 1: Read BESMRoll.mjs**

Read `src/rolls/BESMRoll.mjs`.

- [ ] **Step 2: Add EP bonus button to performStatRoll**

In `performStatRoll`, after the `formatRollBreakdown` call and before `ChatMessage.create`, wrap the content to add an EP button:

Replace:
```js
  const content = formatRollBreakdown("stat", rollData, modifiers, total);
```

With:
```js
  const rollHtml = formatRollBreakdown("stat", rollData, modifiers, total);
  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${actor.id}" data-total="${total}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`;
```

After `ChatMessage.create`, add the message ID patching:
```js
  // Patch message ID into EP button
  const el = document.createElement("div");
  el.innerHTML = msg.content;
  el.querySelectorAll('[data-action="spend-ep"]').forEach(btn => {
    btn.setAttribute("data-message-id", msg.id);
  });
  await msg.update({ content: el.innerHTML });
```

And change `await ChatMessage.create({` to `const msg = await ChatMessage.create({`.

- [ ] **Step 3: Do the same for performSkillRoll**

Same pattern — add EP button HTML after `formatRollBreakdown`, change to `const msg = await ChatMessage.create`, add message ID patch.

Replace:
```js
  const content = formatRollBreakdown("skill", rollData, modifiers, total);
```

With:
```js
  const rollHtml = formatRollBreakdown("skill", rollData, modifiers, total);
  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${actor.id}" data-total="${total}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`;
```

After `ChatMessage.create`, add:
```js
  const el = document.createElement("div");
  el.innerHTML = msg.content;
  el.querySelectorAll('[data-action="spend-ep"]').forEach(btn => {
    btn.setAttribute("data-message-id", msg.id);
  });
  await msg.update({ content: el.innerHTML });
```

And change `await ChatMessage.create({` to `const msg = await ChatMessage.create({`.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/rolls/BESMRoll.mjs
git commit -m "feat: add EP bonus button to stat and skill roll chat cards"
```

---

### Task 7: Attack Button on Weapon Attributes + CombatTab Updates

**Files:**
- Modify: `src/components/ui/AttributeRow.svelte`
- Modify: `src/components/tabs/CombatTab.svelte`

- [ ] **Step 1: Read AttributeRow.svelte**

Read `src/components/ui/AttributeRow.svelte`.

- [ ] **Step 2: Add attack button to AttributeRow**

Add import at the top of the script:
```js
  import RollButton from "./RollButton.svelte";
  import { performAttackRoll } from "../../rolls/BESMCombat.mjs";
```

Add attack handler:
```js
  function attackRoll(e) {
    e.stopPropagation();
    performAttackRoll(actor, attribute);
  }
```

In the template, after the CP cost span and before the closing `</div>`, add:
```svelte
  {#if attribute.system.isWeapon}
    <RollButton onclick={attackRoll} title="Attack with {attribute.name}" />
  {/if}
```

- [ ] **Step 3: Read CombatTab.svelte and update**

Read `src/components/tabs/CombatTab.svelte`. Add sanity and social roll buttons after the combat values grid. Replace the entire file:

```svelte
<script>
  import ResourceBar from "../ui/ResourceBar.svelte";
  import RollButton from "../ui/RollButton.svelte";
  import { performSanityRoll } from "../../rolls/BESMCombat.mjs";
  import { performSocialAttackRoll, openSocialEdgeDialog } from "../../rolls/BESMSocial.mjs";

  let { actor } = $props();
  let d = $derived(actor.system.derived);

  let sanityEnabled = $state(false);
  let socialEnabled = $state(false);

  $effect(() => {
    try {
      sanityEnabled = game.settings.get("besm", "sanityEnabled");
      socialEnabled = game.settings.get("besm", "socialCombatEnabled");
    } catch {}
  });

  function updateCurrentHp(val) {
    actor.update({ "system.derived.currentHp": val });
  }

  function updateCurrentEp(val) {
    actor.update({ "system.derived.currentEp": val });
  }

  function rollSanity() {
    performSanityRoll(actor);
  }

  function rollSocialAttack() {
    performSocialAttackRoll(actor, 0, "Social", null);
  }
</script>

<div class="p-3 flex flex-col gap-4">
  <!-- Resource Bars -->
  <div class="flex flex-col gap-2">
    {#if d.hpApplicable}
      <ResourceBar label="HP" current={d.currentHp} max={d.hpMax} onUpdate={updateCurrentHp} />
    {/if}
    {#if d.epApplicable}
      <ResourceBar label="EP" current={d.currentEp} max={d.epMax} onUpdate={updateCurrentEp} />
    {/if}
  </div>

  <!-- Combat Values Grid -->
  <div class="grid grid-cols-3 gap-3">
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">ACV</div>
      <div class="text-2xl font-bold text-slate-100">{d.acv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">DCV</div>
      <div class="text-2xl font-bold text-slate-100">{d.dcv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">Init</div>
      <div class="text-2xl font-bold text-slate-100">{d.initiative}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">SV</div>
      <div class="text-lg font-bold text-slate-100">{d.sv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">DM</div>
      <div class="text-lg font-bold text-slate-100">{d.damageMultiplier}</div>
      <div class="text-xs text-slate-500">melee {d.meleeDamageMultiplier}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">AR</div>
      <div class="text-lg font-bold text-slate-100">{d.ar}</div>
    </div>
  </div>

  <!-- Sanity (settings-gated) -->
  {#if sanityEnabled && d.sanityPoints > 0}
    <div class="border-t border-slate-700 pt-3">
      <div class="flex items-center justify-between mb-2">
        <div class="text-xs text-slate-500 uppercase">Sanity</div>
        <RollButton onclick={rollSanity} title="Sanity Roll" />
      </div>
      <div class="text-sm text-slate-300">
        Sanity Points: {d.currentSanity ?? d.sanityPoints} / {d.sanityMax}
      </div>
    </div>
  {/if}

  <!-- Social Combat (settings-gated) -->
  {#if socialEnabled && d.socv > 0}
    <div class="border-t border-slate-700 pt-3">
      <div class="flex items-center justify-between mb-2">
        <div class="text-xs text-slate-500 uppercase">Social Combat</div>
        <RollButton onclick={rollSocialAttack} title="Social Attack Roll" />
      </div>
      <div class="text-sm text-slate-300">
        SoCV: {d.socv} | Society Points: {d.currentSocietyPoints ?? d.societyPoints} / {d.societyPointsMax}
      </div>
    </div>
  {/if}
</div>
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/AttributeRow.svelte src/components/tabs/CombatTab.svelte
git commit -m "feat: add attack button on weapon attributes and sanity/social to CombatTab"
```

---

### Task 8: Foundry Verification

**Files:**
- None — manual testing

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Run setup script**

Paste into console:

```js
(async()=>{let a=await Actor.create({name:"Fighter",type:"character"});await a.update({"system.stats.body.value":6,"system.stats.mind.value":5,"system.stats.soul.value":5});await a.createEmbeddedDocuments("Item",[{name:"Weapon",type:"attribute",system:{baseCostPerLevel:4,purchasedLevel:3,isWeapon:true,weaponOptions:{damage:"",range:"",accurate:0,spreading:false,isMuscleAttack:true}}}]);let b=await Actor.create({name:"Defender",type:"character"});await b.update({"system.stats.body.value":5,"system.stats.mind.value":5,"system.stats.soul.value":5});await b.createEmbeddedDocuments("Item",[{name:"Armour",type:"attribute",system:{baseCostPerLevel:3,purchasedLevel:2}}]);console.log("Done - open Fighter sheet, find Weapon in Attributes tab, click attack dice")})();
```

- [ ] **Step 3: Test attack/defence flow**

1. Open Fighter's sheet → Attributes tab → Weapon attribute should have a dice button
2. Click the attack dice → attack chat card appears with "Defend" button
3. Select the Defender token (or use console: `canvas.tokens.placeables[1]?.control()`)
4. Click "Defend" on the chat card → result card appears with Hit/Miss and damage
5. If hit, click "Apply Damage" → Defender's HP decreases

- [ ] **Step 4: Test EP bonus**

1. Click a stat roll dice on Fighter's sidebar
2. Chat card should have "Spend EP?" button
3. Click it → dialog appears with EP spending options
4. Choose an amount → total updates in the chat card, EP deducted

- [ ] **Step 5: Test status effects**

Verify Fighter and Defender token context menus show BESM status effects (Stunned, Prone, Unconscious, etc.)

- [ ] **Step 6: Clean up**

```js
for(const a of game.actors)await a.delete();for(const i of game.items)await i.delete();
```
