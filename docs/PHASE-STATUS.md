# BESM 4e — Development Phase Status

## Completed

| Phase | Description | Tests | Key Files |
|---|---|---|---|
| **0** | Foundation — Svelte 5 + Vite 6 + Tailwind + ApplicationV2 | — | vite.config.mjs, system.json, BESMActorSheet.mjs |
| **1a** | DataModel schemas + system settings (10 models, 15 settings) | — | src/models/\*, src/settings/ |
| **1b** | CP calculation engine + derived stats + benchmarks | 59 | src/engine/calculations.mjs, benchmarks.mjs |
| **1c** | Skill cost resolution + SP pool (three-layer system) | 16 | src/engine/skills.mjs |
| **2** | Core Sheet UI — 4 actor sheets with sidebar + tabs layout | — | src/components/sheets/\*, sidebar/\*, tabs/\* |
| **3** | Attribute System — drag-and-drop, item sheets, enhancements/limiters, gear budget | — | AttributeRow, DefectRow, GearBudget, BESMItemSheet |
| **4+5** | Skills & Possessions — interactive tabs, specialisations, gear budget in possessions | — | SkillRow, PossessionRow, SkillSheet specialisations |
| **6a** | Roll Engine + Initiative — stat/skill rolls, chat messages, 2d6+ACV initiative | 10 | src/engine/rolls.mjs, src/rolls/BESMRoll.mjs |
| **6b** | Combat — opposed attack/defence, damage, status effects, EP bonus, sanity, social combat | 20 | src/rolls/BESMCombat.mjs, BESMSocial.mjs, statusEffects.mjs |
| **7a** | Character Folders + Linked Actors — auto-folders, Companion/Minion linking, CP validation | — | src/hooks/folderHooks.mjs, LinkedActorBadge |
| **7b** | Alternate Form Token Swap — HP carry-over, status transfer, transformation healing | 8 | src/engine/alternateForm.mjs, src/hooks/alternateForm.mjs |
| **8** | Templates — besm4eTemplate item type, recursive application, badge tracking, generic examples | — | src/engine/templates.mjs, BESMTemplateData, TemplateSheet |
| **10** | Vehicle & Mecha — interactive crew tab, pilot dropdown, pilot stat fusion for CV | — | CrewTab, ActorSidebar pilot section, MechaData fusion |

**Total unit tests: 113** across 6 test files.

## Remaining

| Phase | Description | Notes |
|---|---|---|
| **9** | Compendium Population | Minimal examples only (per Mark's guidance — system must not replace the book). Ship empty compendium packs for GMs to populate. |
| **11** | Polish & QoL | Tailwind styling pass, accessibility audit, en.json localization, compendium browser, settings UI polish, migration scaffolding, README |

## Changes from Original Plan

1. **Phase ordering:** Templates moved from Phase 11 to Phase 8. Vehicle/Mecha moved from Phase 9 to Phase 10. Polish stays last at Phase 11.
2. **Phase 1 split:** Split into 1a (schemas), 1b (CP engine), 1c (skills/SP) for smaller cycles.
3. **Phase 4+5 combined:** Skills and Possessions done together (both were tab upgrades).
4. **Phase 6 split:** Split into 6a (basic rolls + initiative) and 6b (combat + damage + social).
5. **Phase 7 split:** Split into 7a (folders + linked actors) and 7b (alternate form token swap). Shared Assets deferred.
6. **Phase 9 scope reduced:** No full book data — generic examples only per licensing guidance.

## Errata Applied to Master Plan

1. Opposed roll ties: attacker wins (fixed prose, code was already correct)
2. All Svelte 5 runes — no Svelte 4 patterns
3. Settings keys `allowStatsAbove12` and `allowGeniusSkills` added (were missing)
4. Initiative label: "ACV + 2d6" (was mislabeled as "CV + 1d6")
5. Template document type: Item sub-type via TypeDataModel (not custom Document class)
6. System ID: `besm` (matches folder name, not `besm4e`)
7. CSS filename: `besm4e.css` (Vite output, not `style.css`)
8. Tailwind preflight disabled (was breaking Foundry icons)
9. Foundry V14 API: `renderChatMessageHTML` hook (not deprecated `renderChatMessage`)
10. Foundry V14 API: `DialogV2.wait()` buttons as array (not object)
11. Foundry V14 API: `foundry.documents.collections.Actors` (namespaced, not global `Actors`)
12. Foundry V14 API: `StringField` choices cannot include empty string — use `nullable: true` instead
13. All `<button>` elements require `type="button"` to prevent Foundry form submission interception
14. Actor/item sheet reactivity: `{#key version}` pattern with version counter to force re-render after Foundry's in-place document mutations
