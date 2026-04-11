import { statCpCost, resolveStatValue, computeHP } from "../../engine/calculations.mjs";

export class VehicleData extends foundry.abstract.TypeDataModel {
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
    const sv = resolveStatValue(this.stats.soul);

    const tough = items.find(i => i.type === "attribute" && i.name === "Tough");
    const fragile = items.find(i => i.type === "defect" && i.name === "Fragile");
    const hpResult = computeHP(bv, sv, tough?.system.effectiveLevel ?? 0, fragile?.system.rankLevel ?? 0);
    this.derived.hp = hpResult.hp;
    this.derived.hpMax = hpResult.hp;
    this.derived.hpApplicable = hpResult.applicable;

    this.derived.ar = items
      .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
      .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);
  }
}
