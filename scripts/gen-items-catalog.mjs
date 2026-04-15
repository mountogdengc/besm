import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const weaponsDir = path.join(__dirname, "..", "packs", "_source", "weapons");
const armourDir = path.join(__dirname, "..", "packs", "_source", "armour");
const itemsDir = path.join(__dirname, "..", "packs", "_source", "items");

function rid() {
  return Array.from({ length: 16 }, () =>
    "0123456789abcdef"[Math.floor(Math.random() * 16)]
  ).join("");
}

// Weapon: attribute with isWeapon + enhancements/limiters
function weapon(name, level, enhancements, limiters, desc, isMuscle = false) {
  const id = rid();
  const enhArr = enhancements.map(e => ({ id: rid(), name: e.name, levels: e.levels ?? 1 }));
  const limArr = limiters.map(l => ({ id: rid(), name: l.name, levels: l.levels ?? 1 }));
  return {
    _id: id, name, type: "attribute",
    system: {
      description: desc, source: "BESM4e",
      baseCostPerLevel: 2, purchasedLevel: level,
      isWeapon: true,
      weaponOptions: { damage: "", range: "", accurate: 0, spreading: false, isMuscleAttack: isMuscle },
      enhancements: enhArr, limiters: limArr,
      selectedOptions: [],
    },
    _key: `!items!${id}`,
  };
}

// Armour: attribute (Armour or Force Field) with enhancements/limiters
function armour(name, level, type, enhancements, limiters, desc) {
  const id = rid();
  const enhArr = enhancements.map(e => ({ id: rid(), name: e.name, levels: e.levels ?? 1 }));
  const limArr = limiters.map(l => ({ id: rid(), name: l.name, levels: l.levels ?? 1 }));
  return {
    _id: id, name, type: "attribute",
    system: {
      description: desc, source: "BESM4e",
      baseCostPerLevel: type === "Force Field" ? 4 : 2,
      purchasedLevel: level,
      isWeapon: false,
      enhancements: enhArr, limiters: limArr,
      selectedOptions: [type],
    },
    _key: `!items!${id}`,
  };
}

// Item template (besm4eTemplate with entries)
function itemTemplate(name, entries, desc) {
  const id = rid();
  return {
    _id: id, name, type: "besm4eTemplate",
    system: {
      templateType: "bundle", tradition: "", description: desc,
      pointTotal: 0, sizeRank: null,
      statModifiers: { body: 0, mind: 0, soul: 0 },
      entries,
    },
    _key: `!items!${id}`,
  };
}

function attrEntry(name, cost, level) {
  return { entryType: "item", name, itemType: "attribute", systemData: { baseCostPerLevel: cost, purchasedLevel: level } };
}
function defectEntry(name, rank, cp) {
  return { entryType: "item", name, itemType: "defect", systemData: { rankLevel: rank, cpGranted: cp } };
}

function writeJson(dir, name, doc) {
  const fname = name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_+$/, "") + ".json";
  fs.writeFileSync(path.join(dir, fname), JSON.stringify(doc, null, 2) + "\n");
  return fname;
}

let count = 0;

// ===================== WEAPONS =====================

