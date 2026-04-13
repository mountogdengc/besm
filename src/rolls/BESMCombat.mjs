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
