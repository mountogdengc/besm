export function resolveRollTotal(diceTotal, ...modifiers) {
  return modifiers.reduce((sum, mod) => sum + mod, diceTotal);
}

export function resolveEdgeFormula(edgeObstacle) {
  switch (edgeObstacle) {
    case "minor-edge": return "3d6kh2";
    case "major-edge": return "4d6kh2";
    case "minor-obstacle": return "3d6kl2";
    case "major-obstacle": return "4d6kl2";
    default: return "2d6";
  }
}

export function edgeObstacleOptionsHtml() {
  return `<div class="besm-edge-options" style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-bottom:6px;">
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="none" checked /> Normal</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="minor-edge" /> Minor Edge</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="major-edge" /> Major Edge</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="minor-obstacle" /> Minor Obstacle</label>
  <label style="font-size:11px; cursor:pointer;"><input type="radio" name="besm-edge" value="major-obstacle" /> Major Obstacle</label>
</div>`;
}

export function readEdgeSelection(el) {
  const checked = el.querySelector('input[name="besm-edge"]:checked');
  const val = checked?.value ?? "none";
  return val === "none" ? null : val;
}

const ROLL_TYPE_LABELS = {
  stat: "Stat Roll",
  skill: "Skill Roll",
  initiative: "Initiative",
  attack: "Attack Roll",
  defence: "Defence Roll",
  sanity: "Sanity Roll",
  social: "Social Combat Roll",
};

export function formatRollBreakdown(type, rollData, modifiers, total) {
  const label = ROLL_TYPE_LABELS[type] ?? "Roll";
  const keptStr = rollData.dice.map(d => `<span class="besm-die">${d}</span>`).join(" + ");
  const discardedStr = (rollData.discarded ?? []).length > 0
    ? ` <span style="opacity:0.4; text-decoration:line-through;">${rollData.discarded.join(", ")}</span>`
    : "";
  const modStr = modifiers
    .filter(m => m.value !== 0)
    .map(m => `<span class="besm-mod">+${m.value} ${m.label}</span>`)
    .join(" ");

  return `<div class="besm-roll">
  <div class="besm-roll-header">${label}</div>
  <div class="besm-roll-dice">${keptStr} = ${rollData.diceTotal}${discardedStr}</div>
  ${modStr ? `<div class="besm-roll-mods">${modStr}</div>` : ""}
  <div class="besm-roll-total">Total: ${total}</div>
</div>`;
}
