import { effectiveLevel, totalAttributeCost } from "../../engine/calculations.mjs";

export class AttributeData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      baseCostPerLevel: new fields.NumberField({ integer: true, initial: 1 }),
      purchasedLevel: new fields.NumberField({ integer: true, initial: 1, min: 0 }),
      effectiveLevel: new fields.NumberField({ integer: true, initial: 1 }),
      totalCost: new fields.NumberField({ integer: true, initial: 0 }),
      enhancements: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField(),
          name: new fields.StringField(),
          levels: new fields.NumberField({ integer: true, initial: 1 }),
        })
      ),
      limiters: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField(),
          name: new fields.StringField(),
          levels: new fields.NumberField({ integer: true, initial: 1 }),
        })
      ),
      isWeapon: new fields.BooleanField({ initial: false }),
      weaponOptions: new fields.SchemaField({
        damage: new fields.StringField({ initial: "" }),
        range: new fields.StringField({ initial: "" }),
        accurate: new fields.NumberField({ integer: true, initial: 0 }),
        spreading: new fields.BooleanField({ initial: false }),
        isMuscleAttack: new fields.BooleanField({ initial: false }),
      }),
      isSkillGroup: new fields.BooleanField({ initial: false }),
      skillGroupCategory: new fields.StringField({
        initial: null,
        nullable: true,
        choices: ["background", "field", "action"],
      }),
      skillGroupType: new fields.StringField({ initial: "" }),
      isSkillsAttribute: new fields.BooleanField({ initial: false }),
      spPool: new fields.NumberField({ integer: true, initial: 0 }),
      spSpent: new fields.NumberField({ integer: true, initial: 0 }),
      spRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      isBenchmarkException: new fields.BooleanField({ initial: false }),
      isUnique: new fields.BooleanField({ initial: false }),
      tier: new fields.StringField({
        initial: null,
        nullable: true,
        choices: ["lesser", "greater", "serious"],
      }),
      uniqueDescription: new fields.HTMLField(),
      sourceTemplateId: new fields.StringField({ initial: "" }),
      sourceTemplateName: new fields.StringField({ initial: "" }),
      linkedActorId: new fields.StringField({ initial: "" }),
      transformationHeal: new fields.BooleanField({ initial: false }),
      notes: new fields.HTMLField(),
    };
  }

  prepareDerivedData() {
    this.effectiveLevel = effectiveLevel(
      this.purchasedLevel, this.enhancements, this.limiters, this.isWeapon
    );
    this.totalCost = totalAttributeCost(this.baseCostPerLevel, this.purchasedLevel);
  }
}
