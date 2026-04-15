import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raceDir = path.join(__dirname, "..", "packs", "_source", "race-templates");
const classDir = path.join(__dirname, "..", "packs", "_source", "class-templates");

function rid() {
  return Array.from({ length: 16 }, () =>
    "0123456789abcdef"[Math.floor(Math.random() * 16)]
  ).join("");
}

function attr(name, cost, level) {
  return { entryType: "item", name, itemType: "attribute", systemData: { baseCostPerLevel: cost, purchasedLevel: level } };
}
function defect(name, rank, cp) {
  return { entryType: "item", name, itemType: "defect", systemData: { rankLevel: rank, cpGranted: cp } };
}

function writeTemplate(dir, name, type, statMods, entries, description) {
  const id = rid();
  const doc = {
    _id: id,
    name,
    type: "besm4eTemplate",
    system: {
      templateType: type,
      tradition: "",
      description: description || "",
      pointTotal: 0,
      sizeRank: null,
      statModifiers: { body: statMods.body ?? 0, mind: statMods.mind ?? 0, soul: statMods.soul ?? 0 },
      entries,
    },
    _key: `!items!${id}`,
  };
  const fname = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_+$/, "") + ".json";
  fs.writeFileSync(path.join(dir, fname), JSON.stringify(doc, null, 2) + "\n");
  console.log(`Wrote ${fname}`);
}

// ==================== RACE TEMPLATES ====================

writeTemplate(raceDir, "Elf", "race",
  { body: 4, mind: 6, soul: 7 },
  [
    attr("Heightened Awareness", 1, 2),
    attr("Features", 1, 1), // Longevity
    attr("Features", 1, 1), // Attractive
    attr("Sixth Sense", 1, 1),
    attr("Special Movement", 1, 1),
    defect("Marked", 1, 1),
    defect("Bane", 2, 2),
    defect("Easily Distracted", 1, 1),
  ],
  "A long-lived fae-blooded humanoid with sharp senses, natural grace, and an innate connection to magical energy."
);

writeTemplate(raceDir, "Android", "race",
  { body: 6, mind: 7, soul: 4 },
  [
    attr("Armour", 2, 1),
    attr("Heightened Awareness", 1, 1),
    attr("Features", 1, 1), // Eidetic Memory
    attr("Features", 1, 1), // Internal Clock
    attr("Tough", 1, 1),
    defect("Marked", 1, 1),
    defect("Bane", 2, 2),
    defect("Unique Defect", 1, 1), // Maintenance
  ],
  "A synthetic humanoid with a positronic neural network. Physically resilient and intellectually precise, but emotionally limited."
);

writeTemplate(raceDir, "Enhanced Human", "race",
  { body: 6, mind: 6, soul: 5 },
  [
    attr("Tough", 1, 1),
    attr("Heightened Awareness", 1, 1),
    attr("Features", 1, 1), // Pain Tolerance
    defect("Unique Defect", 2, 2), // Owned
    defect("Bane", 1, 1),
    defect("Unique Defect", 1, 1), // Degradation
  ],
  "A human who has undergone genetic therapy or neural augmentation. Faster, sharper, and more durable than baseline."
);

writeTemplate(raceDir, "Xeno (Diplomat Caste)", "race",
  { body: 4, mind: 6, soul: 7 },
  [
    attr("Mind Control", 5, 1),
    attr("Features", 1, 1), // Chromatophore Skin
    attr("Features", 1, 1), // Amphibious
    attr("Heightened Awareness", 1, 1),
    defect("Marked", 2, 2),
    defect("Bane", 1, 1),
    defect("Easily Distracted", 1, 1),
  ],
  "An alien species biologically adapted for social manipulation with chromatophore skin and pheromone glands."
);

writeTemplate(raceDir, "Human (Baseline)", "race",
  { body: 5, mind: 5, soul: 6 },
  [
    attr("Features", 1, 1), // Photogenic
    attr("Features", 1, 1), // Well-Connected Family
    attr("Heightened Awareness", 1, 1),
    defect("Unique Defect", 1, 1), // Mundane
  ],
  "An ordinary person. No special powers, no augmentation — just the full range of human potential."
);

