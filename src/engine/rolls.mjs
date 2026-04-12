export function resolveRollTotal(diceTotal, ...modifiers) {
  return modifiers.reduce((sum, mod) => sum + mod, diceTotal);
}

export function resolveEdgeFormula(edge) {
  if (edge === "minor") return "3d6kl2";
  if (edge === "major") return "4d6kl2";
  return "2d6";
}

const ROLL_TYPE_LABELS = {
  stat: "Stat Roll",
  skill: "Skill Roll",
  initiative: "Initiative",
};

export function formatRollBreakdown(type, rollData, modifiers, total) {
  const label = ROLL_TYPE_LABELS[type] ?? "Roll";
  const diceStr = rollData.dice.map(d => `<span class="besm-die">${d}</span>`).join(" + ");
  const modStr = modifiers
    .filter(m => m.value !== 0)
    .map(m => `<span class="besm-mod">+${m.value} ${m.label}</span>`)
    .join(" ");

  return `<div class="besm-roll">
  <div class="besm-roll-header">${label}</div>
  <div class="besm-roll-dice">${diceStr} = ${rollData.diceTotal}</div>
  ${modStr ? `<div class="besm-roll-mods">${modStr}</div>` : ""}
  <div class="besm-roll-total">Total: ${total}</div>
</div>`;
}
