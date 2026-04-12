# Phase 4+5 — Skills & Possessions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Skills and Possessions tabs to be fully interactive with drag-and-drop, click-to-edit, skill availability/flavor display, specialisation management, and gear budget in the Possessions tab.

**Architecture:** New `SkillRow` and `PossessionRow` components follow the same pattern as `AttributeRow`/`DefectRow` from Phase 3. `SkillsTab` and `PossessionsTab` are rewritten to use these components with drop handlers. `SkillSheet` is upgraded with specialisation management. `GearBudget` moves from AttributesTab to PossessionsTab.

**Tech Stack:** Svelte 5 (runes), Tailwind CSS, Foundry VTT V14

**Spec:** `docs/superpowers/specs/2026-04-12-phase4-5-skills-possessions-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/ui/SkillRow.svelte` | Create | Interactive skill row with specialisation tags |
| `src/components/ui/PossessionRow.svelte` | Create | Interactive possession row with category/mechanical badges |
| `src/components/tabs/SkillsTab.svelte` | Modify | Use SkillRow, add drop handler, reuse AttributeRow for groups |
| `src/components/tabs/PossessionsTab.svelte` | Modify | Use PossessionRow, add drop handler, add GearBudget |
| `src/components/tabs/AttributesTab.svelte` | Modify | Remove GearBudget |
| `src/components/items/SkillSheet.svelte` | Modify | Add specialisation management |

---

### Task 1: SkillRow and PossessionRow Components

**Files:**
- Create: `src/components/ui/SkillRow.svelte`
- Create: `src/components/ui/PossessionRow.svelte`

- [ ] **Step 1: Create SkillRow.svelte**

```svelte
<script>
  let { skill } = $props();

  let unavailable = $derived(!skill.system.isAvailable);
  let specialisations = $derived(skill.system.specialisations ?? []);

  function openSheet() {
    skill.sheet.render(true);
  }
</script>

<div
  class="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50 {unavailable ? 'opacity-40 line-through' : ''}"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-slate-200 font-medium {skill.system.isFlavor ? 'italic' : ''}">
    {skill.name}
    {#if skill.system.isFlavor}
      <span class="text-slate-500 no-underline">(flavor)</span>
    {/if}
  </span>

  <span class="text-slate-400">Rank {skill.system.rank}</span>
  <span class="text-slate-500">{skill.system.linkedStat}</span>

  {#each specialisations as spec}
    <span class="inline-flex items-center px-1 py-0.5 rounded text-xs {spec.isFree ? 'bg-emerald-900/50 text-emerald-300' : 'bg-amber-900/50 text-amber-300'}">
      {spec.name}
      {#if spec.isFree}
        <span class="ml-0.5 text-emerald-500">(free)</span>
      {:else}
        <span class="ml-0.5 text-amber-500">({spec.spCost} SP)</span>
      {/if}
    </span>
  {/each}

  <span class="text-slate-400 ml-auto">{skill.system.totalSpCost} SP</span>
</div>
```

- [ ] **Step 2: Create PossessionRow.svelte**

```svelte
<script>
  let { possession, actor } = $props();

  let linkedAttrName = $derived(() => {
    if (!possession.system.linkedAttributeId) return null;
    const attr = [...actor.items].find(i => i.id === possession.system.linkedAttributeId);
    return attr?.name ?? null;
  });

  function openSheet() {
    possession.sheet.render(true);
  }
</script>

<div
  class="flex items-center gap-3 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-slate-200 font-medium">{possession.name}</span>

  <span class="px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 text-xs">{possession.system.category}</span>

  <span class="px-1.5 py-0.5 rounded text-xs {possession.system.isMechanical ? 'bg-blue-900 text-blue-300' : 'bg-slate-700 text-slate-400'}">
    {possession.system.isMechanical ? 'mechanical' : 'flavor'}
  </span>

  {#if possession.system.isMechanical && possession.system.budgetCost > 0}
    <span class="text-slate-400">Cost: {possession.system.budgetCost}</span>
  {/if}

  {#if linkedAttrName()}
    <span class="text-slate-500 italic">via {linkedAttrName()}</span>
  {/if}
</div>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SkillRow.svelte src/components/ui/PossessionRow.svelte
git commit -m "feat: add interactive SkillRow and PossessionRow components"
```

