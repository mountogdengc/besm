export class BESMTemplateData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      templateType: new fields.StringField({
        initial: "race",
        choices: ["race", "class", "size"],
      }),
      description: new fields.HTMLField(),
      pointTotal: new fields.NumberField({ integer: true, initial: 0 }),
      sizeRank: new fields.NumberField({ integer: true, initial: 0, nullable: true }),
      entries: new fields.ArrayField(new fields.ObjectField()),
    };
  }
}
