import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "packs", "_source", "size-templates");

function rid() {
  return Array.from({ length: 16 }, () =>
    "0123456789abcdef"[Math.floor(Math.random() * 16)]
  ).join("");
}

const templates = [
  { name: "Point", rank: -10, points: -158, attrs: [
    { name: "Ranged Attack", cost: 1, level: 10 },
    { name: "Ranged Defence", cost: 1, level: 10 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 10 },
  ], defects: [
    { name: "Lifting Capacity", rank: 10, cp: 138 },
    { name: "Running Speed", rank: 10, cp: 10 },
    { name: "Strength Damage", rank: 10, cp: 20 },
    { name: "Vulnerable", rank: 10, cp: 40 },
    { name: "Weak Throw", rank: 10, cp: 10 },
  ]},
  { name: "Mote", rank: -9, points: -80, attrs: [
    { name: "Ranged Attack", cost: 1, level: 9 },
    { name: "Ranged Defence", cost: 1, level: 9 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 9 },
  ], defects: [
    { name: "Lifting Capacity", rank: 9, cp: 54 },
    { name: "Running Speed", rank: 9, cp: 9 },
    { name: "Strength Damage", rank: 9, cp: 18 },
    { name: "Vulnerable", rank: 9, cp: 36 },
    { name: "Weak Throw", rank: 9, cp: 9 },
  ]},
  { name: "Speck", rank: -8, points: -64, attrs: [
    { name: "Ranged Attack", cost: 1, level: 8 },
    { name: "Ranged Defence", cost: 1, level: 8 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 8 },
  ], defects: [
    { name: "Lifting Capacity", rank: 8, cp: 48 },
    { name: "Running Speed", rank: 8, cp: 8 },
    { name: "Strength Damage", rank: 8, cp: 16 },
    { name: "Vulnerable", rank: 8, cp: 32 },
    { name: "Weak Throw", rank: 8, cp: 8 },
  ]},
  { name: "Minute", rank: -7, points: -50, attrs: [
    { name: "Ranged Attack", cost: 1, level: 7 },
    { name: "Ranged Defence", cost: 1, level: 7 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 7 },
  ], defects: [
    { name: "Lifting Capacity", rank: 7, cp: 42 },
    { name: "Running Speed", rank: 7, cp: 7 },
    { name: "Strength Damage", rank: 7, cp: 14 },
    { name: "Vulnerable", rank: 7, cp: 28 },
    { name: "Weak Throw", rank: 7, cp: 7 },
  ]},
  { name: "Wee", rank: -6, points: -40, attrs: [], defects: [] },
  { name: "Teeny", rank: -5, points: -30, attrs: [
    { name: "Ranged Attack", cost: 1, level: 5 },
    { name: "Ranged Defence", cost: 1, level: 5 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 5 },
  ], defects: [
    { name: "Lifting Capacity", rank: 5, cp: 30 },
    { name: "Running Speed", rank: 5, cp: 5 },
    { name: "Strength Damage", rank: 5, cp: 10 },
    { name: "Vulnerable", rank: 5, cp: 20 },
    { name: "Weak Throw", rank: 5, cp: 5 },
  ]},
  { name: "Fine", rank: -4, points: -24, attrs: [
    { name: "Ranged Attack", cost: 1, level: 4 },
    { name: "Ranged Defence", cost: 1, level: 4 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 4 },
  ], defects: [
    { name: "Lifting Capacity", rank: 4, cp: 24 },
    { name: "Running Speed", rank: 4, cp: 4 },
    { name: "Strength Damage", rank: 4, cp: 8 },
    { name: "Vulnerable", rank: 4, cp: 16 },
    { name: "Weak Throw", rank: 4, cp: 4 },
  ]},
  { name: "Diminutive", rank: -3, points: -18, attrs: [
    { name: "Ranged Attack", cost: 1, level: 3 },
    { name: "Ranged Defence", cost: 1, level: 3 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 3 },
  ], defects: [
    { name: "Lifting Capacity", rank: 3, cp: 18 },
    { name: "Running Speed", rank: 3, cp: 3 },
    { name: "Strength Damage", rank: 3, cp: 6 },
    { name: "Vulnerable", rank: 3, cp: 12 },
    { name: "Weak Throw", rank: 3, cp: 3 },
  ]},
  { name: "Tiny", rank: -2, points: -20, attrs: [
    { name: "Ranged Attack", cost: 1, level: 2 },
    { name: "Ranged Defence", cost: 1, level: 2 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 2 },
  ], defects: [
    { name: "Lifting Capacity", rank: 2, cp: 12 },
    { name: "Running Speed", rank: 2, cp: 2 },
    { name: "Strength Damage", rank: 2, cp: 4 },
    { name: "Vulnerable", rank: 2, cp: 8 },
    { name: "Weak Throw", rank: 2, cp: 2 },
  ]},
  { name: "Small", rank: -1, points: -6, attrs: [
    { name: "Ranged Attack", cost: 1, level: 1 },
    { name: "Ranged Defence", cost: 1, level: 1 },
    { name: "Small, Light, and Unobtrusive", cost: 2, level: 1 },
  ], defects: [
    { name: "Lifting Capacity", rank: 1, cp: 6 },
    { name: "Running Speed", rank: 1, cp: 1 },
    { name: "Strength Damage", rank: 1, cp: 2 },
    { name: "Vulnerable", rank: 1, cp: 4 },
    { name: "Weak Throw", rank: 1, cp: 1 },
  ]},
  { name: "Medium", rank: 0, points: 0, attrs: [], defects: [] },
  { name: "Large", rank: 1, points: 10, attrs: [
    { name: "Superstrength", cost: 4, level: 2 },
    { name: "Armour", cost: 2, level: 2 },
    { name: "Special Movement", cost: 1, level: 1 },
    { name: "Unique Attribute", cost: 1, level: 1 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 1, cp: 2 },
    { name: "Inept Attack: Ranged", rank: 1, cp: 1 },
    { name: "Inept Defence: Ranged", rank: 1, cp: 1 },
  ]},
  { name: "Huge", rank: 2, points: 20, attrs: [
    { name: "Superstrength", cost: 4, level: 4 },
    { name: "Armour", cost: 2, level: 4 },
    { name: "Special Movement", cost: 1, level: 2 },
    { name: "Unique Attribute", cost: 1, level: 2 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 2, cp: 4 },
    { name: "Inept Attack: Ranged", rank: 2, cp: 2 },
    { name: "Inept Defence: Ranged", rank: 2, cp: 2 },
  ]},
  { name: "Mammoth", rank: 3, points: 30, attrs: [
    { name: "Superstrength", cost: 4, level: 6 },
    { name: "Armour", cost: 2, level: 6 },
    { name: "Special Movement", cost: 1, level: 3 },
    { name: "Unique Attribute", cost: 1, level: 3 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 3, cp: 6 },
    { name: "Inept Attack: Ranged", rank: 3, cp: 3 },
    { name: "Inept Defence: Ranged", rank: 3, cp: 3 },
  ]},
  { name: "Gigantic", rank: 4, points: 40, attrs: [
    { name: "Superstrength", cost: 4, level: 8 },
    { name: "Armour", cost: 2, level: 8 },
    { name: "Special Movement", cost: 1, level: 4 },
    { name: "Unique Attribute", cost: 1, level: 4 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 4, cp: 8 },
    { name: "Inept Attack: Ranged", rank: 4, cp: 4 },
    { name: "Inept Defence: Ranged", rank: 4, cp: 4 },
  ]},
  { name: "Gargantuan", rank: 5, points: 50, attrs: [
    { name: "Superstrength", cost: 4, level: 10 },
    { name: "Armour", cost: 2, level: 10 },
    { name: "Special Movement", cost: 1, level: 5 },
    { name: "Unique Attribute", cost: 1, level: 5 },
  ], defects: [] },
  { name: "Colossal", rank: 6, points: 60, attrs: [
    { name: "Superstrength", cost: 4, level: 12 },
    { name: "Armour", cost: 2, level: 12 },
    { name: "Special Movement", cost: 1, level: 6 },
    { name: "Unique Attribute", cost: 1, level: 6 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 6, cp: 12 },
    { name: "Inept Attack: Ranged", rank: 6, cp: 6 },
    { name: "Inept Defence: Ranged", rank: 6, cp: 6 },
  ]},
  { name: "Enormous", rank: 7, points: 70, attrs: [
    { name: "Superstrength", cost: 4, level: 14 },
    { name: "Armour", cost: 2, level: 14 },
    { name: "Special Movement", cost: 1, level: 7 },
    { name: "Unique Attribute", cost: 1, level: 7 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 7, cp: 14 },
    { name: "Inept Attack: Ranged", rank: 7, cp: 7 },
    { name: "Inept Defence: Ranged", rank: 7, cp: 7 },
  ]},
  { name: "Monstrous", rank: 8, points: 80, attrs: [
    { name: "Superstrength", cost: 4, level: 16 },
    { name: "Armour", cost: 2, level: 16 },
    { name: "Special Movement", cost: 1, level: 8 },
    { name: "Unique Attribute", cost: 1, level: 8 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 8, cp: 16 },
    { name: "Inept Attack: Ranged", rank: 8, cp: 8 },
    { name: "Inept Defence: Ranged", rank: 8, cp: 8 },
  ]},
  { name: "Titanic", rank: 9, points: 90, attrs: [
    { name: "Superstrength", cost: 4, level: 18 },
    { name: "Armour", cost: 2, level: 18 },
    { name: "Special Movement", cost: 1, level: 9 },
    { name: "Unique Attribute", cost: 1, level: 9 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 9, cp: 18 },
    { name: "Inept Attack: Ranged", rank: 9, cp: 9 },
    { name: "Inept Defence: Ranged", rank: 9, cp: 9 },
  ]},
  { name: "Monumental", rank: 10, points: 100, attrs: [
    { name: "Superstrength", cost: 4, level: 20 },
    { name: "Armour", cost: 2, level: 20 },
    { name: "Special Movement", cost: 1, level: 10 },
    { name: "Unique Attribute", cost: 1, level: 10 },
  ], defects: [
    { name: "Big, Heavy, and Obvious", rank: 10, cp: 20 },
    { name: "Inept Attack: Ranged", rank: 10, cp: 10 },
    { name: "Inept Defence: Ranged", rank: 10, cp: 10 },
  ]},
];

for (const t of templates) {
  const id = rid();
  const entries = [];

  for (const a of t.attrs) {
    entries.push({
      entryType: "item",
      name: a.name,
      itemType: "attribute",
      systemData: { baseCostPerLevel: a.cost, purchasedLevel: a.level },
    });
  }
  for (const d of t.defects) {
    entries.push({
      entryType: "item",
      name: d.name,
      itemType: "defect",
      systemData: { rankLevel: d.rank, cpGranted: d.cp },
    });
  }

  const doc = {
    _id: id,
    name: `${t.name} (Size Rank ${t.rank})`,
    type: "besm4eTemplate",
    system: {
      templateType: "size",
      tradition: "",
      description: "",
      pointTotal: t.points,
      sizeRank: t.rank,
      statModifiers: { body: 0, mind: 0, soul: 0 },
      entries,
    },
    _key: `!items!${id}`,
  };

  const fname = t.name.toLowerCase().replace(/\s+/g, "_") + ".json";
  fs.writeFileSync(path.join(dir, fname), JSON.stringify(doc, null, 2) + "\n");
  console.log(`Wrote ${fname}`);
}
