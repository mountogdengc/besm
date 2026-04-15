# Changelog

## 0.0.2 (2026-04-15)

### Character Sheet
- Sidebar widened for readability; all abbreviations spelled out (HP → Health Points, ACV → Attack Combat Value, etc.)
- Power Level and Base CP moved from system settings to individual character sheets, allowing different power levels in the same world
- Editable Base CP input in sidebar; Power Level dropdown with "Use System Default" option
- Health, Energy, Sanity, and Society Points now initialize at maximum for new characters
- Damage Multiplier display simplified — melee variant only shown when it differs from base
- Armour Rating now calculated correctly (level × 5, not raw level)
- Removed redundant combat values grid from Combat tab (all derived stats in sidebar)

### Attributes & Defects
- New book-accurate display format: Level(Effective) CP Name (Options; Enhancements; Limiters)
- Defect rows now display as: Rank CP Name
- Added selectedOptions field for recording attribute choices (e.g., element type, technique name)
- Options editable as comma-separated input on attribute sheet

### Combat
- Lightning Reflexes (Combat Technique) now adds +3 to initiative
- Combat Technique detection improved — checks both selectedOptions and item name (supports Hardboiled, Lightning Reflexes, etc.)
- Initiative formula uses derived initiative value instead of raw ACV
- Edges and Obstacles system: Minor Edge (3d6 keep highest 2), Major Edge (4d6kh2), Minor Obstacle (3d6 keep lowest 2), Major Obstacle (4d6kl2)
- Roll cards posted to chat with radio button options before rolling — no more popup dialogs
- Discarded dice shown struck-through in chat roll results
- Combat tab now shows weapon attacks list with roll buttons, damage info, and weapon properties
- Sanity and Social Combat roll buttons kept on Combat tab

### Templates
- Template sheet redesigned — drag-and-drop attributes, defects, and nested templates instead of JSON editing
- Stat modifiers (Body, Mind, Soul) on race/class/bundle templates, applied when template is dropped on character
- New template types: Power Bundle (pre-built attribute collections with tradition) and Power Pack (enhancement/limiter collections)
- Power Packs can be dropped onto attribute rows to apply all enhancements/limiters at once
- Tradition field for Power Bundles and Power Packs

### Items & Auto-Cost
- Item attribute (baseCostPerLevel 0) with linked actor auto-calculates cost as half the linked actor's CP spent
- LinkedActorBadge shows "Cost: X CP" for Item-type attributes
- Window title bars now show plain text instead of localization keys
- Type labels registered for all Actor and Item types

### Compendium Packs (new)
- Race Templates (10): Elf, Android, Enhanced Human, Xeno, Human, Reincarnated Soul, Cyborg, Demigod, Mutant, Dhampir
- Class Templates (10): Battle Mage, Starship Pilot, Mecha Pilot, Smuggler, Transfer Student, Overpowered Hero, Netrunner, Ronin, Scavenger, Occult Investigator
- Size Templates (21): Point (Rank -10) through Monumental (Rank 10)
- Weapons (43): Splash, archaic melee/ranged/siege, modern melee/ranged/ordnance, futuristic melee/ranged
- Armour (21): Animal, archaic, modern, futuristic, shields
- Items (23): Protective devices, adventuring gear, vehicles, items of power
- Bestiary (20): 2 NPCs per genre across 10 genres (fodder + peer/tough)
- Vehicles & Mecha, Power Packs, Power Bundles compendium packs (empty, ready for content)

### Attribute Cost Fixes
- Size Change: 3 → 10 CP/level
- Item: 1 → 0 CP/level (half-cost, set per instance)
- Unique Attribute: 0 → 1 CP/level (variable 1-10, defaults to 1)
- Unknown Power: 1 → 0 CP/level (variable, set per instance)

## 0.0.1 (Pre-release)

### Character System
- Character, NPC, Vehicle, and Mecha actor types with dedicated sheets
- Body, Mind, Soul stats with CP cost tracking (2 CP each, 4 CP above 12)
- All derived values auto-calculate: HP, EP, ACV, DCV, Initiative, Damage Multiplier, Armour Rating, movement speeds
- Power level benchmarks (Sub-Human through Godlike) with optional enforcement
- 8 configurable power level tiers

### Attributes & Defects
- Drag-and-drop from compendium or manual creation
- Enhancements and limiters modify effective level and cost
- Weapon attributes with damage, range, and accuracy
- Unique attributes with tier-based pricing
- Gear attribute with budget tracking for possessions

### Skills
- Point Buy mode (SP cost per rank) or Skill Groups mode (CP-based)
- Three-layer cost resolution: framework base, genre override, world override
- Specialisations (free or costed)
- Genius Skills option for rank cap above 6

### Templates
- Race, Class, and Size template items
- Drag onto character to apply entries (attributes, defects, skills)
- Multiple templates can stack; badge tracking shows origin

### Combat
- Stat and skill rolls (2d6 + stat)
- Opposed attack/defence rolls (ACV vs DCV); attacker wins ties
- Damage calculation with weapon damage multiplier and armour reduction
- EP bonus damage spending
- Status effects via token HUD
- Initiative: ACV + 2d6 (rolled) or static CV
- Sanity Points (optional, for horror genres)
- Social Combat with SoCV and Society Points (optional)

### Vehicles & Mecha
- Vehicle actor with crew and passenger management
- Mecha actor with pilot assignment via dropdown
- Pilot stat fusion for mecha Combat Value calculations

### Companions & Alternate Forms
- Companion/Minion linked actors with auto-folder organization
- CP budget validation for companions
- Alternate Form token swap with HP carry-over and status transfer
- Transformation healing option

### Compendium Packs
- 97 Attributes (from BESM4e, Ikaris, Multiverse, Extras, Naked)
- 47 Defects with rank descriptions
- 45 Enhancements with level costs
- 58 Limiters with level descriptions
- 65 Skills with default linked stats
- Source field on all items for filtering by book

### World Settings
- Skill Mode, Power Level, Base CP
- Benchmark enforcement (warnings or hard blocks)
- Sanity Points, Social Combat, Movement Tracking toggles
- Stats Above 12, Genius Skills options
- Initiative Mode, Gear Budget Per Level
- World Skill Overrides (GM layer)
