export const POWER_LEVEL_BENCHMARKS = {
  subhuman:     { cpMax: 24,   maxStat: 5,    maxAttrLevel: 2,    cvMin: 1, cvMax: 6,    hpMin: 10,  hpMax: 40,   dmgMin: 2, dmgMax: 4    },
  human:        { cpMax: 49,   maxStat: 7,    maxAttrLevel: 3,    cvMin: 2, cvMax: 7,    hpMin: 30,  hpMax: 60,   dmgMin: 3, dmgMax: 6    },
  adventurer:   { cpMax: 74,   maxStat: 9,    maxAttrLevel: 4,    cvMin: 3, cvMax: 8,    hpMin: 40,  hpMax: 80,   dmgMin: 4, dmgMax: 8    },
  heroic:       { cpMax: 99,   maxStat: 10,   maxAttrLevel: 5,    cvMin: 4, cvMax: 9,    hpMin: 50,  hpMax: 100,  dmgMin: 4, dmgMax: 9    },
  mythical:     { cpMax: 149,  maxStat: 12,   maxAttrLevel: 6,    cvMin: 5, cvMax: 10,   hpMin: 60,  hpMax: 120,  dmgMin: 5, dmgMax: 10   },
  superhuman:   { cpMax: 199,  maxStat: null, maxAttrLevel: 8,    cvMin: 6, cvMax: 12,   hpMin: 70,  hpMax: 140,  dmgMin: 5, dmgMax: 11   },
  superpowered: { cpMax: 249,  maxStat: null, maxAttrLevel: 9,    cvMin: 7, cvMax: null, hpMin: 80,  hpMax: 160,  dmgMin: 6, dmgMax: 12   },
  godlike:      { cpMax: null, maxStat: null, maxAttrLevel: null, cvMin: 8, cvMax: null, hpMin: 100, hpMax: null, dmgMin: 6, dmgMax: null },
};

export function validateBenchmarks(powerLevel, stats, items, derived) {
  const bench = POWER_LEVEL_BENCHMARKS[powerLevel];
  if (!bench) return { warnings: [], valid: true };

  const warnings = [];

  if (bench.maxStat) {
    for (const [key, stat] of Object.entries(stats)) {
      if (stat.mode === "missing") continue;
      const val = stat.mode === "zero" ? 0 : stat.value;
      if (val > bench.maxStat) {
        warnings.push(`${key} (${val}) exceeds recommended stat max of ${bench.maxStat}`);
      }
    }
  }

  if (bench.maxAttrLevel) {
    for (const item of items) {
      if (item.type !== "attribute") continue;
      if (item.system.isBenchmarkException) continue;
      if (item.system.effectiveLevel > bench.maxAttrLevel) {
        warnings.push(`${item.name} effective level (${item.system.effectiveLevel}) exceeds recommended max of ${bench.maxAttrLevel}`);
      }
    }
  }

  if (bench.cvMin && derived.acv < bench.cvMin) {
    warnings.push(`ACV (${derived.acv}) is below recommended minimum of ${bench.cvMin}`);
  }
  if (bench.cvMax && derived.acv > bench.cvMax) {
    warnings.push(`ACV (${derived.acv}) exceeds recommended maximum of ${bench.cvMax}`);
  }

  if (bench.hpMin && derived.hp < bench.hpMin) {
    warnings.push(`HP (${derived.hp}) is below recommended minimum of ${bench.hpMin}`);
  }
  if (bench.hpMax && derived.hp > bench.hpMax) {
    warnings.push(`HP (${derived.hp}) exceeds recommended maximum of ${bench.hpMax}`);
  }

  return { warnings, valid: warnings.length === 0 };
}
