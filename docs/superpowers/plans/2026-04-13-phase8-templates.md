# Phase 8 — Template Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the template engine — a `besm4eTemplate` Item sub-type with recursive application, badge tracking, and generic example templates (no book content).

**Architecture:** `BESMTemplateData` TypeDataModel defines template schema. `applyTemplate()` in `src/engine/templates.mjs` handles recursive application with circular reference guard. `TemplateSheet` Svelte component for editing. `TemplateBadges` component shows applied templates on the character sheet. Templates are dropped onto the character sheet to apply.

**Tech Stack:** Vitest (for applyTemplate unit test stubs), Foundry VTT V14, Svelte 5

**Spec:** `docs/superpowers/specs/2026-04-13-phase8-templates-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/models/items/BESMTemplateData.mjs` | Create | Template TypeDataModel schema |
| `src/engine/templates.mjs` | Create | applyTemplate() function |
| `src/components/items/TemplateSheet.svelte` | Create | Template editor UI |
| `src/components/ui/TemplateBadges.svelte` | Create | Applied template badges |
| `src/components/sheets/CharacterSheet.svelte` | Modify | Add badges + template drop handler |
| `src/sheets/BESMItemSheet.mjs` | Modify | Add template to component map |
| `system.json` | Modify | Add besm4eTemplate to documentTypes.Item |
| `src/besm4e.mjs` | Modify | Register template model + sheet type |

---

### Task 1: BESMTemplateData Model

**Files:**
- Create: `src/models/items/BESMTemplateData.mjs`

- [ ] **Step 1: Create BESMTemplateData.mjs**

```js
export class BESMTemplateData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      templateType: new fields.StringField({
        initial: "race",
        choices: ["race", "class", "size"],
      }),
      description: new fields.HTMLField(),
      pointTotal: new fields.NumberField({ integer: true, initial: 0 }),
      sizeRank: new fields.NumberField({ integer: true, initial: 0, nullable: true }),
      entries: new fields.ArrayField(new fields.ObjectField()),
    };
  }
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/models/items/BESMTemplateData.mjs
git commit -m "feat: add BESMTemplateData TypeDataModel for templates"
```

---

### Task 2: Template Application Function

**Files:**
- Create: `src/engine/templates.mjs`

- [ ] **Step 1: Create templates.mjs**

```js
export async function applyTemplate(template, actor, applying = new Set()) {
  if (applying.has(template.id)) {
    console.warn(`BESM | Circular template reference detected: ${template.name}`);
    return;
  }
  applying.add(template.id);

  const itemEntries = [];

  for (const entry of template.system.entries) {
    if (entry.entryType === "item") {
      itemEntries.push({
        name: entry.name,
        type: entry.itemType,
        system: {
          ...entry.systemData,
          sourceTemplateId: template.id,
          sourceTemplateName: template.name,
        },
      });
    } else if (entry.entryType === "template") {
      const nested = await fromUuid(entry.templateId);
      if (!nested) {
        console.warn(`BESM | Nested template not found: ${entry.templateId}`);
        continue;
      }
      await applyTemplate(nested, actor, applying);
    }
  }

  if (itemEntries.length > 0) {
    await actor.createEmbeddedDocuments("Item", itemEntries);
  }

  const appliedTemplates = [...(actor.system.appliedTemplates ?? [])];
  appliedTemplates.push({
    id: template.id,
    name: template.name,
    type: template.system.templateType,
    pointTotal: template.system.pointTotal,
    appliedAt: Date.now(),
  });
  await actor.update({ "system.appliedTemplates": appliedTemplates });

  applying.delete(template.id);
}
```

