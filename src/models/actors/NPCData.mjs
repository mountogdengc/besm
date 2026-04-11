export class NPCData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      biography: new fields.HTMLField(),
      genre: new fields.StringField({ initial: "" }),
      cpBase: new fields.NumberField({ integer: true, initial: 50 }),
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
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
        soul: new fields.SchemaField({
          value: new fields.NumberField({ integer: true, initial: 0, min: 0 }),
          cpCost: new fields.NumberField({ integer: true, initial: 0 }),
          mode: new fields.StringField({
            initial: "normal",
            choices: ["normal", "zero", "missing"],
          }),
        }),
      }),
      derived: new fields.SchemaField({
        hp: new fields.NumberField({ integer: true, initial: 0 }),
        hpMax: new fields.NumberField({ integer: true, initial: 0 }),
        hpApplicable: new fields.BooleanField({ initial: true }),
        currentHp: new fields.NumberField({ integer: true, initial: 0 }),
        ep: new fields.NumberField({ integer: true, initial: 0 }),
        epMax: new fields.NumberField({ integer: true, initial: 0 }),
        epApplicable: new fields.BooleanField({ initial: true }),
        currentEp: new fields.NumberField({ integer: true, initial: 0 }),
        hpAsEp: new fields.BooleanField({ initial: false }),
        epAsHp: new fields.BooleanField({ initial: false }),
        sv: new fields.NumberField({ integer: true, initial: 0 }),
        acv: new fields.NumberField({ integer: true, initial: 0 }),
        dcv: new fields.NumberField({ integer: true, initial: 0 }),
        baseCv: new fields.NumberField({ integer: true, initial: 0 }),
        initiative: new fields.NumberField({ integer: true, initial: 0 }),
        damageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        meleeDamageMultiplier: new fields.NumberField({ integer: true, initial: 5 }),
        ar: new fields.NumberField({ integer: true, initial: 0 }),
        walkSpeed: new fields.NumberField({ initial: 0 }),
        jogSpeed: new fields.NumberField({ initial: 0 }),
        runSpeed: new fields.NumberField({ initial: 0 }),
        sprintSpeed: new fields.NumberField({ initial: 0 }),
        swimSpeed: new fields.NumberField({ initial: 0 }),
        jumpDistanceStationary: new fields.NumberField({ initial: 0 }),
        jumpDistanceMoving: new fields.NumberField({ initial: 0 }),
        sanityPoints: new fields.NumberField({ integer: true, initial: 0 }),
        sanityMax: new fields.NumberField({ integer: true, initial: 0 }),
        currentSanity: new fields.NumberField({ integer: true, initial: 0 }),
        socv: new fields.NumberField({ integer: true, initial: 0 }),
        societyPoints: new fields.NumberField({ integer: true, initial: 0 }),
        societyPointsMax: new fields.NumberField({ integer: true, initial: 0 }),
        currentSocietyPoints: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      notes: new fields.HTMLField(),
    };
  }
}
