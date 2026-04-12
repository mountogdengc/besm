import { describe, it, expect } from "vitest";
import { resolveRollTotal, resolveEdgeFormula, formatRollBreakdown } from "../../src/engine/rolls.mjs";

describe("resolveRollTotal", () => {
  it("sums dice total with modifiers", () => {
    expect(resolveRollTotal(7, 5, 3)).toBe(15);
  });

  it("returns dice total with no modifiers", () => {
    expect(resolveRollTotal(7)).toBe(7);
  });

  it("handles single modifier", () => {
    expect(resolveRollTotal(8, 4)).toBe(12);
  });

  it("handles zero modifiers", () => {
    expect(resolveRollTotal(6, 0, 0)).toBe(6);
  });
});

describe("resolveEdgeFormula", () => {
  it("returns 2d6 for no edge", () => {
    expect(resolveEdgeFormula(null)).toBe("2d6");
  });

  it("returns 3d6kl2 for minor edge", () => {
    expect(resolveEdgeFormula("minor")).toBe("3d6kl2");
  });

  it("returns 4d6kl2 for major edge", () => {
    expect(resolveEdgeFormula("major")).toBe("4d6kl2");
  });
});

describe("formatRollBreakdown", () => {
  it("formats a stat roll", () => {
    const html = formatRollBreakdown("stat", { dice: [3, 4], diceTotal: 7 }, [
      { label: "Body", value: 5 },
    ], 12);
    expect(html).toContain("Stat Roll");
    expect(html).toContain("3");
    expect(html).toContain("4");
    expect(html).toContain("Body");
    expect(html).toContain("+5");
    expect(html).toContain("12");
  });

  it("formats a skill roll with multiple modifiers", () => {
    const html = formatRollBreakdown("skill", { dice: [5, 2], diceTotal: 7 }, [
      { label: "Mind", value: 6 },
      { label: "Acrobatics", value: 3 },
    ], 16);
    expect(html).toContain("Skill Roll");
    expect(html).toContain("Mind");
    expect(html).toContain("Acrobatics");
    expect(html).toContain("16");
  });

  it("formats an initiative roll", () => {
    const html = formatRollBreakdown("initiative", { dice: [4, 6], diceTotal: 10 }, [
      { label: "ACV", value: 5 },
    ], 15);
    expect(html).toContain("Initiative");
    expect(html).toContain("15");
  });
});