Note: `fromUuid` is a Foundry global — do not import it.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/engine/templates.mjs
git commit -m "feat: add applyTemplate function with recursive application and circular guard"
```

---

### Task 3: TemplateSheet Component

**Files:**
- Create: `src/components/items/TemplateSheet.svelte`

- [ ] **Step 1: Create TemplateSheet.svelte**

```svelte
<script>
  let { document: itemDocument } = $props();
  let item = $state(itemDocument);

  $effect(() => {
    const hookId = Hooks.on("updateItem", (updatedItem) => {
      if (updatedItem.id === item.id) item = updatedItem;
    });
    return () => Hooks.off("updateItem", hookId);
  });

  function update(path, value) {
    item.update({ [path]: value });
  }

  let entries = $derived(item.system.entries ?? []);

  function addItemEntry() {
    const newEntries = [...entries, {
      entryType: "item",
      name: "New Attribute",
      itemType: "attribute",
      systemData: { baseCostPerLevel: 1, purchasedLevel: 1 },
    }];
    item.update({ "system.entries": newEntries });
  }

  function addTemplateEntry() {
    const newEntries = [...entries, {
      entryType: "template",
      templateId: "",
      templateName: "Nested Template",
    }];
    item.update({ "system.entries": newEntries });
  }

  function removeEntry(index) {
    const newEntries = entries.filter((_, i) => i !== index);
    item.update({ "system.entries": newEntries });
  }

  function updateEntry(index, field, value) {
    const newEntries = entries.map((e, i) => {
      if (i !== index) return e;
      return { ...e, [field]: value };
    });
    item.update({ "system.entries": newEntries });
  }

  function updateEntrySystemData(index, value) {
    try {
      const parsed = JSON.parse(value);
      const newEntries = entries.map((e, i) => {
        if (i !== index) return e;
        return { ...e, systemData: parsed };
      });
      item.update({ "system.entries": newEntries });
    } catch {
      ui.notifications.warn("Invalid JSON for system data.");
    }
  }
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <!-- Name -->
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => item.update({ name: e.target.value })}
  />

  <!-- Core Fields -->
  <div class="grid grid-cols-2 gap-2">
    <div>
      <label class="text-xs text-slate-500 uppercase">Template Type</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.templateType}
        onchange={(e) => update("system.templateType", e.target.value)}
      >
        <option value="race">Race</option>
        <option value="class">Class</option>
        <option value="size">Size</option>
      </select>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Point Total (info only)</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.pointTotal}
        onchange={(e) => update("system.pointTotal", Number(e.target.value))}
      />
    </div>
  </div>

  {#if item.system.templateType === "size"}
    <div>
      <label class="text-xs text-slate-500 uppercase">Size Rank</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.sizeRank ?? 0}
        onchange={(e) => update("system.sizeRank", Number(e.target.value))}
      />
    </div>
  {/if}

  <!-- Description -->
  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>

  <!-- Entries -->
  <div>
    <div class="text-xs text-slate-500 uppercase mb-1">Entries ({entries.length})</div>

    {#each entries as entry, i}
      <div class="border border-slate-700 rounded p-2 mb-2">
        <div class="flex items-center justify-between mb-1">
          <span class="text-xs font-bold {entry.entryType === 'item' ? 'text-blue-400' : 'text-purple-400'}">
            {entry.entryType === "item" ? "Item" : "Template Ref"}
          </span>
          <button class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs"
            onclick={() => removeEntry(i)}>Remove</button>
        </div>

        {#if entry.entryType === "item"}
          <div class="grid grid-cols-2 gap-1 text-xs">
            <input class="bg-slate-800 border border-slate-700 rounded p-1 text-slate-100"
              placeholder="Name"
              value={entry.name}
              onchange={(e) => updateEntry(i, "name", e.target.value)}
            />
            <select class="bg-slate-800 border border-slate-700 rounded p-1 text-slate-100"
              value={entry.itemType}
              onchange={(e) => updateEntry(i, "itemType", e.target.value)}
            >
              <option value="attribute">Attribute</option>
              <option value="defect">Defect</option>
            </select>
          </div>
          <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 p-1 mt-1 h-12 resize-y font-mono"
            placeholder='{"baseCostPerLevel": 1, "purchasedLevel": 1}'
            value={JSON.stringify(entry.systemData ?? {}, null, 2)}
            onchange={(e) => updateEntrySystemData(i, e.target.value)}
          ></textarea>
        {:else}
          <input class="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-slate-100"
            placeholder="Template UUID"
            value={entry.templateId ?? ""}
            onchange={(e) => updateEntry(i, "templateId", e.target.value)}
          />
          <input class="w-full bg-slate-800 border border-slate-700 rounded p-1 text-xs text-slate-100 mt-1"
            placeholder="Display name"
            value={entry.templateName ?? ""}
            onchange={(e) => updateEntry(i, "templateName", e.target.value)}
          />
        {/if}
      </div>
    {/each}

    <div class="flex gap-2">
      <button class="px-2 py-1 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600"
        onclick={addItemEntry}>Add Item Entry</button>
      <button class="px-2 py-1 bg-purple-700 text-purple-100 rounded border-0 cursor-pointer text-xs hover:bg-purple-600"
        onclick={addTemplateEntry}>Add Template Ref</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/items/TemplateSheet.svelte
git commit -m "feat: add TemplateSheet component for editing templates"
```

---

### Task 4: TemplateBadges Component

**Files:**
- Create: `src/components/ui/TemplateBadges.svelte`

- [ ] **Step 1: Create TemplateBadges.svelte**

```svelte
<script>
  let { actor } = $props();

  let badges = $derived(actor.system.appliedTemplates ?? []);

  const typeColors = {
    race: "bg-emerald-900 text-emerald-300",
    class: "bg-blue-900 text-blue-300",
    size: "bg-amber-900 text-amber-300",
  };
</script>

{#if badges.length > 0}
  <div class="flex flex-wrap gap-1 px-3 py-1.5 border-b border-slate-700">
    {#each badges as badge}
      <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs {typeColors[badge.type] ?? 'bg-slate-700 text-slate-300'}">
        <span class="font-medium capitalize">{badge.type}:</span>
        {badge.name}
      </span>
    {/each}
  </div>
{/if}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/TemplateBadges.svelte
git commit -m "feat: add TemplateBadges component for applied template display"
```

---

### Task 5: Integrate Templates into CharacterSheet + Item Sheet

**Files:**
- Modify: `src/components/sheets/CharacterSheet.svelte`
- Modify: `src/sheets/BESMItemSheet.mjs`

- [ ] **Step 1: Read CharacterSheet.svelte**

Read `src/components/sheets/CharacterSheet.svelte`.

- [ ] **Step 2: Update CharacterSheet.svelte**

Replace the entire file:

```svelte
<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import BenchmarkPanel from "../ui/BenchmarkPanel.svelte";
  import TemplateBadges from "../ui/TemplateBadges.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import SkillsTab from "../tabs/SkillsTab.svelte";
  import PossessionsTab from "../tabs/PossessionsTab.svelte";
  import CombatTab from "../tabs/CombatTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";
  import { applyTemplate } from "../../engine/templates.mjs";

  let { document: actorDocument } = $props();
  let actor = $state(actorDocument);
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "skills", label: "Skills" },
    { id: "possessions", label: "Possessions" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) {
        actor = updatedActor;
      }
    });
    return () => Hooks.off("updateActor", hookId);
  });

  async function handleTemplateDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch { return; }

    if (data.type !== "Item") return;
    const item = await fromUuid(data.uuid);
    if (!item || item.type !== "besm4eTemplate") return;

    await applyTemplate(item, actor);
    ui.notifications.info(`Applied template: ${item.name}`);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex h-full bg-slate-900 text-slate-100" ondragover={handleDragOver} ondrop={handleTemplateDrop}>
  <ActorSidebar {actor} showSP={true} showEP={true} showCV={true} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />
    <TemplateBadges {actor} />
    <BenchmarkPanel warnings={actor.system.benchmarkWarnings} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "skills"}
        <SkillsTab {actor} />
      {:else if activeTab === "possessions"}
        <PossessionsTab {actor} />
      {:else if activeTab === "combat"}
        <CombatTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
