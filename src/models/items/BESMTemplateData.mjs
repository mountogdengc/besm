export class BESMTemplateData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      templateType: new fields.StringField({
        initial: "race",
        choices: ["race", "class", "size", "bundle", "powerpack"],
      }),
      tradition: new fields.StringField({ initial: "" }),
      description: new fields.HTMLField(),
      pointTotal: new fields.NumberField({ integer: true, initial: 0 }),
      sizeRank: new fields.NumberField({ integer: true, initial: 0, nullable: true }),
      statModifiers: new fields.SchemaField({
        body: new fields.NumberField({ integer: true, initial: 0 }),
        mind: new fields.NumberField({ integer: true, initial: 0 }),
        soul: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      entries: new fields.ArrayField(new fields.ObjectField()),
    };
  }
}
