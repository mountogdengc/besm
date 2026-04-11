import { describe, it, expect } from "vitest";
import {
  statCpCost, resolveStatValue, effectiveLevel, totalAttributeCost,
  computeBaseCv, computeHP, computeEP, computeShockValue,
  computeDamageMultipliers, computeMovement, computeSanity, computeSocv
} from "../../src/engine/calculations.mjs";

describe("statCpCost", () => {
  it("returns 0 for value 0", () => {
    expect(statCpCost(0)).toBe(0);
  });

  it("costs 2 CP per point for values 1-12", () => {
    expect(statCpCost(1)).toBe(2);
    expect(statCpCost(4)).toBe(8);
    expect(statCpCost(12)).toBe(24);
  });

  it("costs 4 CP per point above 12", () => {
    expect(statCpCost(13)).toBe(28);
    expect(statCpCost(14)).toBe(32);
    expect(statCpCost(15)).toBe(36);
  });
});

describe("resolveStatValue", () => {
  it("returns value for normal mode", () => {
    expect(resolveStatValue({ value: 5, mode: "normal" })).toBe(5);
  });

  it("returns 0 for zero mode", () => {
    expect(resolveStatValue({ value: 5, mode: "zero" })).toBe(0);
  });

  it("returns null for missing mode", () => {
    expect(resolveStatValue({ value: 5, mode: "missing" })).toBeNull();
  });
});

describe("effectiveLevel", () => {
  it("returns purchasedLevel with no mods", () => {
    expect(effectiveLevel(3, [], [], false)).toBe(3);
  });

  it("subtracts enhancement levels", () => {
    expect(effectiveLevel(3, [{ levels: 1 }], [], false)).toBe(2);
  });

  it("adds limiter levels", () => {
    expect(effectiveLevel(3, [], [{ levels: 2 }], false)).toBe(5);
  });

  it("combines enhancements and limiters", () => {
    expect(effectiveLevel(3, [{ levels: 2 }], [{ levels: 1 }], false)).toBe(2);
  });

  it("floors at 0 for non-weapons", () => {
    expect(effectiveLevel(1, [{ levels: 5 }], [], false)).toBe(0);
  });

  it("floors at -1 for weapons", () => {
    expect(effectiveLevel(1, [{ levels: 5 }], [], true)).toBe(-1);
  });
});

describe("totalAttributeCost", () => {
  it("multiplies base cost by purchased level", () => {
    expect(totalAttributeCost(4, 3)).toBe(12);
  });

  it("returns 0 for level 0", () => {
    expect(totalAttributeCost(4, 0)).toBe(0);
  });
});

describe("computeBaseCv", () => {
  it("averages all three stats", () => {
    expect(computeBaseCv(5, 5, 5)).toBe(5);
  });

  it("floors the result", () => {
    expect(computeBaseCv(5, 5, 4)).toBe(4);
  });

  it("excludes null stats from sum and divisor", () => {
    expect(computeBaseCv(6, null, 6)).toBe(6);
  });

  it("uses single stat when two are null", () => {
    expect(computeBaseCv(8, null, null)).toBe(8);
  });

  it("returns 0 when all stats are null", () => {
    expect(computeBaseCv(null, null, null)).toBe(0);
  });

  it("handles uneven values with missing stat", () => {
    expect(computeBaseCv(7, null, 4)).toBe(5);
  });
});

describe("computeHP", () => {
  it("computes HP from body and soul", () => {
    const r = computeHP(5, 5, 0, 0);
    expect(r.hp).toBe(50);
    expect(r.applicable).toBe(true);
  });

  it("adds Tough bonus", () => {
    expect(computeHP(5, 5, 2, 0).hp).toBe(70);
  });

  it("subtracts Fragile reduction", () => {
    expect(computeHP(5, 5, 0, 1).hp).toBe(40);
  });

  it("uses soul * 10 when body is null", () => {
    expect(computeHP(null, 5, 0, 0).hp).toBe(50);
  });

  it("uses body * 10 when soul is null", () => {
    expect(computeHP(5, null, 0, 0).hp).toBe(50);
  });

  it("returns not applicable when both null", () => {
    const r = computeHP(null, null, 0, 0);
    expect(r.hp).toBe(0);
    expect(r.applicable).toBe(false);
  });

  it("floors HP at 0", () => {
    expect(computeHP(1, 1, 0, 3).hp).toBe(0);
  });
});