```

Changes: added TemplateBadges import + render between TabBar and BenchmarkPanel, added applyTemplate import + drop handler on the outer div.

- [ ] **Step 3: Read BESMItemSheet.mjs**

Read `src/sheets/BESMItemSheet.mjs`.

- [ ] **Step 4: Update BESMItemSheet.mjs**

Add the TemplateSheet import after the SkillSheet import:

```js
import TemplateSheet from "../components/items/TemplateSheet.svelte";
```

Add to COMPONENT_MAP:

```js
  besm4eTemplate: TemplateSheet,
```

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/components/sheets/CharacterSheet.svelte src/sheets/BESMItemSheet.mjs
git commit -m "feat: integrate templates into CharacterSheet with drop handler and badges"
```

---

### Task 6: Register Template Model in System Manifest and Entry Point

**Files:**
- Modify: `system.json`
- Modify: `src/besm4e.mjs`

- [ ] **Step 1: Read system.json**

Read `system.json`.

- [ ] **Step 2: Update system.json**

In the `documentTypes.Item` object, add after `"skill": {}`:

```json
      "besm4eTemplate": {}
```

- [ ] **Step 3: Read besm4e.mjs**

Read `src/besm4e.mjs`.

- [ ] **Step 4: Update besm4e.mjs**

Add import at the top:
```js
import { BESMTemplateData } from "./models/items/BESMTemplateData.mjs";
```