---

### Task 2: Upgrade SkillsTab

**Files:**
- Modify: `src/components/tabs/SkillsTab.svelte`

- [ ] **Step 1: Read the current file**

Read `src/components/tabs/SkillsTab.svelte`.

- [ ] **Step 2: Rewrite SkillsTab.svelte**

Replace the entire file:

```svelte
<script>
  import SkillRow from "../ui/SkillRow.svelte";
  import AttributeRow from "../ui/AttributeRow.svelte";

  let { actor } = $props();

  let skills = $derived(
    [...actor.items]
      .filter(i => i.type === "skill")
      .sort((a, b) => {
        if (a.system.isAvailable !== b.system.isAvailable) return a.system.isAvailable ? -1 : 1;
        return a.name.localeCompare(b.name);
      })
  );
  let skillGroups = $derived(
    [...actor.items].filter(i => i.type === "attribute" && i.system.isSkillGroup)
  );

  let isPointBuy = $derived(actor.system.skillMode === "pointbuy");

  async function handleDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch { return; }

    if (data.type !== "Item") return;
    const item = await fromUuid(data.uuid);
    if (!item) return;

    if (isPointBuy && item.type === "skill") {
      await actor.createEmbeddedDocuments("Item", [item.toObject()]);
    } else if (!isPointBuy && item.type === "attribute" && item.system?.isSkillGroup) {
      await actor.createEmbeddedDocuments("Item", [item.toObject()]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="p-3" ondragover={handleDragOver} ondrop={handleDrop}>
  {#if isPointBuy}
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skills (Point Buy)</div>
    {#if skills.length === 0}
      <p class="text-xs text-slate-500 italic">No skills. Drag from compendium to add.</p>
    {:else}
      {#each skills as skill (skill.id)}
        <SkillRow {skill} />
      {/each}
    {/if}
  {:else}
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skill Groups</div>
    {#if skillGroups.length === 0}
      <p class="text-xs text-slate-500 italic">No skill groups. Drag from compendium to add.</p>
    {:else}
      {#each skillGroups as group (group.id)}
        <AttributeRow attribute={group} {actor} />
      {/each}
    {/if}
  {/if}
</div>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/tabs/SkillsTab.svelte
git commit -m "feat: upgrade SkillsTab with interactive rows and drop handling"
```

---

### Task 3: Upgrade PossessionsTab + Move GearBudget

**Files:**
- Modify: `src/components/tabs/PossessionsTab.svelte`
- Modify: `src/components/tabs/AttributesTab.svelte`

- [ ] **Step 1: Read both current files**

Read `src/components/tabs/PossessionsTab.svelte` and `src/components/tabs/AttributesTab.svelte`.

- [ ] **Step 2: Rewrite PossessionsTab.svelte**

Replace the entire file:

```svelte
<script>
  import PossessionRow from "../ui/PossessionRow.svelte";
  import GearBudget from "../ui/GearBudget.svelte";

  let { actor } = $props();

  let possessions = $derived(
    [...actor.items].filter(i => i.type === "possession")
  );

  async function handleDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch { return; }

    if (data.type !== "Item") return;
    const item = await fromUuid(data.uuid);
    if (!item) return;

    if (item.type === "possession") {
      await actor.createEmbeddedDocuments("Item", [item.toObject()]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="p-3" ondragover={handleDragOver} ondrop={handleDrop}>
  <GearBudget {actor} />

  <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Possessions</div>
  {#if possessions.length === 0}
    <p class="text-xs text-slate-500 italic">No possessions. Drag from compendium to add.</p>
  {:else}
    {#each possessions as item (item.id)}
      <PossessionRow possession={item} {actor} />
    {/each}
  {/if}
</div>
```

