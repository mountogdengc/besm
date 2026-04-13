import { describe, it, expect } from "vitest";
import { computeTransformDamage } from "../../src/engine/alternateForm.mjs";

describe("computeTransformDamage", () => {
  it("carries over absolute damage to new form", () => {
    expect(computeTransformDamage(100, 80, 120, 0)).toBe(100);
  });

  it("handles frailer alt form", () => {
    expect(computeTransformDamage(100, 80, 60, 0)).toBe(40);
  });

  it("applies transformation healing", () => {
    expect(computeTransformDamage(100, 80, 120, 10)).toBe(110);
  });

  it("arrives at 0 when damage exceeds alt max HP", () => {
    expect(computeTransformDamage(100, 10, 50, 0)).toBe(0);
  });

  it("returns full HP when no damage taken", () => {
    expect(computeTransformDamage(100, 100, 80, 0)).toBe(80);
  });

  it("healing cannot exceed damage taken", () => {
    expect(computeTransformDamage(100, 80, 120, 50)).toBe(120);
  });

  it("handles zero current HP", () => {
    expect(computeTransformDamage(100, 0, 80, 0)).toBe(0);
  });

  it("handles healing bringing damage to zero", () => {
    expect(computeTransformDamage(100, 80, 120, 20)).toBe(120);
  });
});