Inside the init hook, after `CONFIG.Item.dataModels.skill = SkillData;`, add:
```js
  CONFIG.Item.dataModels.besm4eTemplate = BESMTemplateData;
```

In the `Items.registerSheet` call, add `"besm4eTemplate"` to the types array:
```js
    types: ["attribute", "defect", "enhancement", "limiter", "possession", "skill", "besm4eTemplate"],
```

- [ ] **Step 5: Build and test**

Run: `npm run build && npx vitest run`
Expected: Build succeeds, all tests pass

- [ ] **Step 6: Commit**

```bash
git add system.json src/besm4e.mjs
git commit -m "feat: register BESMTemplateData model and template item type"
```

---

### Task 7: Foundry Verification

**Files:**
- None — manual testing

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Create a character**

Create a character actor named "Template Test" with Body 5, Mind 5, Soul 5.

- [ ] **Step 3: Create a template item**

In the Items sidebar, create a new item. Select type "besm4eTemplate". Name it "Example Race: Hardy".

Open the item sheet. Set:
- Template Type: Race
- Point Total: 4
- Click "Add Item Entry"
- Set entry name to "Tough", item type to "attribute"
- Set system data to: `{"baseCostPerLevel": 2, "purchasedLevel": 2}`

- [ ] **Step 4: Apply the template**

Drag "Example Race: Hardy" from the Items sidebar onto the "Template Test" character sheet.

Check:
- A notification appears: "Applied template: Example Race: Hardy"
- The Attributes tab shows a "Tough" attribute (Lv 2, 4 CP)
- A green "Race: Example Race: Hardy" badge appears between the tab bar and benchmark panel
- The CP totals update to include the Tough attribute's cost

- [ ] **Step 5: Create a second template to test nesting**

Create another template "Example Class: Warrior" with two item entries:
- "Attack Mastery", type "attribute", system: `{"baseCostPerLevel": 3, "purchasedLevel": 1}`
- "Defence Mastery", type "attribute", system: `{"baseCostPerLevel": 3, "purchasedLevel": 1}`

Drop it on the character. Check:
- Both attributes appear
- A blue "Class: Example Class: Warrior" badge appears alongside the race badge

- [ ] **Step 6: Clean up**

```js
for(const a of game.actors)await a.delete();for(const i of game.items)await i.delete();
```
