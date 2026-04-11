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
}