writeTemplate(raceDir, "Reincarnated Soul", "race",
  { body: 5, mind: 6, soul: 6 },
  [
    attr("Features", 1, 1), // Past-Life Memories
    attr("Features", 1, 1), // Dual Cultural Fluency
    attr("Sixth Sense", 1, 1),
    attr("Heightened Awareness", 1, 1),
    defect("Marked", 1, 1),
    defect("Easily Distracted", 1, 1),
    defect("Unique Defect", 1, 1), // Existential Dread
  ],
  "A person from modern Earth who died and was reborn in another world, retaining memories and a fragment of otherworldly power."
);

writeTemplate(raceDir, "Cyborg", "race",
  { body: 7, mind: 5, soul: 4 },
  [
    attr("Armour", 2, 1),
    attr("Superstrength", 4, 1),
    attr("Tough", 1, 1),
    attr("Features", 1, 1), // Cybernetic Arm
    attr("Features", 1, 1), // Internal Commlink
    attr("Heightened Awareness", 1, 1),
    attr("Jumping", 1, 1),
    defect("Bane", 2, 2),
    defect("Marked", 1, 1),
    defect("Unique Defect", 2, 2), // Humanity Erosion
    defect("Unique Defect", 1, 1), // Maintenance
  ],
  "A human whose body has been significantly replaced with cybernetic hardware. Stronger and more resilient but dependent on maintenance."
);

writeTemplate(raceDir, "Demigod", "race",
  { body: 7, mind: 5, soul: 6 },
  [
    attr("Superstrength", 4, 1),
    attr("Tough", 1, 1),
    attr("Features", 1, 1), // Divine Heritage
    attr("Sixth Sense", 1, 1),
    defect("Nemesis", 2, 2),
    defect("Easily Distracted", 1, 1),
    defect("Marked", 1, 1),
    defect("Unique Defect", 1, 1), // Mortal Lifespan
  ],
  "The mortal child of a god and a human. Blessed with a fragment of divine power, but cursed to live a mortal lifespan."
);

writeTemplate(raceDir, "Mutant", "race",
  { body: 6, mind: 4, soul: 5 },
  [
    attr("Armour", 2, 1),
    attr("Heightened Awareness", 1, 1),
    attr("Regeneration", 5, 1),
    attr("Features", 1, 1), // Bioluminescence
    defect("Marked", 2, 2),
    defect("Bane", 1, 1),
    defect("Easily Distracted", 1, 1),
    defect("Unique Defect", 1, 1), // Unstable Genome
  ],
  "A human whose genome was rewritten by radiation or bioweapons. Strange abilities but marked as something other than baseline."
);

writeTemplate(raceDir, "Dhampir", "race",
  { body: 6, mind: 5, soul: 6 },
  [
    attr("Heightened Awareness", 1, 2),
    attr("Regeneration", 5, 1),
    attr("Features", 1, 1), // Ageless Appearance
    attr("Special Movement", 1, 1), // Wall-Crawling
    defect("Bane", 2, 2), // Sunlight
    defect("Bane", 1, 1), // Holy Symbols
    defect("Unique Defect", 2, 2), // The Hunger
    defect("Marked", 1, 1),
  ],
  "Half-vampire, half-mortal. Cursed with the hunger but blessed with the power. Exists between the living and the undead."
);

// ==================== CLASS TEMPLATES ====================

writeTemplate(classDir, "Battle Mage", "class",
  { body: 5, mind: 6, soul: 5 },
  [
    attr("Attack Mastery", 1, 1),
    attr("Defence Mastery", 1, 1),
    attr("Weapon", 2, 2),
    attr("Armour", 2, 1),
    defect("Easily Distracted", 1, 1),
    defect("Unique Defect", 2, 2), // Energy Drain
    defect("Unique Defect", 1, 1), // Somatic Components
  ],
  "A warrior-scholar who channels destructive magic through melee combat. Equally dangerous with a blade or a bolt of elemental force."
);

writeTemplate(classDir, "Starship Pilot", "class",
  { body: 5, mind: 6, soul: 5 },
  [
    attr("Heightened Awareness", 1, 1),
    attr("Attack Mastery", 1, 1),
    attr("Defence Mastery", 1, 1),
    attr("Features", 1, 1), // Ambidextrous
    defect("Easily Distracted", 1, 1),
    defect("Unique Defect", 1, 1), // Cockpit Dependency
  ],
  "A hotshot who lives in the cockpit. Quick reflexes, strong spatial awareness, and enough mechanical know-how to keep a ship flying."
);

writeTemplate(classDir, "Mecha Pilot", "class",
  { body: 5, mind: 6, soul: 5 },
  [
    attr("Attack Mastery", 1, 1),
    attr("Defence Mastery", 1, 1),
    defect("Unique Defect", 2, 2), // Mecha Dependent
    defect("Nemesis", 1, 1),
  ],
  "A trained operator of a humanoid combat vehicle. Inside the mecha, they are a force multiplier."
);

