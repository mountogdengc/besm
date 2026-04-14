import {
  statCpCost, resolveStatValue, computeBaseCv,
  computeHP, computeDamageMultipliers,
} from "../../engine/calculations.mjs";

export class MechaData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      cpBase: new fields.NumberField({ integer: true, initial: 0 }),
      cpTotal: new fields.NumberField({ integer: true, initial: 0 }),
      cpSpent: new fields.NumberField({ integer: true, initial: 0 }),
      cpRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      stats: new fields.SchemaField({
        body: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        mind: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        soul: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "missing",
            choices: ["normal", "zero", "missing"],
          }),
        }),
      }),
      derived: new fields.SchemaField({
        hp: new fields.NumberField({ integer: true, initial: 0 }),
        hpMax: new fields.NumberField({ integer: true, initial: 0 }),
        hpApplicable: new fields.BooleanField({ initial: true }),
        currentHp: new fields.NumberField({ integer: true, initial: 0 }),
        ar: new fields.NumberField({ integer: true, initial: 0 }),
        acv: new fields.NumberField({ integer: true, initial: 0 }),
        dcv: new fields.NumberField({ integer: true, initial: 0 }),
        baseCv: new fields.NumberField({ integer: true, initial: 0 }),
        damageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        meleeDamageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
      }),
      pilotId: new fields.StringField({ initial: "" }),
      pilotBonus: new fields.SchemaField({
        body: new fields.NumberField({ integer: true, initial: 0 }),
        mind: new fields.NumberField({ integer: true, initial: 0 }),
        soul: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      crew: new fields.ArrayField(
        new fields.SchemaField({
          actorId: new fields.StringField(),
          role: new fields.StringField({ initial: "crew" }),
        })
      ),
      passengerCapacity: new fields.NumberField({ integer: true, initial: 0 }),
      notes: new fields.HTMLField(),
    };
  }

  prepareDerivedData() {
    const items = this.parent.items;

    for (const stat of Object.values(this.stats)) {
      stat.cpCost = stat.mode === "missing" ? 0 : statCpCost(stat.value);
    }
    const statCP = Object.values(this.stats).reduce((sum, s) => sum + s.cpCost, 0);

    const attributeCP = items
      .filter(i => i.type === "attribute")
      .reduce((sum, attr) => sum + attr.system.totalCost, 0);

    const defectCP = items
      .filter(i => i.type === "defect")
      .reduce((sum, d) => sum + d.system.cpGranted, 0);

    this.cpTotal = this.cpBase + defectCP;
    this.cpSpent = statCP + attributeCP;
    this.cpRemaining = this.cpTotal - this.cpSpent;

    const bv = resolveStatValue(this.stats.body);
    const mv = resolveStatValue(this.stats.mind);
    const sv = resolveStatValue(this.stats.soul);

    // Pilot stat fusion — if a pilot is linked, combine stats for CV
    let cvBody = bv;
    let cvMind = mv;
    let cvSoul = sv;

    try {
      if (this.pilotId) {
        const pilot = game.actors.get(this.pilotId);
        if (pilot) {
          const pilotBody = pilot.system.stats.body.mode !== "missing" ? pilot.system.stats.body.value : null;
          const pilotMind = pilot.system.stats.mind.mode !== "missing" ? pilot.system.stats.mind.value : null;
          const pilotSoul = pilot.system.stats.soul.mode !== "missing" ? pilot.system.stats.soul.value : null;

          // Store pilot bonus for display
          this.pilotBonus.body = pilotBody ?? 0;
          this.pilotBonus.mind = pilotMind ?? 0;
          this.pilotBonus.soul = pilotSoul ?? 0;

          // Fuse: mecha Body + pilot stats for CV
          cvBody = (bv ?? 0) + (pilotBody ?? 0);
          cvMind = pilotMind;
          cvSoul = pilotSoul;
        }
      }
    } catch { /* game not ready during init */ }

    this.derived.baseCv = computeBaseCv(cvBody, cvMind, cvSoul);

    const attackMastery = items.find(i => i.type === "attribute" && i.name === "Attack Mastery");
    this.derived.acv = this.derived.baseCv + (attackMastery?.system.effectiveLevel ?? 0);

    const defenceMastery = items.find(i => i.type === "attribute" && i.name === "Defence Mastery");
    this.derived.dcv = this.derived.baseCv + (defenceMastery?.system.effectiveLevel ?? 0);

    const tough = items.find(i => i.type === "attribute" && i.name === "Tough");
    const fragile = items.find(i => i.type === "defect" && i.name === "Fragile");
    const hpResult = computeHP(bv, sv, tough?.system.effectiveLevel ?? 0, fragile?.system.rankLevel ?? 0);
    this.derived.hp = hpResult.hp;
    this.derived.hpMax = hpResult.hp;
    this.derived.hpApplicable = hpResult.applicable;

    this.derived.ar = items
      .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
      .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);

    const massiveDamage = items.find(i => i.type === "attribute" && i.name === "Massive Damage");
    const superstrength = items.find(i => i.type === "attribute" && i.name === "Superstrength");
    const dm = computeDamageMultipliers(massiveDamage?.system.effectiveLevel ?? 0, superstrength?.system.effectiveLevel ?? 0);
    this.derived.damageMultiplier = dm.base;
    this.derived.meleeDamageMultiplier = dm.melee;
  }
}