const weapons = [
  // Splash
  weapon("Blisterpod", 4, [{name:"Area"},{name:"Contact"},{name:"Continuing",levels:2},{name:"Range",levels:2}], [{name:"Ammo",levels:4},{name:"Inaccurate"}], "A living biological grenade that sprays caustic spores on impact."),
  weapon("Flashfire Flask", 3, [{name:"Area"},{name:"Continuing",levels:2},{name:"Range",levels:2}], [{name:"Activation"},{name:"Ammo",levels:4},{name:"Inaccurate"}], "A thin-walled ceramic sphere filled with volatile alchemical accelerant."),
  weapon("Stinkpot", 1, [{name:"Area",levels:2},{name:"Irritant",levels:2},{name:"Range",levels:2}], [{name:"Ammo",levels:4},{name:"Toxic"}], "A sealed clay jar packed with sulfur and rotting organic matter."),
  // Archaic Melee
  weapon("Boarding Hook", 2, [{name:"Tangle"}], [], "A heavy iron hook for ship-to-ship combat.", true),
  weapon("Claw Gauntlet", 2, [{name:"Potent"}], [{name:"Non-Penetrating"}], "Reinforced leather glove with steel talons.", true),
  weapon("Crescent Glaive", 3, [{name:"Flexible"}], [{name:"Hands"}], "A polearm with a broad moon-shaped blade.", true),
  weapon("Falx", 3, [{name:"Penetrating"}], [{name:"Inaccurate"}], "A curved sword designed to reach around shields.", true),
  weapon("Ironwood Tonfa", 2, [{name:"Stun"}], [{name:"Non-Penetrating"}], "A hardwood baton of alchemically treated ironwood.", true),
  weapon("Jawbone Club", 2, [], [{name:"Unreliable"}], "A primitive weapon fashioned from a large beast mandible.", true),
  weapon("Sickle Chain", 2, [{name:"Flexible"},{name:"Range"}], [{name:"Backlash"},{name:"Inaccurate"}], "A farming sickle attached to a weighted chain.", true),
  weapon("War Pick", 3, [{name:"Penetrating"}], [{name:"Inaccurate"}], "A one-handed weapon designed to punch through plate armor.", true),
  // Archaic Ranged
  weapon("Atlatl", 2, [{name:"Range",levels:2}], [{name:"Ammo",levels:3},{name:"Inaccurate"}], "A grooved shaft used to hurl darts with greater force."),
  weapon("Chakram", 1, [{name:"Potent"},{name:"Range",levels:2}], [{name:"Ammo",levels:3}], "A flat metal ring with a sharpened outer edge, thrown spinning."),
  weapon("Harpoon", 3, [{name:"Range"},{name:"Tangle"}], [{name:"Ammo",levels:3},{name:"Hands"}], "A barbed spear attached to rope, designed to lodge in targets."),
  weapon("Javelin Bundle", 2, [{name:"Range",levels:2}], [{name:"Ammo",levels:2}], "A set of light throwing spears."),
  weapon("Pellet Bow", 2, [{name:"Range",levels:2}], [{name:"Hands"},{name:"Non-Penetrating"}], "A short bow launching clay or stone pellets."),
  weapon("Staff Sling", 3, [{name:"Muscle"},{name:"Range",levels:3}], [{name:"Hands"},{name:"Inaccurate"}], "A sling on a long staff for greater leverage and range."),
  // Archaic Siege
  weapon("Scorpion", 6, [{name:"Range",levels:3}], [{name:"Activation",levels:2},{name:"Hands"},{name:"Inaccurate"}], "A smaller crew-served bolt thrower."),
  weapon("Trebuchet", 18, [{name:"Area",levels:3},{name:"Indirect"},{name:"Range",levels:5}], [{name:"Activation",levels:3},{name:"Assisted",levels:3},{name:"Hands"},{name:"Inaccurate",levels:2}], "A counterweight siege engine hurling massive stones."),
  // Modern Melee
  weapon("Collapsible Baton", 2, [{name:"Stun"}], [{name:"Non-Penetrating"}], "A telescoping steel baton.", true),
  weapon("Electrified Knuckles", 2, [{name:"Incapacitating",levels:2}], [{name:"Ammo"}], "Brass knuckles wired to a small battery pack.", true),
  weapon("Razor Wire Gloves", 3, [{name:"Penetrating"}], [{name:"Unreliable"}], "Tactical gloves with monofilament wire.", true),
  weapon("Riot Fork", 1, [{name:"Reach"},{name:"Tangle"}], [{name:"Non-Penetrating"},{name:"Hands"}], "A two-pronged restraining tool on a long shaft.", true),
  // Modern Ranged
  weapon("Bean Bag Launcher", 4, [{name:"Range",levels:2},{name:"Stun"}], [{name:"Ammo",levels:2},{name:"Hands"},{name:"Non-Penetrating"}], "A modified shotgun firing fabric pouches."),
  weapon("Compact PDW", 7, [{name:"Autofire",levels:2},{name:"Penetrating"},{name:"Range",levels:3}], [{name:"Ammo"},{name:"Inaccurate"}], "A personal defense weapon firing high-velocity rounds."),
  weapon("Designated Marksman Rifle", 8, [{name:"Accurate"},{name:"Range",levels:4}], [{name:"Hands"}], "A semi-automatic rifle with magnified optics."),
  weapon("Door Breacher", 4, [{name:"Penetrating",levels:2},{name:"Range"}], [{name:"Ammo",levels:2},{name:"Hands"},{name:"Inaccurate"},{name:"Short Range"}], "A short-barreled shotgun for destroying locks and hinges."),
  weapon("Grenade, Flashpowder", 1, [{name:"Flare",levels:2},{name:"Range",levels:2}], [{name:"Ammo",levels:4},{name:"Inaccurate"}], "A hand-thrown device detonating in a blinding white flash."),
  weapon("Grenade, Incendiary", 5, [{name:"Area"},{name:"Continuing",levels:4},{name:"Range",levels:2}], [{name:"Ammo",levels:4},{name:"Inaccurate"}], "A thermite-based grenade that burns at extreme temperatures."),
  weapon("Net Gun", 1, [{name:"Range"},{name:"Tangle",levels:3}], [{name:"Ammo",levels:2},{name:"Non-Penetrating"}], "A compressed-air launcher firing a weighted net."),
  weapon("Pistol, Holdout", 4, [{name:"Range",levels:2}], [{name:"Ammo",levels:2},{name:"Inaccurate"}], "A tiny concealed sidearm."),
  // Modern Ordnance
  weapon("Mortar, Light", 10, [{name:"Area"},{name:"Indirect"},{name:"Range",levels:4}], [{name:"Activation",levels:2},{name:"Assisted"},{name:"Ammo",levels:2},{name:"Hands"},{name:"Inaccurate"}], "A portable indirect-fire tube weapon."),
  weapon("Thermobaric Launcher", 14, [{name:"Area",levels:3},{name:"Penetrating",levels:2},{name:"Range",levels:3}], [{name:"Activation"},{name:"Backblast"},{name:"Ammo",levels:3},{name:"Hands"},{name:"Inaccurate"}], "A shoulder-fired fuel-air explosive weapon."),
  // Futuristic Melee
  weapon("Disruption Gauntlet", 6, [{name:"Insidious",levels:2},{name:"Penetrating",levels:2}], [{name:"Ammo"}], "A powered glove generating a molecular destabilization field.", true),
  weapon("Phase Blade", 8, [{name:"Insidious",levels:2},{name:"Penetrating",levels:3}], [], "A hilt projecting a blade of phased matter.", true),
  weapon("Plasma Lash", 7, [{name:"Continuing"},{name:"Flexible",levels:2},{name:"Penetrating",levels:2}], [{name:"Backlash"}], "A flexible whip channeling superheated plasma.", true),
  weapon("Sonic Maul", 6, [{name:"Penetrating",levels:2}], [{name:"Hands"}], "A heavy two-handed weapon with a vibration generator.", true),
  // Futuristic Ranged
  weapon("Coilgun Rifle", 9, [{name:"Accurate"},{name:"Penetrating",levels:2},{name:"Range",levels:4}], [{name:"Activation"},{name:"Hands"}], "A magnetically accelerated projectile weapon."),
  weapon("Disintegrator Pistol", 10, [{name:"Insidious",levels:2},{name:"Range",levels:3}], [{name:"Ammo"}], "A compact beam that breaks molecular bonds."),
  weapon("Graviton Cannon", 18, [{name:"Area",levels:2},{name:"Insidious",levels:2},{name:"Penetrating",levels:3},{name:"Range",levels:4}], [{name:"Activation",levels:2},{name:"Assisted"},{name:"Hands"}], "A crew-served weapon projecting focused gravitational pulses."),
  weapon("Needle Rifle", 8, [{name:"Accurate",levels:2},{name:"Homing"},{name:"Range",levels:4}], [{name:"Ammo",levels:2},{name:"Hands"}], "A precision weapon firing magnetically guided flechettes."),
  weapon("Plasma Caster", 12, [{name:"Area",levels:2},{name:"Continuing",levels:2},{name:"Indirect"},{name:"Range",levels:3}], [{name:"Ammo"},{name:"Hands"},{name:"Inaccurate"}], "A shoulder-mounted weapon lobbing superheated plasma."),
  weapon("Pulse Pistol", 7, [{name:"Autofire",levels:2},{name:"Range",levels:3}], [{name:"Ammo"}], "A standard-issue sidearm firing rapid electromagnetic bursts."),
];

