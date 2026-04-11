import { describe, it, expect } from "vitest";
import { validateBenchmarks, POWER_LEVEL_BENCHMARKS } from "../../src/engine/benchmarks.mjs";

describe("POWER_LEVEL_BENCHMARKS", () => {
  it("has all 8 power levels", () => {
    expect(Object.keys(POWER_LEVEL_BENCHMARKS)).toHaveLength(8);
  });

  it("adventurer has correct values", () => {
    const b = POWER_LEVEL_BENCHMARKS.adventurer;
    expect(b.maxStat).toBe(9);
    expect(b.maxAttrLevel).toBe(4);
  });
});

describe("validateBenchmarks", () => {
  const baseStats = {
    body: { value: 5, mode: "normal" },
    mind: { value: 5, mode: "normal" },
    soul: { value: 5, mode: "normal" },
  };

  it("returns valid for within-bounds character", () => {
    const items = [];
    const derived = { acv: 5, hp: 50, damageMultiplier: 5 };
    const result = validateBenchmarks("adventurer", baseStats, items, derived);
    expect(result.valid).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it("warns when stat exceeds max", () => {
    const stats = {
      ...baseStats,
      body: { value: 12, mode: "normal" },
    };
    const result = validateBenchmarks("adventurer", stats, [], { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("body"))).toBe(true);
  });

  it("skips missing stats", () => {
    const stats = {
      ...baseStats,
      body: { value: 12, mode: "missing" },
    };
    const result = validateBenchmarks("adventurer", stats, [], { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(true);
  });

  it("warns when attribute exceeds level cap", () => {
    const items = [
      { system: { effectiveLevel: 6, isBenchmarkException: false }, name: "Teleportation", type: "attribute" },
    ];
    const result = validateBenchmarks("adventurer", baseStats, items, { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("Teleportation"))).toBe(true);
  });

  it("skips benchmark exception attributes", () => {
    const items = [
      { system: { effectiveLevel: 10, isBenchmarkException: true }, name: "Combat Technique", type: "attribute" },
    ];
    const result = validateBenchmarks("adventurer", baseStats, items, { acv: 5, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(true);
  });

  it("warns when ACV exceeds max", () => {
    const result = validateBenchmarks("adventurer", baseStats, [], { acv: 12, hp: 50, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("ACV"))).toBe(true);
  });

  it("warns when HP exceeds max", () => {
    const result = validateBenchmarks("adventurer", baseStats, [], { acv: 5, hp: 100, damageMultiplier: 5 });
    expect(result.valid).toBe(false);
    expect(result.warnings.some(w => w.includes("HP"))).toBe(true);
  });

  it("handles godlike with null caps", () => {
    const result = validateBenchmarks("godlike", baseStats, [
      { system: { effectiveLevel: 99, isBenchmarkException: false }, name: "Power", type: "attribute" },
    ], { acv: 50, hp: 500, damageMultiplier: 20 });
    expect(result.valid).toBe(true);
  });
});
