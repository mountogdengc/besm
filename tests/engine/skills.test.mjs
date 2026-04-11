import { describe, it, expect } from "vitest";
import {
  COST_CLASS_MAP, resolveSkillCost, computeSPPool, computeSPSpent,
} from "../../src/engine/skills.mjs";

describe("COST_CLASS_MAP", () => {
  it("maps framework to 1", () => {
    expect(COST_CLASS_MAP.framework).toBe(1);
  });

  it("maps adventure to 2", () => {
    expect(COST_CLASS_MAP.adventure).toBe(2);
  });

  it("maps genre to 3", () => {
    expect(COST_CLASS_MAP.genre).toBe(3);
  });
});

describe("resolveSkillCost", () => {
  it("returns base cost class when no overrides", () => {
    const result = resolveSkillCost("Acrobatics", "framework", {}, {});
    expect(result.costPerRank).toBe(1);
    expect(result.available).toBe(true);
  });

  it("applies genre override to cost class", () => {
    const genre = { "Acrobatics": { costClass: "genre" } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, {});
    expect(result.costPerRank).toBe(3);
  });

  it("applies genre override to availability", () => {
    const genre = { "Acrobatics": { available: false } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, {});
    expect(result.available).toBe(false);
  });

  it("world override wins over genre override", () => {
    const genre = { "Acrobatics": { costClass: "genre" } };
    const world = { "Acrobatics": { costClass: "adventure" } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, world);
    expect(result.costPerRank).toBe(2);
  });

  it("world override restores availability", () => {
    const genre = { "Acrobatics": { available: false } };
    const world = { "Acrobatics": { available: true } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, world);
    expect(result.available).toBe(true);
  });

  it("handles skill not in any override", () => {
    const genre = { "Swimming": { costClass: "genre" } };
    const world = { "Driving": { costClass: "adventure" } };
    const result = resolveSkillCost("Acrobatics", "framework", genre, world);
    expect(result.costPerRank).toBe(1);
    expect(result.available).toBe(true);
  });

  it("genre override with only availability preserves base cost", () => {
    const genre = { "Acrobatics": { available: false } };
    const result = resolveSkillCost("Acrobatics", "adventure", genre, {});
    expect(result.costPerRank).toBe(2);
    expect(result.available).toBe(false);
  });
});

describe("computeSPPool", () => {
  it("returns level * 10", () => {
    expect(computeSPPool(5)).toBe(50);
  });

  it("returns 0 for level 0", () => {
    expect(computeSPPool(0)).toBe(0);
  });
});

describe("computeSPSpent", () => {
  it("sums rank * costPerRank for non-flavor skills", () => {
    const skills = [
      { rank: 3, resolvedCostPerRank: 2, isFlavor: false, specialisations: [] },
      { rank: 2, resolvedCostPerRank: 1, isFlavor: false, specialisations: [] },
    ];
    expect(computeSPSpent(skills)).toBe(8);
  });

  it("ignores flavor skills", () => {
    const skills = [
      { rank: 3, resolvedCostPerRank: 2, isFlavor: false, specialisations: [] },
      { rank: 5, resolvedCostPerRank: 3, isFlavor: true, specialisations: [] },
    ];
    expect(computeSPSpent(skills)).toBe(6);
  });

  it("includes paid specialisation costs", () => {
    const skills = [
      {
        rank: 2,
        resolvedCostPerRank: 1,
        isFlavor: false,
        specialisations: [
          { isFree: true, spCost: 0 },
          { isFree: false, spCost: 1 },
          { isFree: false, spCost: 1 },
        ],
      },
    ];
    expect(computeSPSpent(skills)).toBe(4);
  });

  it("returns 0 for empty array", () => {
    expect(computeSPSpent([])).toBe(0);
  });
});