for (const w of weapons) {
  const fname = writeJson(weaponsDir, w.name, w);
  console.log(`Weapon: ${fname}`);
  count++;
}

// ===================== ARMOUR =====================

const armours = [
  // Animal
  armour("Light Chitin", 1, "Armour", [], [], "Hard segmented plates found on insectoid creatures."),
  armour("Heavy Chitin", 3, "Armour", [], [], "Thick chitin plates from large insectoid creatures."),
  armour("Thin Stone Skin", 2, "Armour", [], [], "Minerite growth pattern found in earth-aligned creatures."),
  armour("Thick Stone Skin", 5, "Armour", [], [], "Dense mineral skin providing excellent defense."),
  // Archaic
  armour("Bone Armour", 1, "Armour", [], [{name:"Localised"}], "Plates of beast bone lashed together with sinew."),
  armour("Gambeson", 1, "Armour", [], [{name:"Localised"}], "A quilted jacket of layered linen or wool."),
  armour("Lacquered Plate", 4, "Armour", [], [], "Interlocking lacquered steel plates allowing freedom of movement."),
  armour("Lamellar", 3, "Armour", [], [], "Small rectangular plates laced together in horizontal rows."),
  armour("Shell Plate", 3, "Armour", [], [], "Armor crafted from the carapace of giant creatures."),
  // Modern
  armour("Ballistic Vest, Concealed", 2, "Armour", [], [{name:"Localised"}], "A thin flexible vest stopping handgun rounds."),
  armour("Bomb Suit", 8, "Armour", [], [], "A massive padded suit for explosive ordnance disposal."),
  armour("Stab Vest", 3, "Armour", [], [{name:"Localised"}], "A vest reinforced with chainmail for edged weapons."),
  // Futuristic
  armour("Adaptive Nanoweave", 5, "Armour", [], [], "A bodysuit of programmable nanomaterials that harden on impact."),
  armour("Ablative Shell", 8, "Armour", [{name:"Localised"},{name:"Unique"}], [], "Disposable layered armor absorbing energy weapon hits."),
  armour("Gravity Cocoon", 4, "Force Field", [{name:"Regenerating"}], [], "A personal gravitational membrane slowing incoming attacks."),
  armour("Hardlight Carapace", 5, "Force Field", [{name:"Regenerating"}], [], "Projected solid-light panels forming weightless armor."),
  // Shields
  armour("Iron Buckler", 2, "Armour", [], [{name:"Localised"}], "A small round shield strapped to the forearm."),
  armour("Kite Shield", 3, "Armour", [], [], "A tall tapered shield covering shoulder to knee."),
  armour("Pavise", 5, "Armour", [{name:"Potent"}], [], "A freestanding tall shield providing cover."),
  armour("Riot Shield, Ballistic", 7, "Armour", [{name:"Potent",levels:2}], [], "A transparent polycarbonate shield with ballistic panels."),
  armour("Barrier Projector", 5, "Force Field", [{name:"Regenerating"}], [], "A wrist-mounted device generating a disc of hard energy."),
];

