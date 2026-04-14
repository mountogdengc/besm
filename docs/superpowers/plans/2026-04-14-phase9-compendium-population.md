# Phase 9: Compendium Population Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Populate 5 Foundry VTT compendium packs (attributes, defects, enhancements, limiters, skills) from existing BESM character builder data libraries.

**Architecture:** A Node.js build script reads the TypeScript data libraries from the old builder, strips type annotations, evaluates the data arrays, transforms each entry to a Foundry Item document, and writes individual JSON source files. The Foundry CLI compiles these into LevelDB packs. A `source` field is added to all item data models to enable filtering by source book.

**Tech Stack:** Node.js (ESM), `@foundryvtt/foundryvtt-cli` (dev dependency), Foundry V14 LevelDB packs

**Data source path:** `D:\Done\BESM 4e Character Builder\BESM_web_builder2\src\data\`

---

## File Structure

| Action | Path | Purpose |
|--------|------|---------|
| Modify | `src/models/items/AttributeData.mjs` | Add `source` field |
| Modify | `src/models/items/DefectData.mjs` | Add `source` field |
| Modify | `src/models/items/EnhancementData.mjs` | Add `source` field |
| Modify | `src/models/items/LimiterData.mjs` | Add `source` field |
| Modify | `src/models/items/SkillData.mjs` | Add `source` field |
| Modify | `system.json` | Add 5 pack definitions |
| Modify | `package.json` | Add `build:packs` script and `@foundryvtt/foundryvtt-cli` dev dep |
| Create | `scripts/build-packs.mjs` | Pack generation script |
| Create | `packs/_source/attributes/*.json` | Generated attribute source JSON |
| Create | `packs/_source/defects/*.json` | Generated defect source JSON |
| Create | `packs/_source/enhancements/*.json` | Generated enhancement source JSON |
| Create | `packs/_source/limiters/*.json` | Generated limiter source JSON |
| Create | `packs/_source/skills/*.json` | Generated skill source JSON |
| Modify | `.gitignore` | Ignore compiled LevelDB dirs, keep `_source/` |

---

### Task 1: Add `source` field to item data models

**Files:**
- Modify: `src/models/items/AttributeData.mjs:7` (inside defineSchema return)
- Modify: `src/models/items/DefectData.mjs:4` (inside defineSchema return)
- Modify: `src/models/items/EnhancementData.mjs:4` (inside defineSchema return)
- Modify: `src/models/items/LimiterData.mjs:4` (inside defineSchema return)
- Modify: `src/models/items/SkillData.mjs:7` (inside defineSchema return)

- [ ] **Step 1: Add `source` field to AttributeData**

In `src/models/items/AttributeData.mjs`, add after the `description` field (line 8):

```javascript
source: new fields.StringField({ initial: "BESM4e" }),
```

- [ ] **Step 2: Add `source` field to DefectData**

In `src/models/items/DefectData.mjs`, add after the `description` field (line 6):

```javascript
source: new fields.StringField({ initial: "BESM4e" }),
```

- [ ] **Step 3: Add `source` field to EnhancementData**

In `src/models/items/EnhancementData.mjs`, add after the `description` field (line 6):

```javascript
source: new fields.StringField({ initial: "BESM4e" }),
```

- [ ] **Step 4: Add `source` field to LimiterData**

In `src/models/items/LimiterData.mjs`, add after the `description` field (line 6):

```javascript
source: new fields.StringField({ initial: "BESM4e" }),
```

- [ ] **Step 5: Add `source` field to SkillData**

In `src/models/items/SkillData.mjs`, add after the `description` field (line 7):

```javascript
source: new fields.StringField({ initial: "BESM4e" }),
```

- [ ] **Step 6: Run existing tests to verify no breakage**

Run: `npx vitest run`
Expected: All existing tests pass (source field has a default, so no existing code breaks).

- [ ] **Step 7: Commit**

```bash
git add src/models/items/AttributeData.mjs src/models/items/DefectData.mjs src/models/items/EnhancementData.mjs src/models/items/LimiterData.mjs src/models/items/SkillData.mjs
git commit -m "feat: add source field to all item data models for compendium filtering"
```

---

### Task 2: Configure packs in system.json and project setup

**Files:**
- Modify: `system.json`
- Modify: `package.json`
- Modify: `.gitignore` (create if needed)

- [ ] **Step 1: Add packs array to system.json**

Add the following `packs` array to `system.json` after the `"socket": false` line:

```json
"packs": [
  {
    "label": "Attributes",
    "type": "Item",
    "name": "attributes",
    "path": "packs/attributes",
    "system": "besm",
    "ownership": { "PLAYER": "OBSERVER", "ASSISTANT": "OWNER" }
  },
  {
    "label": "Defects",
    "type": "Item",
    "name": "defects",
    "path": "packs/defects",
    "system": "besm",
    "ownership": { "PLAYER": "OBSERVER", "ASSISTANT": "OWNER" }
  },
  {
    "label": "Enhancements",
    "type": "Item",
    "name": "enhancements",
    "path": "packs/enhancements",
    "system": "besm",
    "ownership": { "PLAYER": "OBSERVER", "ASSISTANT": "OWNER" }
  },
  {
    "label": "Limiters",
    "type": "Item",
    "name": "limiters",
    "path": "packs/limiters",
    "system": "besm",
    "ownership": { "PLAYER": "OBSERVER", "ASSISTANT": "OWNER" }
  },
  {
    "label": "Skills",
    "type": "Item",
    "name": "skills",
    "path": "packs/skills",
    "system": "besm",
    "ownership": { "PLAYER": "OBSERVER", "ASSISTANT": "OWNER" }
  }
],
```

- [ ] **Step 2: Add build:packs script and foundryvtt-cli dev dependency to package.json**

Add to `"scripts"`:

```json
"build:packs": "node scripts/build-packs.mjs"
```

Add to `"devDependencies"`:

```json
"@foundryvtt/foundryvtt-cli": "^1.0.0"
```

- [ ] **Step 3: Add .gitignore entries for compiled packs**

Add to `.gitignore` (create the file if it doesn't exist):

```
# Compiled compendium packs (LevelDB) - regenerate with npm run build:packs
packs/attributes/
packs/defects/
packs/enhancements/
packs/limiters/
packs/skills/
```

Note: `packs/_source/` is NOT ignored — the JSON source files are committed.

- [ ] **Step 4: Install dependencies**

Run: `npm install`
Expected: `@foundryvtt/foundryvtt-cli` installs successfully.

- [ ] **Step 5: Create directory structure**

Run:
```bash
mkdir -p packs/_source/attributes packs/_source/defects packs/_source/enhancements packs/_source/limiters packs/_source/skills
```

- [ ] **Step 6: Commit**

```bash
git add system.json package.json package-lock.json .gitignore
git commit -m "feat: configure 5 compendium packs in system.json, add build:packs script"
```

---

### Task 3: Write build-packs.mjs — TS parsing and ID generation

**Files:**
- Create: `scripts/build-packs.mjs`

This task creates the script skeleton with utilities for parsing TypeScript data files and generating deterministic Foundry document IDs. Subsequent tasks add the transformation logic for each item type.

- [ ] **Step 1: Create scripts/build-packs.mjs with TS parsing utilities**

```javascript
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
  return src
    // Remove import lines
    .replace(/^import\s+.*$/gm, "")
    // Remove export interface / export type / type blocks
    .replace(/^export\s+(interface|type)\s+[\s\S]*?^}/gm, "")
    .replace(/^(interface|type)\s+\w+[\s\S]*?^}/gm, "")
    // Remove inline type annotations on declarations — e.g. `: EnhancementTemplate[]`
    .replace(/:\s*\w+(\[\])?\s*=/g, " =")
    // Remove `as <Type>` casts
    .replace(/\s+as\s+\w+(\[\])?/g, "")
    // Remove `export` keyword from const/function
    .replace(/^export\s+(const|function|let|var)\b/gm, "$1")
    // Remove type annotations in function params — e.g. `(key: string)`
    .replace(/\((\w+)\s*:\s*\w+\)/g, "($1)")
    // Remove return type annotations — e.g. `: EnhancementTemplate | undefined`
    .replace(/\)\s*:\s*[\w\s|[\]]+\s*\{/g, ") {");
}

/**
 * Evaluate a TS data file and return the named export array.
 * `stubs` is an object of function names to stub implementations
 * that will be available during evaluation.
 */
