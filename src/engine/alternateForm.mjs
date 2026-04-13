export function computeTransformDamage(currentMaxHP, currentHP, altMaxHP, healAmount) {
  const damageTaken = Math.max(0, currentMaxHP - currentHP);
  const adjustedDamage = Math.max(0, damageTaken - healAmount);
  return Math.max(0, altMaxHP - adjustedDamage);
}
