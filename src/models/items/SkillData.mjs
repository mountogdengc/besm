export class SkillData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      group: new fields.StringField({ initial: "" }),
      rank: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
      resolvedCostPerRank: new fields.NumberField({ integer: true, initial: 1 }),
      totalSpCost: new fields.NumberField({ integer: true, initial: 0 }),
      isAvailable: new fields.BooleanField({ initial: true }),
      isFlavor: new fields.BooleanField({ initial: false }),
      linkedStat: new fields.StringField({
        initial: "body",
        choices: ["body", "mind", "soul", "bodyMind", "bodySoul", "mindSoul", "avg"],
      }),
      isGeniusSkill: new fields.BooleanField({ initial: false }),
      specialisations: new fields.ArrayField(
        new fields.SchemaField({
          name: new fields.StringField({ initial: "" }),
          isFree: new fields.BooleanField({ initial: false }),
          spCost: new fields.NumberField({ integer: true, initial: 0 }),
        })
      ),
      sourceTemplateId: new fields.StringField({ initial: "" }),
      sourceTemplateName: new fields.StringField({ initial: "" }),
    };
  }
}
