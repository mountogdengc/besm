import { resolveRollTotal, resolveEdgeFormula, edgeObstacleOptionsHtml, readEdgeSelection, formatRollBreakdown } from "../engine/rolls.mjs";

function extractDice(roll) {
  const terms = roll.terms ?? [];
  const diceTerm = terms.find(t => t.results);
  if (!diceTerm) return { dice: [], discarded: [], diceTotal: roll.total };
  const kept = diceTerm.results.filter(r => r.active !== false).map(r => r.result);
  const discarded = diceTerm.results.filter(r => r.active === false).map(r => r.result);
  const diceTotal = kept.reduce((s, d) => s + d, 0);
  return { dice: kept, discarded, diceTotal };
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

export async function performStatRoll(actor, statKey) {
  const resolved = await resolveStatForRoll(actor, statKey);
  if (!resolved) return null;

  const content = `<div class="besm-roll">
  <div class="besm-roll-header">Stat Roll — ${resolved.label.charAt(0).toUpperCase() + resolved.label.slice(1)} (${resolved.value})</div>
  ${edgeObstacleOptionsHtml()}
  <button data-action="execute-stat-roll" data-actor-id="${actor.id}" data-stat-key="${resolved.label}" data-stat-value="${resolved.value}" style="padding:4px 12px; font-size:12px; cursor:pointer; font-weight:bold;">Roll</button>
</div>`;

  await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor }),
  });
}

export async function executeStatRoll(actorId, statLabel, statValue, edge) {
  const actor = game.actors.get(actorId);
  if (!actor) return;

  const formula = resolveEdgeFormula(edge);
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, statValue);

  const modifiers = [{ label: statLabel.charAt(0).toUpperCase() + statLabel.slice(1), value: statValue }];
  const rollHtml = formatRollBreakdown("stat", rollData, modifiers, total);
  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${actorId}" data-total="${total}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
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
}

export async function performSkillRoll(actor, statKey, skillLevel, skillName) {
  const resolved = await resolveStatForRoll(actor, statKey);
  if (!resolved) return null;

  const content = `<div class="besm-roll">
  <div class="besm-roll-header">Skill Roll — ${skillName}</div>
  <div style="font-size:11px; color:#94a3b8; margin-bottom:4px;">${resolved.label.charAt(0).toUpperCase() + resolved.label.slice(1)} (${resolved.value}) + ${skillName} (${skillLevel})</div>
  ${edgeObstacleOptionsHtml()}
  <button data-action="execute-skill-roll" data-actor-id="${actor.id}" data-stat-key="${resolved.label}" data-stat-value="${resolved.value}" data-skill-level="${skillLevel}" data-skill-name="${skillName}" style="padding:4px 12px; font-size:12px; cursor:pointer; font-weight:bold;">Roll</button>
</div>`;

  await ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker({ actor }),
  });
}

export async function executeSkillRoll(actorId, statLabel, statValue, skillLevel, skillName, edge) {
  const actor = game.actors.get(actorId);
  if (!actor) return;

  const formula = resolveEdgeFormula(edge);
  const roll = await new Roll(formula).evaluate();
  const rollData = extractDice(roll);
  const total = resolveRollTotal(rollData.diceTotal, statValue, skillLevel);

  const modifiers = [
    { label: statLabel.charAt(0).toUpperCase() + statLabel.slice(1), value: statValue },
    { label: skillName, value: skillLevel },
  ];
  const rollHtml = formatRollBreakdown("skill", rollData, modifiers, total);
  const content = `${rollHtml}
<div class="besm-roll-actions" style="margin-top:4px;">
  <button data-action="spend-ep" data-actor-id="${actorId}" data-total="${total}" data-message-id="" style="padding:2px 8px; font-size:11px; cursor:pointer;">Spend EP?</button>
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
}
