import { resolveRollTotal, resolveEdgeFormula, edgeObstacleOptionsHtml, readEdgeSelection, formatRollBreakdown } from "../engine/rolls.mjs";
import { resolveSocialOpposed, socialDamage } from "../engine/combat.mjs";

function extractDice(roll) {
  const terms = roll.terms ?? [];
  const diceTerm = terms.find(t => t.results);
  if (!diceTerm) return { dice: [], discarded: [], diceTotal: roll.total };
  const kept = diceTerm.results.filter(r => r.active !== false).map(r => r.result);
  const discarded = diceTerm.results.filter(r => r.active === false).map(r => r.result);
  const diceTotal = kept.reduce((s, d) => s + d, 0);
  return { dice: kept, discarded, diceTotal };
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