- [ ] **Step 3: Remove GearBudget from AttributesTab.svelte**

In `src/components/tabs/AttributesTab.svelte`:

Remove the import line:
```
  import GearBudget from "../ui/GearBudget.svelte";
```

Remove the usage line:
```
  <GearBudget {actor} />
```

The resulting file should have imports for `CollapsibleSection`, `AttributeRow`, and `DefectRow` only.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 5: Commit**

```bash
git add src/components/tabs/PossessionsTab.svelte src/components/tabs/AttributesTab.svelte
git commit -m "feat: upgrade PossessionsTab with interactive rows, drop handling, and gear budget"
```

---

### Task 4: Upgrade SkillSheet with Specialisation Management

**Files:**
- Modify: `src/components/items/SkillSheet.svelte`

- [ ] **Step 1: Read the current file**

Read `src/components/items/SkillSheet.svelte`.

- [ ] **Step 2: Rewrite SkillSheet.svelte**

Replace the entire file:

```svelte
<script>
  let { document: itemDocument } = $props();
  let item = $state(itemDocument);
  let newSpecName = $state("");

  $effect(() => {
    const hookId = Hooks.on("updateItem", (updatedItem) => {
      if (updatedItem.id === item.id) item = updatedItem;
    });
    return () => Hooks.off("updateItem", hookId);
  });

  function update(path, value) {
    item.update({ [path]: value });
  }

  let specialisations = $derived(item.system.specialisations ?? []);

  function addSpecialisation() {
    if (!newSpecName.trim()) return;
    const specs = [...specialisations];
    const isFree = specs.length === 0;
    specs.push({ name: newSpecName.trim(), isFree, spCost: isFree ? 0 : 1 });
    item.update({ "system.specialisations": specs });
    newSpecName = "";
  }

  function removeSpecialisation(index) {
    let specs = specialisations.filter((_, i) => i !== index);
    // If the free one was removed and others exist, make the first one free
    if (specs.length > 0 && !specs.some(s => s.isFree)) {
      specs[0] = { ...specs[0], isFree: true, spCost: 0 };
    }
    item.update({ "system.specialisations": specs });
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
      <label class="text-xs text-slate-500 uppercase">Rank</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.rank}
        onchange={(e) => update("system.rank", Number(e.target.value))}
        min="0"
      />
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Cost Class</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.costClass}
        onchange={(e) => update("system.costClass", e.target.value)}
      >
        <option value="framework">Framework (1 SP)</option>
        <option value="adventure">Adventure (2 SP)</option>
        <option value="genre">Genre (3 SP)</option>
      </select>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Linked Stat</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.linkedStat}
        onchange={(e) => update("system.linkedStat", e.target.value)}
      >
        <option value="body">Body</option>
        <option value="mind">Mind</option>
        <option value="soul">Soul</option>
        <option value="bodyMind">Body+Mind</option>
        <option value="bodySoul">Body+Soul</option>
        <option value="mindSoul">Mind+Soul</option>
        <option value="avg">Average</option>
      </select>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">SP Cost</label>
      <span class="block text-sm text-slate-300 p-1">{item.system.totalSpCost}</span>
    </div>
  </div>

  <!-- Flags -->
  <div class="flex gap-3 text-xs">
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isFlavor}
        onchange={(e) => update("system.isFlavor", e.target.checked)} />
      Flavor (no SP cost)
    </label>
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isGeniusSkill}
        onchange={(e) => update("system.isGeniusSkill", e.target.checked)} />
      Genius Skill
    </label>
  </div>

  <!-- Specialisations -->
  <div>
    <div class="text-xs text-slate-500 uppercase mb-1">Specialisations ({specialisations.length})</div>
    {#if specialisations.length === 0}
      <p class="text-xs text-slate-500 italic mb-2">None. First specialisation is free.</p>
    {:else}
      {#each specialisations as spec, i}
        <div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs">
          <span class="text-slate-200">{spec.name}</span>
          <span class="{spec.isFree ? 'text-emerald-400' : 'text-amber-400'}">
            {spec.isFree ? 'free' : `${spec.spCost} SP`}
          </span>
          <button class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs"
            onclick={() => removeSpecialisation(i)}>Remove</button>
        </div>
      {/each}
    {/if}
    <div class="flex gap-2 mt-2">
      <input
        class="flex-1 bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        placeholder="Specialisation name..."
        bind:value={newSpecName}
        onkeydown={(e) => { if (e.key === "Enter") addSpecialisation(); }}
      />
      <button
        class="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs border-0 cursor-pointer hover:bg-slate-600"
        onclick={addSpecialisation}
      >Add</button>
    </div>
  </div>

  <!-- Description -->
  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>
</div>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/items/SkillSheet.svelte
git commit -m "feat: upgrade SkillSheet with specialisation management"
```

