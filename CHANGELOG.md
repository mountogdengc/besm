# Changelog

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
