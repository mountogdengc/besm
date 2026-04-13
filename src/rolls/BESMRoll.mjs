import { resolveRollTotal, resolveEdgeFormula, formatRollBreakdown } from "../engine/rolls.mjs";

function extractDice(roll) {
  const terms = roll.terms ?? [];
  const diceTerm = terms.find(t => t.results);
  if (!diceTerm) return { dice: [], diceTotal: roll.total };
  const dice = diceTerm.results.map(r => r.result);
  const diceTotal = dice.reduce((s, d) => s + d, 0);
  return { dice, diceTotal };
}

export async function resolveStatForRoll(actor, nominalStat) {
  const stat = actor.system.stats[nominalStat];
  if (stat.mode !== "missing") {
    return { value: stat.mode === "zero" ? 0 : stat.value, label: nominalStat };
  }

  const available = ["body", "mind", "soul"]
    .filter(k => actor.system.stats[k].mode !== "missing")
    .map(k => ({
      key: k,
      value: actor.system.stats[k].mode === "zero" ? 0 : actor.system.stats[k].value,
      label: k.charAt(0).toUpperCase() + k.slice(1),
    }));

  if (available.length === 0) {
    ui.notifications.warn("No stats available for this roll.");
    return null;
  }

  if (available.length === 1) {
    return { value: available[0].value, label: available[0].key };
  }

  const buttons = available.map(s => ({
    label: `${s.label} (${s.value})`,
    action: s.key,
    callback: () => s.key,
  }));

  const chosen = await foundry.applications.api.DialogV2.wait({
    window: { title: "Missing Stat — Choose Substitute" },
    content: "<p>This roll calls for a missing stat. Choose which stat to substitute:</p>",
    buttons,
  });

  if (!chosen) return null;
  const pick = available.find(s => s.key === chosen);
  return pick ? { value: pick.value, label: pick.key } : null;
}

export async function performStatRoll(actor, statKey, options = {}) {
  const resolved = await resolveStatForRoll(actor, statKey);
  if (!resolved) return null;

  const formula = resolveEdgeFormula(options.edge ?? null);
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, resolved.value);

  const modifiers = [{ label: resolved.label.charAt(0).toUpperCase() + resolved.label.slice(1), value: resolved.value }];
  const rollHtml = formatRollBreakdown("stat", rollData, modifiers, total);
  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${actor.id}" data-total="${total}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`;

  const msg = await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
  });

  // Patch message ID into EP button
  const el = document.createElement("div");
  el.innerHTML = msg.content;
  el.querySelectorAll('[data-action="spend-ep"]').forEach(btn => {
    btn.setAttribute("data-message-id", msg.id);
  });
  await msg.update({ content: el.innerHTML });

  return { roll, total, statValue: resolved.value };
}

export async function performSkillRoll(actor, statKey, skillLevel, skillName, options = {}) {
  const resolved = await resolveStatForRoll(actor, statKey);
  if (!resolved) return null;

  const formula = resolveEdgeFormula(options.edge ?? null);
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, resolved.value, skillLevel);

  const modifiers = [
    { label: resolved.label.charAt(0).toUpperCase() + resolved.label.slice(1), value: resolved.value },
    { label: skillName, value: skillLevel },
  ];
  const rollHtml = formatRollBreakdown("skill", rollData, modifiers, total);
  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${actor.id}" data-total="${total}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
</div>`;

  const msg = await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor }),
    rolls: [roll],
  });

  const el = document.createElement("div");
  el.innerHTML = msg.content;
  el.querySelectorAll('[data-action="spend-ep"]').forEach(btn => {
    btn.setAttribute("data-message-id", msg.id);
  });
  await msg.update({ content: el.innerHTML });

  return { roll, total, statValue: resolved.value, skillLevel };
}
