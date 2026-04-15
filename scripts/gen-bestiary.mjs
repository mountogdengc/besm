import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "packs", "_source", "bestiary");

function rid() {
  return Array.from({ length: 16 }, () =>
    "0123456789abcdef"[Math.floor(Math.random() * 16)]
  ).join("");
}

function npc(name, stats, attrs, defects, desc) {
  const id = rid();
  // Build items array
  const items = [];
  for (const a of attrs) {
    const iid = rid();
    items.push({
      _id: iid, name: a.name, type: "attribute",
      system: {
        baseCostPerLevel: a.cost ?? 1, purchasedLevel: a.level ?? 1,
        isWeapon: a.isWeapon ?? false,
        weaponOptions: { damage: "", range: "", accurate: 0, spreading: false, isMuscleAttack: a.isMuscle ?? false },
        enhancements: (a.enh ?? []).map(e => ({ id: rid(), name: e.name, levels: e.levels ?? 1 })),
        limiters: (a.lim ?? []).map(l => ({ id: rid(), name: l.name, levels: l.levels ?? 1 })),
        selectedOptions: a.options ?? [],
      },
      _key: `!items!${iid}`,
    });
  }
  for (const d of defects) {
    const iid = rid();
    items.push({
      _id: iid, name: d.name, type: "defect",
      system: { rankLevel: d.rank ?? 1, cpGranted: d.cp ?? d.rank ?? 1 },
      _key: `!items!${iid}`,
    });
  }

  return {
    _id: id, name, type: "npc",
    system: {
      biography: `<p>${desc}</p>`,
      genre: "",
      powerLevel: "",
      cpBase: 0,
      stats: {
        body: { value: stats.body ?? 4, mode: "normal" },
        mind: { value: stats.mind ?? 4, mode: "normal" },
        soul: { value: stats.soul ?? 4, mode: "normal" },
      },
      derived: { currentHp: 0, currentEp: 0, currentSanity: 0, currentSocietyPoints: 0 },
      notes: "",
    },
    items,
    _key: `!actors!${id}`,
  };
}

function a(name, cost, level, opts) { return { name, cost, level, ...opts }; }
function w(name, cost, level, opts) { return { name, cost, level, isWeapon: true, ...opts }; }
function d(name, rank, cp) { return { name, rank, cp: cp ?? rank }; }

function writeJson(doc) {
  const fname = doc.name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_+$/, "") + ".json";
  fs.writeFileSync(path.join(dir, fname), JSON.stringify(doc, null, 2) + "\n");
  console.log(fname);
}

