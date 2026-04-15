# BESM 4th Edition — Playtester Guide

## Requirements

- Foundry VTT V14
- A copy of the BESM 4th Edition rulebook (the system does not replace the book)

## Installation

Get the system files from the repository and place them in your Foundry `Data/systems/besm/` directory. Create a new World and select "BESM 4th Edition" as the system.

## What's Working

This is a pre-release build. All core mechanics are implemented but the UI is functional rather than polished.

### Character Creation

1. **Create a Character** — Actors sidebar > Create Actor > type "character"
2. **Set Stats** — Body, Mind, Soul are on the sidebar. Default 50 CP base; stats cost 2 CP each (4 CP above 12 if enabled in settings)
3. **Derived Values** — HP, EP, ACV, DCV, Initiative, Damage Multiplier, Armour Rating all auto-calculate from stats

### Attributes & Defects

- **Compendiums** — Open the Compendium tab. Drag attributes, defects, enhancements, limiters, or skills directly onto a character sheet
- **Manual entry** — You can also create items directly on the Attributes or Defects tab
- **Enhancements & Limiters** — Drag these onto an attribute to modify its effective level and cost
- **Weapon Attributes** — Check "Is Weapon" on an attribute to reveal damage, range, and accuracy fields
- **Unique Attributes** — Check "Is Unique" for custom-negotiated attributes with tier pricing
- **CP Tracking** — The sidebar shows CP spent vs. remaining in real time

### Skills

- **Skill Mode** — Set in world settings: "Point Buy" (individual skills with SP) or "Skill Groups" (attribute-based, CP cost)
- **Drag from compendium** — Skills come pre-configured with linked stat and cost class
- **Specialisations** — Click into a skill to add specialisations (free or costed)
- **SP Pool** — Point Buy characters get SP from the Skills attribute; spent/remaining shown on sidebar

### Possessions & Gear

- **Possessions Tab** — Add gear, features, or other items
- **Gear Budget** — Characters with the Gear attribute get a budget; possessions marked "Mechanical" deduct from it

### Templates (Race/Class/Size)

- **Create a Template** — Items sidebar > Create Item > type "besm4eTemplate"
- **Apply to Character** — Drag the template onto a character to apply its entries (attributes, defects, skills, etc.)
- **Stacking** — Multiple templates can be applied; badges show which templates contributed each item

### Rolling

- **Stat Rolls** — Click a stat name on the sidebar to roll 2d6 + stat
- **Skill Rolls** — Click a skill's linked stat to roll
- **Attack/Defence** — Use the combat controls for opposed rolls with ACV/DCV
- **Initiative** — Foundry combat tracker uses "ACV + 2d6" by default (configurable to static CV)

### Combat

- **Opposed Rolls** — Attacker rolls ACV + 2d6 vs. defender DCV + 2d6; attacker wins ties
- **Damage** — Auto-calculated from weapon damage * damage multiplier, minus target armour
- **Status Effects** — Standard BESM status effects available in the token HUD
- **EP Bonus Damage** — Spend Energy Points for bonus damage on attacks

### Vehicles & Mecha

- **Vehicle Actor** — Create actor type "vehicle"; has crew/passenger management
- **Mecha Actor** — Create actor type "mecha"; assign a pilot via dropdown, pilot stats fuse with mecha for CV calculations
- **Crew Tab** — Add/remove crew members, assign roles

### Alternate Forms

- **Alternate Form attribute** — When a character with this attribute transforms, HP carries over, status effects transfer
- **Token Swap** — Linked actors swap on the canvas when transforming

### Companions & Linked Actors

- **Companion attribute** — Linked actors auto-organize into character folders
- **CP Validation** — Companion CP budgets tracked against the parent character

## Compendium Packs

Five packs ship with the system:

| Pack | Items | Contents |
|------|-------|----------|
| Attributes | 97 | All attributes from BESM4e, Ikaris, Multiverse, Extras, Naked |
| Defects | 47 | All defects with rank descriptions |
| Enhancements | 45 | Attribute enhancements with level costs |
| Limiters | 58 | Attribute limiters with level descriptions |
| Skills | 65 | All skills with default linked stats |

Each item has a `source` field showing which book it comes from. Descriptions are short summaries — you'll still need the book for full rules.

## World Settings

Configure under Settings > Configure Settings > System Settings:

| Setting | Default | What It Does |
|---------|---------|-------------|
| Skill Mode | Point Buy | "Point Buy" or "Skill Groups" |
| Power Level | Adventurer | Benchmark tier (Sub-Human through Godlike) |
| Base CP | 50 | Starting Character Points |
| Enforce Benchmarks | On | Warn when exceeding power level caps |
| Benchmark Warnings Only | On | Advisory vs. hard blocks |
| Sanity Points | Off | Horror/occult genre addition |
| Social Combat | Off | Adds SoCV and Society Points |
| Track Movement | Off | Show movement speeds on sheet |
| Stats Above 12 | Off | Enable 4 CP/point stats above 12 |
| Genius Skills | Off | Lift skill rank cap above 6 |
| Genius Max Rank | 12 | Cap when Genius Skills enabled |
| Initiative Mode | ACV + 2d6 | Rolled or static initiative |
| Gear Budget Per Level | 5 | Points per Gear attribute level |

## Known Limitations

- **Visual polish is minimal** — functional dark theme, but spacing, icons, and layout are rough
- **Description fields show plain text** — HTML rendering coming in next phase
- **No compendium browser filtering** — you can browse packs but there's no search/filter UI yet
- **No localization** — English only, hardcoded strings
- **No migration system** — if data models change, manual updates may be needed
- **Genre skill costs** — the Multi-Genre flat cost table works; genre-specific cost overrides (Fantasy subgenres, etc.) are not yet wired into the UI

## Reporting Issues

When reporting a bug, please include:
1. What you did (steps to reproduce)
2. What you expected to happen
3. What actually happened
4. Browser console errors if any (F12 > Console tab)
