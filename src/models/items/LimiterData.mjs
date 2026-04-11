export class LimiterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      levels: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      parentAttributeId: new fields.StringField({ initial: "" }),
    };
  }
}