const npcs = [
  // Fantasy
  npc("Town Guard", { body: 5, mind: 4, soul: 4 }, [
    w("Spear", 2, 2, { isMuscle: true }),
    a("Armour", 2, 1, { lim: [{ name: "Localised" }] }),
    a("Armour", 2, 3, { options: ["Kite Shield"] }),
    a("Features", 1, 1, { options: ["Badge of Office"] }),
  ], [d("Owned", 1)],
  "Rank-and-file soldier posted at gates and on walls. Competent enough to deter petty criminals. Deploy in groups of 3-5."),

  npc("Forest Troll", { body: 9, mind: 3, soul: 4 }, [
    a("Superstrength", 4, 2),
    w("Natural Weapons", 1, 1, { isMuscle: true, options: ["Claws"] }),
    a("Armour", 2, 2),
    a("Regeneration", 5, 2),
    a("Tough", 1, 2),
    a("Heightened Awareness", 1, 1),
    a("Features", 1, 1, { options: ["Darkvision"] }),
    a("Jumping", 1, 1),
  ], [d("Bane", 2), d("Bane", 1), d("Easily Distracted", 1), d("Awkward Size", 2), d("Unique Defect", 1)],
  "A hulking territorial predator that regenerates from most wounds. Fire is the traditional answer."),

  // Sci-Fi
  npc("Station Security Bot", { body: 6, mind: 4, soul: 2 }, [
    a("Armour", 2, 1),
    w("Pulse Pistol", 2, 7, { enh: [{ name: "Autofire", levels: 2 }, { name: "Range", levels: 3 }], lim: [{ name: "Ammo" }] }),
    a("Heightened Awareness", 1, 2),
    a("Features", 1, 1, { options: ["Networked"] }),
  ], [d("Bane", 2), d("Unique Defect", 1), d("Unique Defect", 1)],
  "An autonomous security drone. Tireless and networked to central security AI. Deploy in pairs or squads of 4."),

  npc("Alien Merchant", { body: 4, mind: 6, soul: 7 }, [
    w("Disintegrator Pistol", 2, 10, { enh: [{ name: "Insidious", levels: 2 }, { name: "Range", levels: 3 }], lim: [{ name: "Ammo" }] }),
    a("Features", 1, 2, { options: ["Trade Contacts"] }),
    a("Features", 1, 1, { options: ["Chromatophore Skin"] }),
    a("Heightened Awareness", 1, 1),
    a("Mind Control", 5, 1, { options: ["Pheromone Suggestion"] }),
  ], [d("Marked", 1), d("Easily Distracted", 1), d("Skeleton in the Closet", 1)],
  "A traveling trader from a non-human species. Socially shrewd and difficult to cheat. Social encounter."),

  // Mecha
  npc("Conscript Pilot", { body: 5, mind: 4, soul: 4 }, [
    a("Features", 1, 1, { options: ["Neural Helmet"] }),
  ], [d("Owned", 1), d("Easily Distracted", 1)],
  "A barely trained recruit in a mass-produced combat frame. The mecha is the real threat — assign a 40-60 CP mecha separately."),

  npc("Rogue Combat AI", { body: 8, mind: 7, soul: 3 }, [
    a("Armour", 2, 5),
    w("Coilgun Rifle", 2, 9, { enh: [{ name: "Accurate" }, { name: "Penetrating", levels: 2 }, { name: "Range", levels: 4 }], lim: [{ name: "Activation" }, { name: "Hands" }] }),
    w("Disruption Gauntlet", 2, 6, { isMuscle: true, enh: [{ name: "Insidious", levels: 2 }, { name: "Penetrating", levels: 2 }], lim: [{ name: "Ammo" }] }),
    a("Attack Mastery", 1, 3),
    a("Defence Mastery", 1, 2),
    a("Tough", 1, 2),
    a("Regeneration", 5, 1),
    a("Ground Speed", 1, 2),
    a("Heightened Awareness", 1, 2),
    a("Sensory Block", 1, 2),
    a("Features", 1, 1, { options: ["Basic AI"] }),
  ], [d("Bane", 2), d("Unique Defect", 2), d("Unique Defect", 1), d("Awkward Size", 4), d("Marked", 1)],
  "A combat mecha whose AI has gone autonomous. Machine precision, never panics, never retreats. Boss-level encounter."),

  // Space Opera
  npc("Spaceport Customs Inspector", { body: 4, mind: 5, soul: 5 }, [
    a("Features", 1, 1, { options: ["Scanner Wand"] }),
    w("Pulse Pistol", 2, 7, { enh: [{ name: "Autofire", levels: 2 }, { name: "Range", levels: 3 }], lim: [{ name: "Ammo" }] }),
    a("Features", 1, 1, { options: ["Customs Authority"] }),
  ], [d("Easily Distracted", 1), d("Owned", 1)],
  "Bureaucratic gatekeeper of interstellar commerce. Social obstacle, not a combat encounter."),

  npc("Pirate Captain", { body: 6, mind: 6, soul: 7 }, [
    w("Blaster Pistol", 2, 7, { enh: [{ name: "Range", levels: 3 }], lim: [{ name: "Ammo" }] }),
    w("Boarding Sword", 2, 3, { isMuscle: true, enh: [{ name: "Penetrating" }], lim: [{ name: "Inaccurate" }] }),
    a("Armour", 2, 2, { lim: [{ name: "Localised" }] }),
    a("Attack Mastery", 1, 1),
    a("Defence Mastery", 1, 1),
    a("Features", 1, 2, { options: ["Pirate Crew"] }),
    a("Features", 1, 1, { options: ["Reputation"] }),
    a("Heightened Awareness", 1, 1),
  ], [d("Wanted", 2), d("Easily Distracted", 1), d("Nemesis", 1)],
  "Commander of a raiding crew. Part tactician, part brawler, part con artist."),

  // Slice of Life
  npc("Convenience Store Clerk", { body: 4, mind: 5, soul: 5 }, [
    a("Features", 1, 1, { options: ["Local Knowledge"] }),
    a("Heightened Awareness", 1, 1),
  ], [d("Easily Distracted", 1)],
  "The person behind the counter. Knows every regular by name. Information hub for the neighborhood."),

  npc("Strict Teacher", { body: 5, mind: 7, soul: 6 }, [
    a("Heightened Awareness", 1, 2),
    a("Features", 1, 1, { options: ["Institutional Authority"] }),
    a("Features", 1, 1, { options: ["Sixth Sense for Trouble"] }),
  ], [d("Easily Distracted", 1), d("Unique Defect", 1)],
  "The disciplinarian on the faculty. Fair but demanding. Social boss encounter for Slice of Life campaigns."),

  // Isekai
  npc("Goblin Raider", { body: 4, mind: 3, soul: 3 }, [
    w("Natural Weapons", 1, 1, { isMuscle: true, options: ["Bite"] }),
    w("Jawbone Club", 2, 2, { isMuscle: true, lim: [{ name: "Unreliable" }] }),
    a("Features", 1, 1, { options: ["Darkvision"] }),
    a("Special Movement", 1, 1, { options: ["Climbing"] }),
  ], [d("Easily Distracted", 1), d("Unique Defect", 1), d("Awkward Size", 1)],
  "The universal starter mob. Small, vicious, cowardly in singles but dangerous in packs of 6-10."),

  npc("Guild Receptionist", { body: 4, mind: 7, soul: 7 }, [
    a("Features", 1, 1, { options: ["Guild Authority"] }),
    a("Features", 1, 1, { options: ["Eidetic Memory"] }),
    a("Heightened Awareness", 1, 1),
    a("Mind Shield", 1, 1),
  ], [d("Owned", 1), d("Unique Defect", 1)],
  "The first NPC every isekai protagonist meets. Calm, professional, and relentlessly cheerful. Quest dispenser and information source."),

  // Cyberpunk
  npc("Corporate Security Trooper", { body: 6, mind: 5, soul: 4 }, [
    w("Compact PDW", 2, 7, { enh: [{ name: "Autofire", levels: 2 }, { name: "Penetrating" }, { name: "Range", levels: 3 }], lim: [{ name: "Ammo" }, { name: "Inaccurate" }] }),
    a("Armour", 2, 3, { lim: [{ name: "Localised" }] }),
    a("Features", 1, 1, { options: ["Tactical Comms"] }),
    a("Heightened Awareness", 1, 1),
  ], [d("Owned", 1), d("Unique Defect", 1)],
  "Armored fist of megacorp property protection. Deploy in fire teams of 4."),

  npc("Black Market Fixer", { body: 4, mind: 7, soul: 6 }, [
    w("Pistol, Holdout", 2, 4, { enh: [{ name: "Range", levels: 2 }], lim: [{ name: "Ammo", levels: 2 }, { name: "Inaccurate" }] }),
    a("Features", 1, 3, { options: ["Contact Network"] }),
    a("Features", 1, 1, { options: ["Encrypted Comms"] }),
    a("Features", 1, 1, { options: ["Safe Houses"] }),
    a("Heightened Awareness", 1, 1),
    a("Mind Shield", 1, 1),
  ], [d("Wanted", 1), d("Skeleton in the Closet", 2), d("Easily Distracted", 1)],
  "The person you call when you need something that doesn't officially exist. Social encounter — combat is a failure state."),

  // Historical/Mythic
  npc("Bandit", { body: 5, mind: 4, soul: 4 }, [
    w("Falx", 2, 3, { isMuscle: true, enh: [{ name: "Penetrating" }], lim: [{ name: "Inaccurate" }] }),
    w("Javelin Bundle", 2, 2, { enh: [{ name: "Range", levels: 2 }], lim: [{ name: "Ammo", levels: 2 }] }),
    a("Armour", 2, 1, { lim: [{ name: "Localised" }] }),
  ], [d("Easily Distracted", 1), d("Wanted", 1)],
  "A desperate outlaw living off highway robbery. Deploy in ambush groups of 4-6."),

  npc("Temple Guardian", { body: 7, mind: 5, soul: 7 }, [
    w("Crescent Glaive", 2, 3, { isMuscle: true, enh: [{ name: "Flexible" }], lim: [{ name: "Hands" }] }),
    a("Armour", 2, 4),
    a("Attack Mastery", 1, 2),
    a("Defence Mastery", 1, 2),
    a("Sixth Sense", 1, 1, { options: ["Desecration"] }),
    a("Tough", 1, 1),
    a("Heightened Awareness", 1, 1),
  ], [d("Unique Defect", 2), d("Unique Defect", 2), d("Owned", 1)],
  "A sacred warrior bound by divine oath to protect a holy site. Location boss — nearly unbeatable on their own ground."),

  // Post-Apocalyptic
  npc("Wasteland Raider", { body: 5, mind: 4, soul: 4 }, [
    w("Pistol, Holdout", 2, 4, { enh: [{ name: "Range", levels: 2 }], lim: [{ name: "Ammo", levels: 2 }, { name: "Inaccurate" }] }),
    w("Claw Gauntlet", 2, 2, { isMuscle: true, enh: [{ name: "Potent" }], lim: [{ name: "Non-Penetrating" }] }),
    a("Armour", 2, 1, { lim: [{ name: "Localised" }] }),
  ], [d("Easily Distracted", 1), d("Unique Defect", 1)],
  "A violent scavenger who takes what they need at gunpoint. Deploy in gangs of 5-8."),

  npc("Irradiated Stalker", { body: 8, mind: 3, soul: 4 }, [
    w("Natural Weapons", 1, 2, { isMuscle: true, options: ["Claws and Teeth"] }),
    a("Armour", 2, 3),
    a("Heightened Awareness", 1, 2),
    a("Tough", 1, 2),
    a("Jumping", 1, 1),
    a("Features", 1, 1, { options: ["Darkvision"] }),
    a("Special Movement", 1, 1, { options: ["Climbing"] }),
  ], [d("Bane", 1), d("Bane", 1), d("Easily Distracted", 1), d("Unique Defect", 1)],
  "A mutated predator twisted by radiation. Hunts by vibration and scent in collapsed buildings and tunnels."),

  // Horror/Dark Fantasy
  npc("Restless Shade", { body: 3, mind: 5, soul: 8 }, [
    w("Deathchill Touch", 2, 2, { isMuscle: true, enh: [{ name: "Drain" }, { name: "Insidious" }] }),
    a("Flight", 3, 1),
    a("Special Movement", 1, 1, { options: ["Phasing"] }),
    a("Heightened Awareness", 1, 1),
    a("Features", 1, 1, { options: ["Invisibility at Will"] }),
    a("Sensory Block", 1, 1),
  ], [d("Bane", 2), d("Bane", 2), d("Unique Defect", 2), d("Unique Defect", 1)],
  "An unquiet spirit that haunts a specific location. Cannot be harmed by conventional weapons — a puzzle/investigation encounter."),

  npc("Cult Fanatic", { body: 5, mind: 4, soul: 5 }, [
    w("Ritual Talons", 2, 2, { isMuscle: true, enh: [{ name: "Potent" }], lim: [{ name: "Non-Penetrating" }] }),
    w("Ritual Dart Launcher", 2, 2, { enh: [{ name: "Range", levels: 2 }], lim: [{ name: "Ammo", levels: 3 }, { name: "Inaccurate" }] }),
    a("Features", 1, 1, { options: ["Cult Tattoos"] }),
  ], [d("Easily Distracted", 1), d("Owned", 1), d("Unique Defect", 1)],
  "A true believer in service to an occult power. Deploy in cells of 4-6."),
];

for (const n of npcs) {
  writeJson(n);
}

console.log(`\nDone! Generated ${npcs.length} bestiary entries.`);