describe("computeEP", () => {
  it("computes EP from mind and soul", () => {
    const r = computeEP(5, 5, 0);
    expect(r.ep).toBe(50);
    expect(r.applicable).toBe(true);
  });

  it("adds Energised bonus", () => {
    expect(computeEP(5, 5, 2).ep).toBe(70);
  });

  it("uses soul * 10 when mind is null", () => {
    expect(computeEP(null, 5, 0).ep).toBe(50);
  });

  it("uses mind * 10 when soul is null", () => {
    expect(computeEP(5, null, 0).ep).toBe(50);
  });

  it("returns not applicable when both null", () => {
    const r = computeEP(null, null, 0);
    expect(r.ep).toBe(0);
    expect(r.applicable).toBe(false);
  });
});

describe("computeShockValue", () => {
  it("computes base shock value as HP/5", () => {
    expect(computeShockValue(50, true, 0)).toBe(10);
  });

  it("adds hardboiled bonus", () => {
    expect(computeShockValue(50, true, 1)).toBe(20);
  });

  it("caps at HP/2", () => {
    expect(computeShockValue(50, true, 5)).toBe(25);
  });

  it("returns 0 when not applicable", () => {
    expect(computeShockValue(0, false, 0)).toBe(0);
  });
});

describe("computeDamageMultipliers", () => {
  it("returns base 5 with no attributes", () => {
    const r = computeDamageMultipliers(0, 0);
    expect(r.base).toBe(5);
    expect(r.melee).toBe(5);
  });

  it("adds Massive Damage to both", () => {
    const r = computeDamageMultipliers(3, 0);
    expect(r.base).toBe(8);
    expect(r.melee).toBe(8);
  });

  it("adds Superstrength to melee only", () => {
    const r = computeDamageMultipliers(2, 3);
    expect(r.base).toBe(7);
    expect(r.melee).toBe(10);
  });
});

describe("computeMovement", () => {
  it("computes all speeds from body", () => {
    const r = computeMovement(10);
    expect(r.walkSpeed).toBe(10);
    expect(r.jogSpeed).toBe(15);
    expect(r.runSpeed).toBe(20);
    expect(r.sprintSpeed).toBe(40);
    expect(r.swimSpeed).toBe(5);
    expect(r.jumpDistanceStationary).toBe(2);
    expect(r.jumpDistanceMoving).toBe(10);
  });

  it("returns all zeros when body is null", () => {
    const r = computeMovement(null);
    expect(r.walkSpeed).toBe(0);
    expect(r.sprintSpeed).toBe(0);
  });
});

describe("computeSanity", () => {
  it("computes sanity from mind and soul", () => {
    expect(computeSanity(5, 5, 0, 0)).toBe(10);
  });

  it("adds unassailable bonus", () => {
    expect(computeSanity(5, 5, 2, 0)).toBe(14);
  });

  it("subtracts unsettled reduction", () => {
    expect(computeSanity(5, 5, 0, 1)).toBe(8);
  });

  it("returns null when mind is null", () => {
    expect(computeSanity(null, 5, 0, 0)).toBeNull();
  });

  it("returns null when soul is null", () => {
    expect(computeSanity(5, null, 0, 0)).toBeNull();
  });
});

describe("computeSocv", () => {
  it("computes SoCV as floor of average", () => {
    expect(computeSocv(5, 5)).toBe(5);
    expect(computeSocv(5, 4)).toBe(4);
  });

  it("returns null when mind is null", () => {
    expect(computeSocv(null, 5)).toBeNull();
  });

  it("returns null when soul is null", () => {
    expect(computeSocv(5, null)).toBeNull();
  });
});