function evalTsArray(filePath, arrayName, stubs = {}) {
  const raw = readFileSync(filePath, "utf-8");
  const js = stripTs(raw);

  // Build stub preamble
  const stubCode = Object.entries(stubs)
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
// Pack compilation
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
        `npx fvtt package pack --type Item --in "${srcDir}" --out "${outDir}"`,
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
compilePacks();

console.log("\nDone! Pack source JSON is in packs/_source/, compiled packs in packs/");
```

- [ ] **Step 2: Verify the script runs and generates source JSON**

Run: `node scripts/build-packs.mjs`

Expected output (approximate counts):
```
Data source: D:\Done\BESM 4e Character Builder\BESM_web_builder2\src\data

Building attributes...
  -> 98 attributes
Building defects...
  -> 47 defects
Building enhancements...
  -> 43 enhancements
Building limiters...
  -> ~40 limiters
Building skills...
  -> ~65 skills

Compiling packs to LevelDB...
  -> attributes compiled
  -> defects compiled
  -> enhancements compiled
  -> limiters compiled
  -> skills compiled

Done! Pack source JSON is in packs/_source/, compiled packs in packs/
```

- [ ] **Step 3: Spot-check a few generated JSON files**

Run:
```bash
cat packs/_source/attributes/absorption.json
cat packs/_source/defects/achilles_heel.json
cat packs/_source/enhancements/accurate.json
cat packs/_source/limiters/activation.json
cat packs/_source/skills/acrobatics.json
```

Verify each has: `_id` (16-char hex), `name`, `type`, and `system` object with `description`, type-specific fields, and `source`.

- [ ] **Step 4: Verify limiter deduplication**

Run:
```bash
ls packs/_source/limiters/ | wc -l
ls packs/_source/limiters/ | grep charges
```

Expected: only `charges.json` exists (no `charges_1.json`, `charges_2.json`, `charges_3.json`). Same for concentration, consumable, delay, etc.

- [ ] **Step 5: Commit**

```bash
git add scripts/build-packs.mjs packs/_source/
git commit -m "feat: add compendium pack build script and generated source JSON"
```

---

### Task 4: Verify packs load in Foundry VTT

**Files:** None (manual verification)

- [ ] **Step 1: Rebuild the system**

Run: `npm run build`

- [ ] **Step 2: Launch Foundry VTT and verify packs appear**

1. Open Foundry VTT
2. Load or create a world using the BESM system
3. Open the Compendium tab
4. Verify 5 packs appear: Attributes, Defects, Enhancements, Limiters, Skills

- [ ] **Step 3: Verify pack contents**

1. Open the Attributes compendium — verify entries load with names, descriptions, and cost values
2. Open a specific attribute (e.g., Absorption) — verify:
   - Description includes level table HTML
   - `baseCostPerLevel` = 5
   - `source` = "BESM4e"
3. Open the Defects compendium — verify entries have tier and cpGranted values
4. Open the Enhancements compendium — verify entries have levels (picks)
5. Open the Limiters compendium — verify no pre-split duplicates
6. Open the Skills compendium — verify entries have linkedStat

- [ ] **Step 4: Test drag-and-drop from compendium to character sheet**

1. Create a test character
2. Drag "Absorption" from the Attributes compendium onto the character
3. Verify it creates an attribute item with baseCostPerLevel=5, purchasedLevel=1, source="BESM4e"
4. Drag "Achilles Heel" from Defects — verify cpGranted and tier
5. Drag "Acrobatics" from Skills — verify linkedStat="body"

- [ ] **Step 5: Commit any fixes needed**

If fixes were required:
```bash
git add -A
git commit -m "fix: compendium pack corrections from manual testing"
```

---

### Task 5: Update phase status documentation

**Files:**
- Modify: `docs/PHASE-STATUS.md`

- [ ] **Step 1: Update PHASE-STATUS.md to mark Phase 9 complete**

Update the Phase 9 entry to show completion, listing:
- 5 compendium packs (attributes, defects, enhancements, limiters, skills)
- Approximate item counts
- `source` field for filtering by source book
- Build script at `scripts/build-packs.mjs`

- [ ] **Step 2: Commit**

```bash
git add docs/PHASE-STATUS.md
git commit -m "docs: mark Phase 9 compendium population complete"
```