---

### Task 5: Foundry Visual Verification

**Files:**
- None — manual testing in Foundry VTT V14

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Run setup script**

Paste into browser console:

```js
(async () => {
  let char = await Actor.create({name: "Skills Test", type: "character"});
  await char.update({"system.stats.body.value": 5, "system.stats.mind.value": 5, "system.stats.soul.value": 5});
  await char.createEmbeddedDocuments("Item", [
    {name: "Skills", type: "attribute", system: {baseCostPerLevel: 2, purchasedLevel: 4, isSkillsAttribute: true}},
    {name: "Acrobatics", type: "skill", system: {rank: 3, costClass: "framework", linkedStat: "body"}},
    {name: "Military Sciences", type: "skill", system: {rank: 2, costClass: "adventure", linkedStat: "mind"}},
    {name: "Cooking", type: "skill", system: {rank: 1, costClass: "framework", isFlavor: true, linkedStat: "mind"}},
    {name: "Gear", type: "attribute", system: {baseCostPerLevel: 2, purchasedLevel: 3}},
    {name: "Sword", type: "possession", system: {category: "gear", isMechanical: true, budgetCost: 3}},
    {name: "Lucky Charm", type: "possession", system: {category: "other", isMechanical: false}},
  ]);
  console.log("Done - open Skills Test sheet to verify:");
  console.log("1. Skills tab: Acrobatics (3 SP), Military Sciences (4 SP), Cooking (flavor, 0 SP)");
  console.log("2. Click Acrobatics - add a specialisation in the sheet");
  console.log("3. Possessions tab: Sword (mechanical, cost 3), Lucky Charm (flavor)");
  console.log("4. Gear Budget should show in Possessions tab");
})();
```

- [ ] **Step 3: Visual checks**

1. Open "Skills Test" character sheet
2. **Skills tab:** Three skills listed — Acrobatics (Rank 3, body, 3 SP), Military Sciences (Rank 2, mind, 4 SP), Cooking (italic, "(flavor)", 0 SP)
3. **Click Acrobatics** → skill sheet opens with rank, cost class, linked stat, specialisations section
4. **Add a specialisation** → type "Tumbling", press Enter or click Add → appears as "(free)"
5. **Add another** → type "Dodging", press Enter → appears as "(1 SP)"
6. **Close skill sheet** → specialisation tags visible on the skill row in the tab
7. **Possessions tab:** Sword (gear, mechanical, Cost: 3), Lucky Charm (other, flavor)
8. **Gear Budget** displayed at top of Possessions tab
9. **Click Sword** → possession sheet opens

- [ ] **Step 4: Clean up**

```js
for (const a of game.actors) await a.delete();
for (const i of game.items) await i.delete();
```
