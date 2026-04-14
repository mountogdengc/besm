import { resolveSkillCost } from "../../engine/skills.mjs";

export class SkillData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      description: new fields.HTMLField(),
      source: new fields.StringField({ initial: "BESM4e" }),
      group: new fields.StringField({ initial: "" }),
      costClass: new fields.StringField({
        initial: "framework",
        choices: ["framework", "adventure", "genre"],
      }),
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

  prepareDerivedData() {
    // Layer 2: genre overrides (empty until Phase 8 compendium data)
    const genreOverrides = {};

    // Layer 3: world overrides
    let worldOverrides = {};
    try {
      worldOverrides = game.settings.get("besm", "worldSkillOverrides") ?? {};
    } catch (e) {}

    // Resolve cost through three layers
    const result = resolveSkillCost(
      this.parent.name, this.costClass, genreOverrides, worldOverrides
    );

    this.resolvedCostPerRank = this.isFlavor ? 0 : result.costPerRank;
    this.isAvailable = result.available;

    // Compute total SP cost
    const rankCost = this.rank * this.resolvedCostPerRank;
    const specCost = this.specialisations
      .filter(s => !s.isFree)
      .reduce((sum, s) => sum + s.spCost, 0);
    this.totalSpCost = rankCost + specCost;
  }
}