for (const a of armours) {
  const fname = writeJson(armourDir, a.name, a);
  console.log(`Armour: ${fname}`);
  count++;
}

// ===================== ITEMS =====================

const items = [
  // Protective Devices
  itemTemplate("Rebreather Mask", [attrEntry("Resilient", 2, 1)],
    "A compact filtration mask that scrubs airborne toxins."),
  itemTemplate("Thermal Liner", [attrEntry("Resilient", 2, 2)],
    "A thin undersuit regulating body temperature in extreme environments."),
  itemTemplate("Blast Visor", [attrEntry("Resilient", 2, 1), defectEntry("Sensory Impairment", 1, 3)],
    "A reinforced face shield protecting against flash-bang effects."),
  itemTemplate("Radiation Badge", [attrEntry("Resilient", 2, 1), attrEntry("Features", 1, 1)],
    "A wearable dosimeter providing modest radiation protection."),
  itemTemplate("Void Suit", [attrEntry("Armour", 2, 1), attrEntry("Features", 1, 2), attrEntry("Flight", 3, 1), attrEntry("Resilient", 2, 7), defectEntry("Impaired Manipulation", 1, 3)],
    "A lightweight sealed suit for short-duration extravehicular activity."),
  // Adventuring Gear
  itemTemplate("Climber's Kit", [attrEntry("Features", 1, 2)],
    "Pitons, carabiners, harness, and rope for scaling cliff faces."),
  itemTemplate("Healer's Satchel", [attrEntry("Features", 1, 2)],
    "Bandages, herbal poultices, splinting materials, and surgical tools."),
  itemTemplate("Lockbreaker's Roll", [attrEntry("Features", 1, 2)],
    "Picks, tension wrenches, shims, and a small pry bar."),
  itemTemplate("Navigator's Instruments", [attrEntry("Features", 1, 2)],
    "Sextant, compass, star charts, and logbook."),
  itemTemplate("Portable Alchemy Lab", [attrEntry("Features", 1, 3)],
    "Glass vials, burner, mortar and pestle, and common reagents."),
  itemTemplate("Scout's Spyglass", [attrEntry("Features", 1, 1)],
    "A collapsible brass telescope magnifying distant objects."),
  itemTemplate("Survival Toolkit", [attrEntry("Features", 1, 2)],
    "Fire-starting kit, water purification, emergency shelter, and multi-tool."),
  itemTemplate("Tech Diagnostic Scanner", [attrEntry("Features", 1, 2), attrEntry("Supersense", 1, 1)],
    "A handheld device analyzing electronic systems and identifying faults."),
  // Vehicles
  itemTemplate("Armored Transport", [attrEntry("Armour", 2, 8), attrEntry("Capacity", 1, 5), attrEntry("Features", 1, 2), attrEntry("Ground Speed", 1, 2), attrEntry("Tough", 1, 1), attrEntry("Weapon", 2, 12), defectEntry("Awkward Size", 3, 6), defectEntry("Special Requirement", 1, 3)],
    "A six-wheeled enclosed vehicle for moving personnel through hostile territory."),
  itemTemplate("Interceptor Shuttle", [attrEntry("Armour", 2, 8), attrEntry("Capacity", 1, 1), attrEntry("Features", 1, 2), attrEntry("Flight", 3, 5), attrEntry("Resilient", 2, 7), attrEntry("Sensory Block", 1, 2), attrEntry("Spaceflight", 1, 4), attrEntry("Supersense", 1, 3), attrEntry("Weapon", 2, 18), defectEntry("Awkward Size", 3, 6), defectEntry("Special Requirement", 1, 3), defectEntry("Special Requirement", 1, 3)],
    "A fast, lightly armed spacecraft for pursuit and patrol."),
  itemTemplate("Skiff, River", [attrEntry("Armour", 2, 1), attrEntry("Capacity", 1, 3), attrEntry("Water Speed", 1, 1), defectEntry("Awkward Size", 1, 2)],
    "A flat-bottomed wooden boat propelled by oars or a pole."),
  itemTemplate("War Chariot", [attrEntry("Armour", 2, 2), attrEntry("Capacity", 1, 1), attrEntry("Ground Speed", 1, 2), defectEntry("Awkward Size", 1, 2)],
    "A two-wheeled vehicle pulled by a team of horses."),
  // Items of Power
  itemTemplate("Aetheric Compass", [attrEntry("Sixth Sense", 1, 1), attrEntry("Supersense", 1, 1), defectEntry("Unique Defect", 1, 1)],
    "A palm-sized instrument pointing toward the nearest supernatural energy concentration."),
  itemTemplate("Bondseal Ring", [attrEntry("Sixth Sense", 1, 1), attrEntry("Supersense", 1, 1), attrEntry("Features", 1, 1), defectEntry("Cursed", 1, 1)],
    "Matched rings allowing wearers to sense each other's emotional state and direction."),
  itemTemplate("Devouring Blade", [attrEntry("Weapon", 2, 4), attrEntry("Regeneration", 5, 1), defectEntry("Cursed", 2, 2)],
    "A black iron sword that drinks the life force of those it wounds."),
  itemTemplate("Mirror of Elsewhere", [attrEntry("Supersense", 1, 3), defectEntry("Unique Defect", 1, 1)],
    "A silver hand mirror showing views of previously visited locations."),
  itemTemplate("Stormcaller Drum", [attrEntry("Weapon", 2, 3), attrEntry("Sensory Block", 1, 2), defectEntry("Unique Defect", 1, 1)],
    "A hide-stretched drum that summons localized weather effects."),
  itemTemplate("Voidstone Amulet", [attrEntry("Undetectable", 2, 2), attrEntry("Mind Shield", 1, 1), defectEntry("Marked", 1, 1), defectEntry("Unique Defect", 1, 1)],
    "A pendant rendering the wearer invisible to scrying and divination."),
];

for (const item of items) {
  const fname = writeJson(itemsDir, item.name, item);
  console.log(`Item: ${fname}`);
  count++;
}

console.log(`\nDone! Generated ${count} total entries.`);
