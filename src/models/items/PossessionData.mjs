export class PossessionData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      category: new fields.StringField({
        initial: "gear",
        choices: ["gear", "feature", "other"],
      }),
      isMechanical: new fields.BooleanField({ initial: false }),
      budgetCost: new fields.NumberField({ integer: true, initial: 0 }),
      linkedAttributeId: new fields.StringField({ initial: "" }),
      notes: new fields.HTMLField(),
    };
  }
}
