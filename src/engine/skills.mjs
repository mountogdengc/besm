export const COST_CLASS_MAP = {
  framework: 1,
  adventure: 2,
  genre: 3,
};

export function resolveSkillCost(skillName, baseCostClass, genreOverrides, worldOverrides) {
  let costClass = baseCostClass;
  let available = true;

  const genreEntry = genreOverrides[skillName];
  if (genreEntry) {
    if (genreEntry.costClass) costClass = genreEntry.costClass;
    if (genreEntry.available !== undefined) available = genreEntry.available;
  }

  const worldEntry = worldOverrides[skillName];
  if (worldEntry) {
    if (worldEntry.costClass) costClass = worldEntry.costClass;
    if (worldEntry.available !== undefined) available = worldEntry.available;
  }

  return {
    costPerRank: COST_CLASS_MAP[costClass] ?? 1,
    available,
  };
}

export function computeSPPool(skillsAttributeLevel) {
  return skillsAttributeLevel * 10;
}

export function computeSPSpent(skills) {
  return skills
    .filter(s => !s.isFlavor)
    .reduce((total, skill) => {
      const rankCost = skill.rank * skill.resolvedCostPerRank;
      const specCost = skill.specialisations
        .filter(s => !s.isFree)
        .reduce((sum, s) => sum + s.spCost, 0);
      return total + rankCost + specCost;
    }, 0);
}