writeTemplate(classDir, "Smuggler", "class",
  { body: 5, mind: 5, soul: 6 },
  [
    attr("Weapon", 2, 1),
    attr("Attack Mastery", 1, 1),
    attr("Features", 1, 2), // Contacts Network
    attr("Heightened Awareness", 1, 1),
    defect("Skeleton in the Closet", 2, 2),
    defect("Wanted", 2, 2),
    defect("Easily Distracted", 1, 1),
  ],
  "A fast-talking, quick-moving operator who works the margins of galactic law. Equal parts pilot, con artist, and gunslinger."
);

writeTemplate(classDir, "Transfer Student", "class",
  { body: 5, mind: 6, soul: 6 },
  [
    attr("Heightened Awareness", 1, 1),
    attr("Features", 1, 1), // Hidden Talent
    attr("Features", 1, 1), // Mysterious Past
    defect("Easily Distracted", 1, 1),
    defect("Unique Defect", 2, 2), // Outsider
    defect("Skeleton in the Closet", 1, 1),
  ],
  "The new kid. Just arrived and navigating unfamiliar social dynamics. A classic Slice of Life protagonist — fish out of water with hidden depth."
);

writeTemplate(classDir, "Overpowered Hero", "class",
  { body: 6, mind: 5, soul: 6 },
  [
    attr("Superstrength", 4, 1),
    attr("Tough", 1, 2),
    attr("Attack Mastery", 1, 2),
    attr("Defence Mastery", 1, 1),
    attr("Regeneration", 5, 1),
    defect("Wanted", 2, 2),
    defect("Unique Defect", 2, 2), // Power Surges
    defect("Easily Distracted", 1, 1),
    defect("Unique Defect", 1, 1), // Energy Drain
  ],
  "Blessed by whatever force brought them to this world with abilities far beyond the norm. The raw power is real."
);

writeTemplate(classDir, "Netrunner", "class",
  { body: 4, mind: 7, soul: 5 },
  [
    attr("Heightened Awareness", 1, 1),
    attr("Features", 1, 1), // Online Reputation
    attr("Mind Shield", 1, 1),
    defect("Unique Defect", 1, 1), // Sedentary
    defect("Easily Distracted", 1, 1),
    defect("Wanted", 2, 2),
    defect("Unique Defect", 1, 1), // Jack-In Vulnerability
  ],
  "A hacker who jacks into virtual networks to steal data and fight ICE programs. Devastating in the digital domain."
);

writeTemplate(classDir, "Ronin", "class",
  { body: 6, mind: 5, soul: 6 },
  [
    attr("Weapon", 2, 2),
    attr("Attack Mastery", 1, 2),
    attr("Defence Mastery", 1, 1),
    attr("Heightened Awareness", 1, 1),
    defect("Skeleton in the Closet", 2, 2),
    defect("Unique Defect", 2, 2), // Code of Honor
    defect("Nemesis", 1, 1),
  ],
  "A masterless warrior bound by a personal code. Wandering, lethal, and burdened by the past."
);

writeTemplate(classDir, "Scavenger", "class",
  { body: 5, mind: 6, soul: 5 },
  [
    attr("Weapon", 2, 1),
    attr("Heightened Awareness", 1, 2),
    attr("Features", 1, 1), // Stash Locations
    attr("Features", 1, 1), // Trade Contacts
    defect("Easily Distracted", 1, 1),
    defect("Skeleton in the Closet", 1, 1),
    defect("Wanted", 1, 1),
  ],
  "A ruin-crawler who survives by salvaging pre-collapse technology. Part archaeologist, part merchant, part trap-dodger."
);

writeTemplate(classDir, "Occult Investigator", "class",
  { body: 5, mind: 7, soul: 6 },
  [
    attr("Weapon", 2, 1),
    attr("Heightened Awareness", 1, 2),
    attr("Sixth Sense", 1, 1),
    attr("Mind Shield", 1, 1),
    defect("Skeleton in the Closet", 2, 2),
    defect("Easily Distracted", 1, 1),
    defect("Nemesis", 2, 2),
  ],
  "A mortal who hunts what lurks in the dark — not with raw power, but with knowledge, preparation, and nerve."
);

console.log("\nDone! Generated 10 race templates and 10 class templates.");
