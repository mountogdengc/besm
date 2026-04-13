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
