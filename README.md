# BESM 4th Edition for Foundry VTT

An unofficial Foundry VTT system for Big Eyes, Small Mouth 4th Edition.

## Requirements

- Foundry VTT V14+
- A copy of the BESM 4th Edition rulebook

## Installation

1. Download or clone this repository into your Foundry `Data/systems/besm/` directory
2. Run `npm install` and `npm run build`
3. Run `npm run build:packs` to compile compendium packs
4. Launch Foundry and create a world using the "BESM 4th Edition" system

## Features

- **4 actor types** — Character, NPC, Vehicle, Mecha
- **Full CP/SP tracking** — stats, attributes, defects, skills with real-time cost calculations
- **312 compendium items** — attributes, defects, enhancements, limiters, and skills from BESM4e, Ikaris, Multiverse, Extras, and Naked sourcebooks
- **Drag-and-drop** — drag items from compendiums onto character sheets
- **Enhancements & Limiters** — modify attribute effective levels and costs
- **Skill system** — Point Buy or Skill Groups mode, with specialisations
- **Templates** — race, class, and size templates that apply entries to characters
- **Roll engine** — stat rolls, skill rolls, opposed attack/defence, initiative
- **Combat** — damage calculation, status effects, EP bonus damage, sanity, social combat
- **Vehicles & Mecha** — crew management, pilot stat fusion for mecha CV
- **Alternate Forms** — token swap with HP carry-over and status transfer
- **Companions** — linked actor folders with CP budget validation
- **Configurable** — 15 world settings for power level, genre options, benchmarks, and more

## Playtesting

See [docs/PLAYTESTER-GUIDE.md](docs/PLAYTESTER-GUIDE.md) for a detailed walkthrough of all features and known limitations.

## Development

```bash
npm install          # Install dependencies
npm run dev          # Vite dev server with HMR
npm run build        # Production build
npm run build:packs  # Compile compendium packs
npm test             # Run unit tests (113 tests)
```

## License

This system is an unofficial, fan-made project. BESM 4th Edition is published by Dyskami Publishing Company. You must own the rulebook to use this system.
