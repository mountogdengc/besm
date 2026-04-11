import {
  statCpCost, resolveStatValue, computeBaseCv,
  computeHP, computeEP, computeShockValue,
  computeDamageMultipliers, computeMovement, computeSanity, computeSocv,
} from "../../engine/calculations.mjs";
import { validateBenchmarks } from "../../engine/benchmarks.mjs";

export class CharacterData extends foundry.abstract.TypeDataModel {
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
      skillMode: new fields.StringField({
        initial: "pointbuy",
        choices: ["pointbuy", "group"],
      }),
      spPool: new fields.NumberField({ integer: true, initial: 0 }),
      spSpent: new fields.NumberField({ integer: true, initial: 0 }),
      spRemaining: new fields.NumberField({ integer: true, initial: 0 }),
      appliedTemplates: new fields.ArrayField(new fields.ObjectField()),
      advancement: new fields.SchemaField({
        sessionLog: new fields.ArrayField(new fields.ObjectField()),
        totalEarned: new fields.NumberField({ integer: true, initial: 0 }),
        totalSpent: new fields.NumberField({ integer: true, initial: 0 }),
      }),
      benchmarkWarnings: new fields.ArrayField(new fields.StringField()),
      benchmarkValid: new fields.BooleanField({ initial: true }),
      notes: new fields.HTMLField(),
    };
  }

  prepareDerivedData() {
    const items = this.parent.items;

    // Step 1: Resolve stat values
    const bv = resolveStatValue(this.stats.body);
    const mv = resolveStatValue(this.stats.mind);
    const sv = resolveStatValue(this.stats.soul);

    // Step 2: Stat CP costs
    for (const stat of Object.values(this.stats)) {
      stat.cpCost = stat.mode === "missing" ? 0 : statCpCost(stat.value);
    }
    const statCP = Object.values(this.stats).reduce((sum, s) => sum + s.cpCost, 0);

    // Step 3: Attribute CP
    const attributeCP = items
      .filter(i => i.type === "attribute")
      .reduce((sum, attr) => sum + attr.system.totalCost, 0);

    // Step 4: Defect CP grants
    const defectCP = items
      .filter(i => i.type === "defect")
      .reduce((sum, d) => sum + d.system.cpGranted, 0);

    // Step 5: CP totals
    this.cpTotal = this.cpBase + defectCP;
    this.cpSpent = statCP + attributeCP;
    this.cpRemaining = this.cpTotal - this.cpSpent;

    // Step 6: Combat values
    this.derived.baseCv = computeBaseCv(bv, mv, sv);

    const attackMastery = items.find(
      i => i.type === "attribute" && i.name === "Attack Mastery"
    );
    this.derived.acv = this.derived.baseCv + (attackMastery?.system.effectiveLevel ?? 0);

    const defenceMastery = items.find(
      i => i.type === "attribute" && i.name === "Defence Mastery"
    );
    this.derived.dcv = this.derived.baseCv + (defenceMastery?.system.effectiveLevel ?? 0);

    // Step 7: HP
    const tough = items.find(i => i.type === "attribute" && i.name === "Tough");
    const fragile = items.find(i => i.type === "defect" && i.name === "Fragile");
    const hpResult = computeHP(bv, sv, tough?.system.effectiveLevel ?? 0, fragile?.system.rankLevel ?? 0);
    this.derived.hp = hpResult.hp;
    this.derived.hpMax = hpResult.hp;
    this.derived.hpApplicable = hpResult.applicable;

    // Step 8: EP
    const energised = items.find(i => i.type === "attribute" && i.name === "Energised");
    const epResult = computeEP(mv, sv, energised?.system.effectiveLevel ?? 0);
    this.derived.ep = epResult.ep;
    this.derived.epMax = epResult.ep;
    this.derived.epApplicable = epResult.applicable;

    // Step 9: Shock Value
    const hardboiledCount = items.filter(
      i => i.type === "attribute" && i.name === "Combat Technique (Hardboiled)"
    ).length;
    this.derived.sv = computeShockValue(this.derived.hp, this.derived.hpApplicable, hardboiledCount);

    // Step 10: Damage Multipliers
    const massiveDamage = items.find(i => i.type === "attribute" && i.name === "Massive Damage");
    const superstrength = items.find(i => i.type === "attribute" && i.name === "Superstrength");
    const dm = computeDamageMultipliers(
      massiveDamage?.system.effectiveLevel ?? 0,
      superstrength?.system.effectiveLevel ?? 0
    );
    this.derived.damageMultiplier = dm.base;
    this.derived.meleeDamageMultiplier = dm.melee;

    // Step 11: AR
    this.derived.ar = items
      .filter(i => i.type === "attribute" && ["Armour", "Force Field"].includes(i.name))
      .reduce((sum, attr) => sum + attr.system.effectiveLevel, 0);

    // Step 12: Movement
    const movement = computeMovement(bv);
    Object.assign(this.derived, movement);

    // Step 13: Sanity (settings-gated)
    try {
      if (game.settings.get("besm", "sanityEnabled")) {
        const unassailable = items.find(i => i.type === "attribute" && i.name === "Unassailable");
        const unsettled = items.find(i => i.type === "defect" && i.name === "Unsettled");
        const sanity = computeSanity(mv, sv, unassailable?.system.effectiveLevel ?? 0, unsettled?.system.rankLevel ?? 0);
        if (sanity !== null) {
          this.derived.sanityPoints = sanity;
          this.derived.sanityMax = sanity;
        }
      }
    } catch (e) { /* settings not yet registered during init */ }

    // Step 14: Social Combat (settings-gated)
    try {
      if (game.settings.get("besm", "socialCombatEnabled")) {
        const socv = computeSocv(mv, sv);
        if (socv !== null) {
          this.derived.socv = socv;
          this.derived.societyPoints = socv;
          this.derived.societyPointsMax = socv;
        }
      }
    } catch (e) { /* settings not yet registered during init */ }

    // Step 15: Benchmark validation (settings-gated)
    try {
      if (game.settings.get("besm", "enforceBenchmarks")) {
        const powerLevel = game.settings.get("besm", "powerLevel");
        const result = validateBenchmarks(powerLevel, this.stats, [...items], this.derived);
        this.benchmarkWarnings = result.warnings;
        this.benchmarkValid = result.valid;
      } else {
        this.benchmarkWarnings = [];
        this.benchmarkValid = true;
      }
    } catch (e) {
      this.benchmarkWarnings = [];
      this.benchmarkValid = true;
    }
  }
}
