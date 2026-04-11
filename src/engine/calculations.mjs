export function statCpCost(value) {
  if (value <= 0) return 0;
  if (value <= 12) return value * 2;
  return (12 * 2) + ((value - 12) * 4);
}

export function resolveStatValue(stat) {
  if (stat.mode === "missing") return null;
  if (stat.mode === "zero") return 0;
  return stat.value;
}

export function effectiveLevel(purchasedLevel, enhancements, limiters, isWeapon) {
  const enhancementReduction = enhancements.reduce((sum, e) => sum + e.levels, 0);
  const limiterAddition = limiters.reduce((sum, l) => sum + l.levels, 0);
  const floor = isWeapon ? -1 : 0;
  return Math.max(floor, purchasedLevel - enhancementReduction + limiterAddition);
}

export function totalAttributeCost(baseCostPerLevel, purchasedLevel) {
  return baseCostPerLevel * purchasedLevel;
}

export function computeBaseCv(body, mind, soul) {
  const stats = [body, mind, soul].filter(v => v !== null);
  if (stats.length === 0) return 0;
  return Math.floor(stats.reduce((s, v) => s + v, 0) / stats.length);
}

export function computeHP(body, soul, toughLevel, fragileLevel) {
  const toughBonus = toughLevel * 10;
  const fragileReduction = fragileLevel * 10;

  if (body !== null && soul !== null) {
    return { hp: Math.max(0, ((body + soul) * 5) + toughBonus - fragileReduction), applicable: true };
  }
  if (body === null && soul !== null) {
    return { hp: Math.max(0, (soul * 10) + toughBonus - fragileReduction), applicable: true };
  }
  if (soul === null && body !== null) {
    return { hp: Math.max(0, (body * 10) + toughBonus - fragileReduction), applicable: true };
  }
  return { hp: 0, applicable: false };
}

export function computeEP(mind, soul, energisedLevel) {
  const energisedBonus = energisedLevel * 10;

  if (mind !== null && soul !== null) {
    return { ep: ((mind + soul) * 5) + energisedBonus, applicable: true };
  }
  if (mind === null && soul !== null) {
    return { ep: (soul * 10) + energisedBonus, applicable: true };
  }
  if (soul === null && mind !== null) {
    return { ep: (mind * 10) + energisedBonus, applicable: true };
  }
  return { ep: 0, applicable: false };
}

export function computeShockValue(hp, hpApplicable, hardboiledCount) {
  if (!hpApplicable) return 0;
  const base = Math.floor(hp / 5);
  const bonus = hardboiledCount * 10;
  const cap = Math.floor(hp / 2);
  return Math.min(cap, base + bonus);
}

export function computeDamageMultipliers(massiveDamageLevel, superstrengthLevel) {
  return {
    base: 5 + massiveDamageLevel,
    melee: 5 + massiveDamageLevel + superstrengthLevel,
  };
}

export function computeMovement(body) {
  if (body === null) {
    return {
      walkSpeed: 0, jogSpeed: 0, runSpeed: 0, sprintSpeed: 0,
      swimSpeed: 0, jumpDistanceStationary: 0, jumpDistanceMoving: 0,
    };
  }
  const sprintSpeed = body * 4;
  return {
    walkSpeed: body * 1,
    jogSpeed: Math.round(body * 1.5),
    runSpeed: body * 2,
    sprintSpeed,
    swimSpeed: Math.round(body * 0.5),
    jumpDistanceStationary: Math.floor(body / 4),
    jumpDistanceMoving: Math.floor(sprintSpeed / 4),
  };
}

export function computeSanity(mind, soul, unassailableLevel, unsettledLevel) {
  if (mind === null || soul === null) return null;
  return (mind + soul) + (unassailableLevel * 2) - (unsettledLevel * 2);
}

export function computeSocv(mind, soul) {
  if (mind === null || soul === null) return null;
  return Math.floor((mind + soul) / 2);
}
