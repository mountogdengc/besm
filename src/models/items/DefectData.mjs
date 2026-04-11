export class DefectData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      cpGranted: new fields.NumberField({ integer: true, initial: 1 }),
      rankLevel: new fields.NumberField({ integer: true, initial: 1, min: 1 }),
      isUnique: new fields.BooleanField({ initial: false }),
      tier: new fields.StringField({
        initial: "",
        choices: ["", "lesser", "greater", "serious"],
      }),
      uniqueDescription: new fields.HTMLField(),
      sourceTemplateId: new fields.StringField({ initial: "" }),
      sourceTemplateName: new fields.StringField({ initial: "" }),
    };
  }
}
