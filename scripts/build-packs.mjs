/**
 * Build script: generates Foundry VTT compendium pack source JSON
 * from the BESM 4e character builder TypeScript data libraries.
 *
 * Usage: node scripts/build-packs.mjs [--data-path <path>]
 * Default data path: D:\Done\BESM 4e Character Builder\BESM_web_builder2\src\data
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DATA_PATH =
  process.argv.includes("--data-path")
    ? process.argv[process.argv.indexOf("--data-path") + 1]
    : String.raw`D:\Done\BESM 4e Character Builder\BESM_web_builder2\src\data`;

const PACKS_SOURCE = resolve("packs/_source");
const PACKS_OUT = resolve("packs");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a deterministic 16-char hex ID from pack name + item key. */
function makeId(pack, key) {
  return createHash("sha256")
    .update(`${pack}/${key}`)
    .digest("hex")
    .slice(0, 16);
}

/** Read a TS file and strip TypeScript-specific syntax so it can be evaluated as JS. */
function stripTs(src) {
  // All regex literals — avoids the new RegExp(string) backslash escaping headaches.
  // TypeScript type annotations only appear where:
  //   - After a param name in function signatures: `(param: Type, ...)` or `(param: Type)`
  //   - After variable declarations: `const x: Type =`
  //   - As return types: `) : Type {`
  // We distinguish TS type names from object literal values by requiring the type to be
  // either a TS primitive keyword or PascalCase (capital first letter).

  return src
    // Remove import lines
    .replace(/^import\s+.*$/gm, "")
    // Remove export interface / export type / type alias blocks (multiline)
    .replace(/^export\s+(interface|type)\s+[\s\S]*?^}/gm, "")
    .replace(/^(interface|type)\s+\w+[\s\S]*?^}/gm, "")
    // Remove generic type annotations on variable declarations: `: Record<K,V> =`, `: Map<K,V> =`
    .replace(/:\s*\w+<[^>]*>\s*=/g, " =")
    // Remove simple type annotations on declarations: `: TypeName =` or `: TypeName[] =`
    // Type must be PascalCase or TS primitive (won't match lowercase values like `5` or `true`)
    .replace(/:\s*(?:string|number|boolean|any|void|never|unknown|object|[A-Z][A-Za-z0-9_]*)(?:\[\])?\s*=/g, " =")
    // Remove `as TypeName` or `as Generic<...>` casts
    .replace(/\s+as\s+\w+(?:<[^>]*>)?(?:\[\])?/g, "")
    // Remove `export` keyword from const/function/let/var
    .replace(/^export\s+(const|function|let|var)\b/gm, "$1")
    // Remove optional param annotations: `param?: TSType` -> `param = undefined`
    // Covers primitives and PascalCase types, with optional generics/arrays, before , or )
    .replace(/([A-Za-z_$][A-Za-z0-9_$]*)\s*\?\s*:\s*(?:string|number|boolean|any|void|never|unknown|object|[A-Z][A-Za-z0-9_]*)(?:<[^>]*>)?(?:\[\])?(\s*[,)])/g, "$1 = undefined$2")
    // Remove typed params with defaults: `param: TSType = val` -> `param = val`
    .replace(/([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*(?:string|number|boolean|any|void|never|unknown|object|[A-Z][A-Za-z0-9_]*)(?:<[^>]*>)?(?:\[\])?\s*=/g, "$1 =")
    // Remove typed params before `,` or `)` — run 4× to handle multi-param signatures
    .replace(/([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*(?:string|number|boolean|any|void|never|unknown|object|[A-Z][A-Za-z0-9_]*)(?:<[^>]*>)?(?:\[\])?(\s*[,)])/g, "$1$2")
    .replace(/([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*(?:string|number|boolean|any|void|never|unknown|object|[A-Z][A-Za-z0-9_]*)(?:<[^>]*>)?(?:\[\])?(\s*[,)])/g, "$1$2")
    .replace(/([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*(?:string|number|boolean|any|void|never|unknown|object|[A-Z][A-Za-z0-9_]*)(?:<[^>]*>)?(?:\[\])?(\s*[,)])/g, "$1$2")
    .replace(/([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*(?:string|number|boolean|any|void|never|unknown|object|[A-Z][A-Za-z0-9_]*)(?:<[^>]*>)?(?:\[\])?(\s*[,)])/g, "$1$2")
    // Remove union string literal type params: `param: 'A' | 'B'` (must have at least one `|`)
    // Single-string literals like `name: 'Acrobatics'` are NOT matched (no `|`)
    .replace(/([A-Za-z_$][A-Za-z0-9_$]*)\s*:\s*'[^']*'(?:\s*\|\s*'[^']*')+(\s*[,)])/g, "$1$2")
    // Remove return type annotations after `)` before `{`
    .replace(/\)\s*:\s*[\w\s|[\]<>,]+\s*\{/g, ") {");
}

/**
 * Evaluate a TS data file and return the named export array.
 * `stubs` is an object of function names to stub implementations
 * that will be available during evaluation.
 */
function evalTsArray(filePath, arrayName, stubs = {}) {
  const raw = readFileSync(filePath, "utf-8");
  const js = stripTs(raw);

  // Build stub preamble — only inject stubs for names NOT already defined in the file
  const stubCode = Object.entries(stubs)
    .filter(([name]) => !new RegExp(`\\b(const|function|let|var)\\s+${name}\\b`).test(js))
    .map(([name, fn]) => `const ${name} = ${fn.toString()};`)
    .join("\n");

  const wrapped = `
    ${stubCode}
    ${js}
    return ${arrayName};
  `;

  try {
    const fn = new Function(wrapped);
    return fn();
  } catch (err) {
    console.error(`Failed to evaluate ${filePath}:`);
    console.error(err.message);
    process.exit(1);
  }
}

/** Write a single pack entry JSON file. */
function writePackEntry(packName, key, doc) {
  const dir = join(PACKS_SOURCE, packName);
  mkdirSync(dir, { recursive: true });
  const filePath = join(dir, `${key}.json`);
  writeFileSync(filePath, JSON.stringify(doc, null, 2) + "\n", "utf-8");
}

/** Format level descriptions as an HTML list. */
function formatLevels(levels) {
  if (!levels || typeof levels !== "object") return "";
  const entries = Object.entries(levels)
    .sort(([a], [b]) => Number(a) - Number(b));
  if (entries.length === 0) return "";
  const items = entries.map(([num, val]) => {
    const desc = typeof val === "string" ? val : (val.description || `Level ${num}`);
    return `<li><strong>Level ${num}:</strong> ${desc}</li>`;
  });
  return `\n<ul>${items.join("")}</ul>`;
}

/** Format rank descriptions as an HTML list. */
function formatRanks(ranks) {
  if (!ranks || ranks.length === 0) return "";
  const items = ranks.map(
    (r) => `<li><strong>Rank ${r.rank}:</strong> ${r.description}</li>`
  );
  return `\n<ul>${items.join("")}</ul>`;
}

/** Format assignment descriptions as an HTML list. */
function formatAssignments(assignments) {
  if (!assignments || typeof assignments !== "object") return "";
  const entries = Object.entries(assignments).sort(
    ([a], [b]) => Number(a) - Number(b)
  );
  if (entries.length === 0) return "";
  const items = entries.map(
    ([level, desc]) => `<li><strong>Level ${level}:</strong> ${desc}</li>`
  );
  return `\n<ul>${items.join("")}</ul>`;
}

// ---------------------------------------------------------------------------
// Attribute generation
// ---------------------------------------------------------------------------

function buildAttributes() {
  console.log("Building attributes...");
  const filePath = join(DATA_PATH, "attributesLibrary.ts");
  const data = evalTsArray(filePath, "ATTRIBUTES_LIBRARY", {
    createBaseAttribute: (legacy, _category) => legacy,
  });

  let count = 0;
  for (const attr of data) {
    const key = attr.key || attr.name.toLowerCase().replace(/\s+/g, "-");
    const costPerLevel =
      typeof attr.cost_per_level === "number" ? attr.cost_per_level : 0;
    const descHtml = `<p>${attr.description || ""}</p>${formatLevels(attr.levels)}`;

    const doc = {
      _id: makeId("attributes", key),
      name: attr.name,
      type: "attribute",
      system: {
        description: descHtml,
        baseCostPerLevel: costPerLevel,
        purchasedLevel: 1,
        source: attr.source || "BESM4e",
      },
    };
    writePackEntry("attributes", key, doc);
    count++;
  }
  console.log(`  -> ${count} attributes`);
}

// ---------------------------------------------------------------------------
// Defect generation
// ---------------------------------------------------------------------------

function buildDefects() {
  console.log("Building defects...");
  const filePath = join(DATA_PATH, "defectsLibrary.ts");
  const data = evalTsArray(filePath, "DEFECTS_LIBRARY");

  const tierMap = { Lesser: "lesser", Greater: "greater", Serious: "serious" };
  let count = 0;
  for (const defect of data) {
    const key = defect.key || defect.name.toLowerCase().replace(/\s+/g, "-");
    const descHtml = `<p>${defect.description || ""}</p>${formatRanks(defect.ranks)}`;

    const doc = {
      _id: makeId("defects", key),
      name: defect.name,
      type: "defect",
      system: {
        description: descHtml,
        cpGranted: defect.cp_refund || 1,
        tier: tierMap[defect.rank_type] || "lesser",
        source: defect.source || "BESM4e",
      },
    };
    writePackEntry("defects", key, doc);
    count++;
  }
  console.log(`  -> ${count} defects`);
}

// ---------------------------------------------------------------------------
// Enhancement generation
// ---------------------------------------------------------------------------

function buildEnhancements() {
  console.log("Building enhancements...");
  const filePath = join(DATA_PATH, "enhancementsLibrary.ts");
  const data = evalTsArray(filePath, "ENHANCEMENTS_LIBRARY");

  let count = 0;
  for (const enh of data) {
    const key = enh.key || enh.name.toLowerCase().replace(/\s+/g, "-");

    const doc = {
      _id: makeId("enhancements", key),
      name: enh.name,
      type: "enhancement",
      system: {
        description: `<p>${enh.description || ""}</p>`,
        levels: enh.picks || 1,
        source: enh.source || "BESM4e",
      },
    };
    writePackEntry("enhancements", key, doc);
    count++;
  }
  console.log(`  -> ${count} enhancements`);
}

// ---------------------------------------------------------------------------
// Limiter generation (with deduplication)
// ---------------------------------------------------------------------------

function buildLimiters() {
  console.log("Building limiters...");
  const filePath = join(DATA_PATH, "limitersLibrary.ts");

  // The file defines UNIVERSAL_LIMITERS as a const array, then LIMITERS_LIBRARY
  // which spreads UNIVERSAL_LIMITERS and adds more. We evaluate both.
  const raw = readFileSync(filePath, "utf-8");
  const js = stripTs(raw);

  // Extract UNIVERSAL_LIMITERS keys for dedup
  let allLimiters;
  try {
    const wrapped = `
      ${js}
      return LIMITERS_LIBRARY;
    `;
    allLimiters = new Function(wrapped)();
  } catch (err) {
    console.error("Failed to evaluate limitersLibrary.ts:", err.message);
    process.exit(1);
  }

  // Build set of universal limiter keys (the multi-level ones with assignments)
  const universalKeys = new Set();
  for (const lim of allLimiters) {
    if (
      lim.assignments &&
      Object.keys(lim.assignments).length > 1 &&
      !universalKeys.has(lim.key)
    ) {
      universalKeys.add(lim.key);
    }
  }

  // Deduplicate: skip pre-split variants whose key starts with a universal key + "_"
  const seen = new Set();
  let count = 0;
  for (const lim of allLimiters) {
    // Skip duplicate keys (e.g. environmental appears twice)
    if (seen.has(lim.key)) continue;
    seen.add(lim.key);

    // Skip pre-split variants: key starts with <universalKey>_
    let isPreSplit = false;
    for (const uKey of universalKeys) {
      if (lim.key !== uKey && lim.key.startsWith(uKey + "_")) {
        isPreSplit = true;
        break;
      }
    }
    if (isPreSplit) continue;

    const key = lim.key;
    const descHtml = `<p>${lim.description || ""}</p>${formatAssignments(lim.assignments)}`;

    const doc = {
      _id: makeId("limiters", key),
      name: lim.name,
      type: "limiter",
      system: {
        description: descHtml,
        levels: lim.picks || 1,
        source: lim.source || "BESM4e",
      },
    };
    writePackEntry("limiters", key, doc);
    count++;
  }
  console.log(`  -> ${count} limiters`);
}

// ---------------------------------------------------------------------------
// Skill generation
// ---------------------------------------------------------------------------

function buildSkills() {
  console.log("Building skills...");

  // Get skill names from the Multi-Genre cost table
  const costFilePath = join(DATA_PATH, "skillsCostsByGenre.ts");
  const costRaw = readFileSync(costFilePath, "utf-8");

  // Extract Multi-Genre skill names via regex (keys in the object literal)
  const skillNames = [];
  // Match the 'Multi-Genre' block
  const mgMatch = costRaw.match(
    /'Multi-Genre'\s*:\s*\{([\s\S]*?)\n\s*\}/
  );
  if (mgMatch) {
    const mgBlock = mgMatch[1];
    // Match each key (quoted or unquoted)
    const keyRegex = /['"]?([A-Za-z][\w\s]*?)['"]?\s*:/g;
    let m;
    while ((m = keyRegex.exec(mgBlock)) !== null) {
      const name = m[1].trim();
      if (name && !skillNames.includes(name)) {
        skillNames.push(name);
      }
    }
  }

  // Get metadata (descriptions, default stats) where available
  const metaFilePath = join(DATA_PATH, "skillsMetadata.ts");
  let metaMap = {};
  try {
    const metaRaw = readFileSync(metaFilePath, "utf-8");
    const metaJs = stripTs(metaRaw);
    const metaWrapped = `
      ${metaJs}
      return skillsMetadata;
    `;
    metaMap = new Function(metaWrapped)();
  } catch {
    console.warn("  Warning: could not parse skillsMetadata.ts, using defaults");
  }

  const statMap = {
    Body: "body",
    Mind: "mind",
    Soul: "soul",
    Varies: "body",
  };

  let count = 0;
  for (const name of skillNames) {
    const key = name.toLowerCase().replace(/\s+/g, "-");
    const meta = metaMap[name] || {};
    const descHtml = meta.description ? `<p>${meta.description}</p>` : "";
    const linkedStat = statMap[meta.defaultStat] || "body";

    const doc = {
      _id: makeId("skills", key),
      name: name,
      type: "skill",
      system: {
        description: descHtml,
        linkedStat: linkedStat,
        costClass: "framework",
        rank: 0,
        source: "BESM4e",
      },
    };
    writePackEntry("skills", key, doc);
    count++;
  }
  console.log(`  -> ${count} skills`);
}

// ---------------------------------------------------------------------------
// Pack compilation (skip if fvtt CLI not available)
// ---------------------------------------------------------------------------

function compilePacks() {
  console.log("\nCompiling packs to LevelDB...");
  const packNames = ["attributes", "defects", "enhancements", "limiters", "skills"];

  for (const name of packNames) {
    const srcDir = join(PACKS_SOURCE, name);
    const outDir = join(PACKS_OUT, name);
    mkdirSync(outDir, { recursive: true });

    try {
      execSync(
        `npx fvtt package pack --type System --id besm -n ${name} --in "${srcDir}" --out "${outDir}"`,
        { stdio: "inherit" }
      );
      console.log(`  -> ${name} compiled`);
    } catch (err) {
      console.error(`  !! Failed to compile ${name}:`, err.message);
      console.error(
        "  Make sure @foundryvtt/foundryvtt-cli is installed: npm install -D @foundryvtt/foundryvtt-cli"
      );
      process.exit(1);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log(`Data source: ${DATA_PATH}\n`);

buildAttributes();
buildDefects();
buildEnhancements();
buildLimiters();
buildSkills();

// Only compile if --no-compile is not passed
if (!process.argv.includes("--no-compile")) {
  compilePacks();
} else {
  console.log("\nSkipping pack compilation (--no-compile flag).");
}

console.log("\nDone! Pack source JSON is in packs/_source/, compiled packs in packs/");
