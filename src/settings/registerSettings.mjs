export function registerSettings() {
  const s = (key, config) => game.settings.register("besm", key, {
    scope: "world",
    config: true,
    ...config,
  });

  s("skillMode", {
    name: "Skill Mode",
    hint: "Point Buy uses individual skills with SP costs. Skill Groups uses attribute-based skill groups with CP costs.",
    type: String,
    default: "pointbuy",
    choices: {
      pointbuy: "Point Buy",
      group: "Skill Groups",
    },
  });

  s("powerLevel", {
    name: "Power Level",
    hint: "Sets benchmark recommendations for stat and attribute caps.",
    type: String,
    default: "adventurer",
    choices: {
      subhuman: "Sub-Human (0-24 CP)",
      human: "Human (25-49 CP)",
      adventurer: "Adventurer (50-74 CP)",
      heroic: "Heroic (75-99 CP)",
      mythical: "Mythical (100-149 CP)",
      superhuman: "Superhuman (150-199 CP)",
      superpowered: "Superpowered (200-249 CP)",
      godlike: "Godlike (250+ CP)",
    },
  });

  s("cpBase", {
    name: "Base CP",
    hint: "Starting Character Points for new characters. Set within the power level range.",
    type: Number,
    default: 50,
  });

  s("enforceBenchmarks", {
    name: "Enforce Benchmarks",
    hint: "Show warnings when characters exceed power level benchmark recommendations.",
    type: Boolean,
    default: true,
  });

  s("benchmarkWarningsOnly", {
    name: "Benchmark Warnings Only",
    hint: "When enabled, benchmarks are advisory warnings. When disabled, benchmarks are hard blocks (not recommended).",
    type: Boolean,
    default: true,
  });

  s("sanityEnabled", {
    name: "Enable Sanity Points",
    hint: "Adds Sanity Points derived value for horror/occult genres.",
    type: Boolean,
    default: false,
  });

  s("socialCombatEnabled", {
    name: "Enable Social Combat",
    hint: "Adds Social Combat Value (SoCV) and Society Points.",
    type: Boolean,
    default: false,
  });

  s("trackMovement", {
    name: "Track Movement",
    hint: "Shows movement speed derived values on the character sheet.",
    type: Boolean,
    default: false,
  });

  s("allowStatsAbove12", {
    name: "Allow Stats Above 12",
    hint: "When enabled, stats above 12 cost 4 CP per point instead of 2 CP.",
    type: Boolean,
    default: false,
  });

  s("allowGeniusSkills", {
    name: "Allow Genius Skills",
    hint: "When enabled, skill rank cap lifts from 6 to the Genius Skill Max Rank.",
    type: Boolean,
    default: false,
  });

  s("geniusSkillMaxRank", {
    name: "Genius Skill Max Rank",
    hint: "Maximum rank for Genius Skills when enabled.",
    type: Number,
    default: 12,
  });

  s("genreTemplate", {
    name: "Genre Template",
    hint: "Active genre template. Affects skill costs and availability.",
    type: String,
    default: "universal",
  });

  s("initiativeMode", {
    name: "Initiative Mode",
    hint: "ACV + 2d6 rolls initiative with dice. CV Static uses ACV directly.",
    type: String,
    default: "cv_plus_2d6",
    choices: {
      cv_plus_2d6: "ACV + 2d6",
      cv_static: "CV (Static)",
    },
  });

  s("gearBudgetPerLevel", {
    name: "Gear Budget Per Level",
    hint: "Budget points granted per effective level of the Gear attribute.",
    type: Number,
    default: 5,
  });

  s("worldSkillOverrides", {
    name: "World Skill Overrides",
    hint: "GM overrides for skill costs and availability (Layer 3).",
    type: Object,
    default: {},
    config: false,
  });
}
