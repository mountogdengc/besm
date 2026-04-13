import { describe, it, expect } from "vitest";
import {
  calculateDamage, resolveOpposed, resolveSocialOpposed,
  socialDamage, computeEpBonus,
} from "../../src/engine/combat.mjs";

describe("calculateDamage", () => {
  it("computes damage from DM, weapon level, ACV, and AR", () => {
    expect(calculateDamage(5, 3, 6, 2)).toBe(19);
  });

  it("floors at 0", () => {
    expect(calculateDamage(5, 1, 2, 50)).toBe(0);
  });

  it("handles zero weapon level", () => {
    expect(calculateDamage(5, 0, 6, 2)).toBe(4);
  });
});

describe("resolveOpposed", () => {
  it("attacker wins when total is higher", () => {
    const r = resolveOpposed(15, 12);
    expect(r.attackerWins).toBe(true);
    expect(r.margin).toBe(3);
  });

  it("attacker wins on tie", () => {
    const r = resolveOpposed(12, 12);
    expect(r.attackerWins).toBe(true);
    expect(r.margin).toBe(0);
  });

  it("defender wins when higher", () => {
    const r = resolveOpposed(10, 14);
    expect(r.attackerWins).toBe(false);
    expect(r.margin).toBe(-4);
  });
});

describe("resolveSocialOpposed", () => {
  it("attacker wins when higher (strict)", () => {
    const r = resolveSocialOpposed(15, 12);
    expect(r.tie).toBe(false);
    expect(r.attackerWins).toBe(true);
    expect(r.margin).toBe(3);
  });

  it("tie on equal totals", () => {
    const r = resolveSocialOpposed(12, 12);
    expect(r.tie).toBe(true);
  });

  it("defender wins when higher", () => {
    const r = resolveSocialOpposed(10, 14);
    expect(r.tie).toBe(false);
    expect(r.attackerWins).toBe(false);
    expect(r.margin).toBe(4);
  });
});

describe("socialDamage", () => {
  it("returns 0 for margin 0", () => {
    expect(socialDamage(0)).toBe(0);
  });

  it("returns 1 for margin 1-2", () => {
    expect(socialDamage(1)).toBe(1);
    expect(socialDamage(2)).toBe(1);
  });

  it("returns 2 for margin 3-5", () => {
    expect(socialDamage(3)).toBe(2);
    expect(socialDamage(5)).toBe(2);
  });

  it("returns 3 for margin 6-11", () => {
    expect(socialDamage(6)).toBe(3);
    expect(socialDamage(11)).toBe(3);
  });

  it("returns 4 for margin 12-17", () => {
    expect(socialDamage(12)).toBe(4);
    expect(socialDamage(17)).toBe(4);
  });

  it("returns 5 for margin 18+", () => {
    expect(socialDamage(18)).toBe(5);
    expect(socialDamage(25)).toBe(5);
  });

  it("returns 0 for negative margin", () => {
    expect(socialDamage(-3)).toBe(0);
  });
});

describe("computeEpBonus", () => {
  it("returns min of soul value and affordable", () => {
    expect(computeEpBonus(5, 100)).toBe(5);
  });

  it("caps at affordable EP", () => {
    expect(computeEpBonus(10, 30)).toBe(3);
  });

  it("returns 0 when no EP", () => {
    expect(computeEpBonus(5, 0)).toBe(0);
  });

  it("returns 0 when soul is 0", () => {
    expect(computeEpBonus(0, 100)).toBe(0);
  });
});
