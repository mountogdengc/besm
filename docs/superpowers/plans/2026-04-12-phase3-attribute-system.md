# Phase 3 — Attribute System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Attributes tab to support drag-and-drop from compendium, interactive attribute/defect rows with click-to-edit, enhancement/limiter embedding on attribute rows, item sheets for all 6 item types, and gear budget tracking.

**Architecture:** New `AttributeRow` and `DefectRow` Svelte components replace the inline markup in `AttributesTab`. A single `BESMItemSheet` DocumentSheetV2 class serves all item types by selecting the right Svelte component based on `document.type`. Enhancement/limiter data is stored as array entries inside the parent attribute, added via drag-and-drop onto the attribute row.

**Tech Stack:** Svelte 5 (runes), Tailwind CSS, Foundry VTT V14 DocumentSheetV2, Foundry drag-and-drop API

**Spec:** `docs/superpowers/specs/2026-04-12-phase3-attribute-system-design.md`

**Note on testing:** UI components are tested visually in Foundry. No unit tests for this phase.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/ui/AttributeRow.svelte` | Create | Interactive attribute row with mod tags + drop zone |
| `src/components/ui/DefectRow.svelte` | Create | Interactive defect row, click to open sheet |
| `src/components/ui/GearBudget.svelte` | Create | Gear budget tracker |
| `src/components/items/AttributeSheet.svelte` | Create | Attribute item edit form |
| `src/components/items/DefectSheet.svelte` | Create | Defect item edit form |
| `src/components/items/EnhancementSheet.svelte` | Create | Enhancement item edit form |
| `src/components/items/LimiterSheet.svelte` | Create | Limiter item edit form |
| `src/components/items/PossessionSheet.svelte` | Create | Possession item stub form |
| `src/components/items/SkillSheet.svelte` | Create | Skill item stub form |
| `src/sheets/BESMItemSheet.mjs` | Create | DocumentSheetV2 for all item types |
| `src/components/tabs/AttributesTab.svelte` | Modify | Use new row components, add drop handler, gear budget |
| `src/besm4e.mjs` | Modify | Register BESMItemSheet |

---

### Task 1: AttributeRow and DefectRow Components

**Files:**
- Create: `src/components/ui/AttributeRow.svelte`
- Create: `src/components/ui/DefectRow.svelte`

- [ ] **Step 1: Create AttributeRow.svelte**

```svelte
<script>
  let { attribute, actor } = $props();

  let enhancements = $derived(attribute.system.enhancements ?? []);
  let limiters = $derived(attribute.system.limiters ?? []);
  let levelMismatch = $derived(attribute.system.purchasedLevel !== attribute.system.effectiveLevel);

  function openSheet() {
    attribute.sheet.render(true);
  }

  async function removeEnhancement(index) {
    const updated = enhancements.filter((_, i) => i !== index);
    await attribute.update({ "system.enhancements": updated });
  }

  async function removeLimiter(index) {
    const updated = limiters.filter((_, i) => i !== index);
    await attribute.update({ "system.limiters": updated });
  }

  async function handleDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch { return; }

    if (data.type !== "Item") return;
    const item = await fromUuid(data.uuid);
    if (!item) return;

    if (item.type === "enhancement") {
      const entry = { id: foundry.utils.randomID(), name: item.name, levels: item.system.levels };
      await attribute.update({ "system.enhancements": [...enhancements, entry] });
    } else if (item.type === "limiter") {
      const entry = { id: foundry.utils.randomID(), name: item.name, levels: item.system.levels };
      await attribute.update({ "system.limiters": [...limiters, entry] });
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="flex flex-wrap items-center gap-x-3 gap-y-1 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"
  onclick={openSheet}
  ondragover={handleDragOver}
  ondrop={handleDrop}
>
  <span class="text-slate-200 font-medium flex-shrink-0">{attribute.name}</span>

  <span class="text-slate-400">
    Lv {attribute.system.purchasedLevel}
    {#if levelMismatch}
      <span class="text-amber-400">→ Eff {attribute.system.effectiveLevel}</span>
    {/if}
  </span>

  {#each enhancements as enh, i}
    <span class="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-sky-900/50 text-sky-300 text-xs">
      {enh.name} -{enh.levels}
      <button
        class="ml-0.5 text-sky-400 hover:text-sky-200 bg-transparent border-0 cursor-pointer text-xs p-0 leading-none"
        onclick={(e) => { e.stopPropagation(); removeEnhancement(i); }}
      >×</button>
    </span>
  {/each}

  {#each limiters as lim, i}
    <span class="inline-flex items-center gap-0.5 px-1 py-0.5 rounded bg-violet-900/50 text-violet-300 text-xs">
      {lim.name} +{lim.levels}
      <button
        class="ml-0.5 text-violet-400 hover:text-violet-200 bg-transparent border-0 cursor-pointer text-xs p-0 leading-none"
        onclick={(e) => { e.stopPropagation(); removeLimiter(i); }}
      >×</button>
    </span>
  {/each}

  <span class="text-slate-400 ml-auto flex-shrink-0">{attribute.system.totalCost} CP</span>
</div>
```

- [ ] **Step 2: Create DefectRow.svelte**

```svelte
<script>
  let { defect } = $props();

  function openSheet() {
    defect.sheet.render(true);
  }
</script>

<div
  class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-red-300">{defect.name}</span>
  <span class="text-slate-400">Rank {defect.system.rankLevel}</span>
  <span class="text-emerald-400">+{defect.system.cpGranted} CP</span>
</div>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/AttributeRow.svelte src/components/ui/DefectRow.svelte
git commit -m "feat: add interactive AttributeRow and DefectRow components"
```

---

### Task 2: GearBudget Component

**Files:**
- Create: `src/components/ui/GearBudget.svelte`

- [ ] **Step 1: Create GearBudget.svelte**

```svelte
<script>
  let { actor } = $props();

  let gearAttr = $derived(
    [...actor.items].find(i => i.type === "attribute" && i.name === "Gear")
  );

  let gearBudgetPerLevel = $state(5);

  $effect(() => {
    try {
      gearBudgetPerLevel = game.settings.get("besm", "gearBudgetPerLevel") ?? 5;
    } catch { /* settings not ready */ }
  });

  let budget = $derived(gearAttr ? gearAttr.system.effectiveLevel * gearBudgetPerLevel : 0);

  let spent = $derived(() => {
    if (!gearAttr) return 0;
    return [...actor.items]
      .filter(i => i.type === "possession" && i.system.isMechanical && i.system.linkedAttributeId === gearAttr.id)
      .reduce((sum, p) => sum + p.system.budgetCost, 0);
  });

  let remaining = $derived(budget - (typeof spent === "function" ? spent() : spent));
  let overBudget = $derived(remaining < 0);
</script>

{#if gearAttr}
  <div class="mx-2 my-2 p-2 border border-slate-700 rounded bg-slate-800/50">
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Gear Budget</div>
    <div class="flex gap-4 text-xs">
      <span class="text-slate-400">Budget: <span class="text-slate-100">{budget}</span></span>
      <span class="text-slate-400">Spent: <span class="text-slate-100">{typeof spent === "function" ? spent() : spent}</span></span>
      <span class="text-slate-400">Remaining: <span class="font-bold {overBudget ? 'text-red-400' : 'text-emerald-400'}">{remaining}</span></span>
    </div>
  </div>
{/if}
```

**Note:** The `$derived` for `spent` involves iteration that needs careful handling. A simpler approach:

Replace the spent/remaining/overBudget derivations with:

```svelte
<script>
  let { actor } = $props();

  let gearAttr = $derived(
    [...actor.items].find(i => i.type === "attribute" && i.name === "Gear")
  );

  let gearBudgetPerLevel = $state(5);

  $effect(() => {
    try {
      gearBudgetPerLevel = game.settings.get("besm", "gearBudgetPerLevel") ?? 5;
    } catch {}
  });

  let budget = $derived(gearAttr ? gearAttr.system.effectiveLevel * gearBudgetPerLevel : 0);

  let spent = $derived(
    gearAttr
      ? [...actor.items]
          .filter(i => i.type === "possession" && i.system.isMechanical && i.system.linkedAttributeId === gearAttr.id)
          .reduce((sum, p) => sum + p.system.budgetCost, 0)
      : 0
  );

  let remaining = $derived(budget - spent);
  let overBudget = $derived(remaining < 0);
</script>

{#if gearAttr}
  <div class="mx-2 my-2 p-2 border border-slate-700 rounded bg-slate-800/50">
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Gear Budget</div>
    <div class="flex gap-4 text-xs">
      <span class="text-slate-400">Budget: <span class="text-slate-100">{budget}</span></span>
      <span class="text-slate-400">Spent: <span class="text-slate-100">{spent}</span></span>
      <span class="text-slate-400">Remaining: <span class="font-bold {overBudget ? 'text-red-400' : 'text-emerald-400'}">{remaining}</span></span>
    </div>
  </div>
{/if}
```

Use this second version — it's cleaner.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GearBudget.svelte
git commit -m "feat: add GearBudget component"
```

---

### Task 3: Item Sheet Svelte Components

**Files:**
- Create: `src/components/items/AttributeSheet.svelte`
- Create: `src/components/items/DefectSheet.svelte`
- Create: `src/components/items/EnhancementSheet.svelte`
- Create: `src/components/items/LimiterSheet.svelte`
- Create: `src/components/items/PossessionSheet.svelte`
- Create: `src/components/items/SkillSheet.svelte`

- [ ] **Step 1: Create AttributeSheet.svelte**

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

  function removeEnhancement(index) {
    const updated = item.system.enhancements.filter((_, i) => i !== index);
    item.update({ "system.enhancements": updated });
  }

  function removeLimiter(index) {
    const updated = item.system.limiters.filter((_, i) => i !== index);
    item.update({ "system.limiters": updated });
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
      <label class="text-xs text-slate-500 uppercase">Base Cost/Level</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.baseCostPerLevel}
        onchange={(e) => update("system.baseCostPerLevel", Number(e.target.value))}
      />
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Purchased Level</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.purchasedLevel}
        onchange={(e) => update("system.purchasedLevel", Number(e.target.value))}
      />
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Effective Level</label>
      <span class="block text-sm text-slate-300 p-1">{item.system.effectiveLevel}</span>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Total Cost</label>
      <span class="block text-sm text-slate-300 p-1">{item.system.totalCost} CP</span>
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

  <!-- Flags -->
  <div class="flex flex-wrap gap-3 text-xs">
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isWeapon}
        onchange={(e) => update("system.isWeapon", e.target.checked)} />
      Weapon
    </label>
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isSkillGroup}
        onchange={(e) => update("system.isSkillGroup", e.target.checked)} />
      Skill Group
    </label>
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isSkillsAttribute}
        onchange={(e) => update("system.isSkillsAttribute", e.target.checked)} />
      Skills Attribute
    </label>
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isBenchmarkException}
        onchange={(e) => update("system.isBenchmarkException", e.target.checked)} />
      Benchmark Exception
    </label>
    <label class="flex items-center gap-1 text-slate-400">
      <input type="checkbox" checked={item.system.isUnique}
        onchange={(e) => update("system.isUnique", e.target.checked)} />
      Unique
    </label>
  </div>

  <!-- Skill Group Options -->
  {#if item.system.isSkillGroup}
    <div>
      <label class="text-xs text-slate-500 uppercase">Skill Group Category</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.skillGroupCategory}
        onchange={(e) => update("system.skillGroupCategory", e.target.value)}
      >
        <option value="background">Background (1 CP/Level)</option>
        <option value="field">Field (2 CP/Level)</option>
        <option value="action">Action (3 CP/Level)</option>
      </select>
    </div>
  {/if}

  <!-- Unique Options -->
  {#if item.system.isUnique}
    <div class="grid grid-cols-2 gap-2">
      <div>
        <label class="text-xs text-slate-500 uppercase">Tier</label>
        <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
          value={item.system.tier}
          onchange={(e) => update("system.tier", e.target.value)}
        >
          <option value="lesser">Lesser (1 CP/Level)</option>
          <option value="greater">Greater (2 CP/Level)</option>
          <option value="serious">Serious (3 CP/Level)</option>
        </select>
      </div>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Unique Description</label>
      <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"
        value={item.system.uniqueDescription ?? ""}
        onchange={(e) => update("system.uniqueDescription", e.target.value)}
      ></textarea>
    </div>
  {/if}

  <!-- Weapon Options -->
  {#if item.system.isWeapon}
    <div class="border border-slate-700 rounded p-2">
      <div class="text-xs text-slate-500 uppercase mb-2">Weapon Options</div>
      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="text-xs text-slate-500">Damage</label>
          <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
            value={item.system.weaponOptions.damage}
            onchange={(e) => update("system.weaponOptions.damage", e.target.value)}
          />
        </div>
        <div>
          <label class="text-xs text-slate-500">Range</label>
          <input class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
            value={item.system.weaponOptions.range}
            onchange={(e) => update("system.weaponOptions.range", e.target.value)}
          />
        </div>
        <div>
          <label class="text-xs text-slate-500">Accurate</label>
          <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
            value={item.system.weaponOptions.accurate}
            onchange={(e) => update("system.weaponOptions.accurate", Number(e.target.value))}
          />
        </div>
        <div class="flex items-center gap-2">
          <label class="flex items-center gap-1 text-xs text-slate-400">
            <input type="checkbox" checked={item.system.weaponOptions.spreading}
              onchange={(e) => update("system.weaponOptions.spreading", e.target.checked)} />
            Spreading
          </label>
          <label class="flex items-center gap-1 text-xs text-slate-400">
            <input type="checkbox" checked={item.system.weaponOptions.isMuscleAttack}
              onchange={(e) => update("system.weaponOptions.isMuscleAttack", e.target.checked)} />
            Muscle
          </label>
        </div>
      </div>
    </div>
  {/if}

  <!-- Enhancements -->
  <div>
    <div class="text-xs text-slate-500 uppercase mb-1">Enhancements ({item.system.enhancements.length})</div>
    {#if item.system.enhancements.length === 0}
      <p class="text-xs text-slate-500 italic">None. Drop enhancements on the attribute row to add.</p>
    {:else}
      {#each item.system.enhancements as enh, i}
        <div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs">
          <span class="text-sky-300">{enh.name}</span>
          <span class="text-slate-400">-{enh.levels} levels</span>
          <button class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs"
            onclick={() => removeEnhancement(i)}>Remove</button>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Limiters -->
  <div>
    <div class="text-xs text-slate-500 uppercase mb-1">Limiters ({item.system.limiters.length})</div>
    {#if item.system.limiters.length === 0}
      <p class="text-xs text-slate-500 italic">None. Drop limiters on the attribute row to add.</p>
    {:else}
      {#each item.system.limiters as lim, i}
        <div class="flex items-center justify-between px-2 py-1 border-b border-slate-800 text-xs">
          <span class="text-violet-300">{lim.name}</span>
          <span class="text-slate-400">+{lim.levels} levels</span>
          <button class="text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer text-xs"
            onclick={() => removeLimiter(i)}>Remove</button>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Notes -->
  <div>
    <label class="text-xs text-slate-500 uppercase">Notes</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"
      value={item.system.notes ?? ""}
      onchange={(e) => update("system.notes", e.target.value)}
    ></textarea>
  </div>
</div>
```

- [ ] **Step 2: Create DefectSheet.svelte**

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
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => item.update({ name: e.target.value })}
  />

  <div class="grid grid-cols-2 gap-2">
    <div>
      <label class="text-xs text-slate-500 uppercase">CP Granted</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.cpGranted}
        onchange={(e) => update("system.cpGranted", Number(e.target.value))}
      />
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Rank Level</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.rankLevel}
        onchange={(e) => update("system.rankLevel", Number(e.target.value))}
      />
    </div>
  </div>

  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>

  <label class="flex items-center gap-1 text-xs text-slate-400">
    <input type="checkbox" checked={item.system.isUnique}
      onchange={(e) => update("system.isUnique", e.target.checked)} />
    Unique Defect
  </label>

  {#if item.system.isUnique}
    <div>
      <label class="text-xs text-slate-500 uppercase">Tier</label>
      <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.tier}
        onchange={(e) => update("system.tier", e.target.value)}
      >
        <option value="lesser">Lesser (1 CP/Rank)</option>
        <option value="greater">Greater (2 CP/Rank)</option>
        <option value="serious">Serious (3 CP/Rank)</option>
      </select>
    </div>
    <div>
      <label class="text-xs text-slate-500 uppercase">Unique Description</label>
      <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"
        value={item.system.uniqueDescription ?? ""}
        onchange={(e) => update("system.uniqueDescription", e.target.value)}
      ></textarea>
    </div>
  {/if}
</div>
```

- [ ] **Step 3: Create EnhancementSheet.svelte**

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
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => item.update({ name: e.target.value })}
  />

  <div>
    <label class="text-xs text-slate-500 uppercase">Levels</label>
    <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
      value={item.system.levels}
      onchange={(e) => update("system.levels", Number(e.target.value))}
      min="1"
    />
  </div>

  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>

  {#if item.system.parentAttributeId}
    <div class="text-xs text-slate-500">Parent Attribute: {item.system.parentAttributeId}</div>
  {/if}
</div>
```

- [ ] **Step 4: Create LimiterSheet.svelte**

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
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => item.update({ name: e.target.value })}
  />

  <div>
    <label class="text-xs text-slate-500 uppercase">Levels</label>
    <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
      value={item.system.levels}
      onchange={(e) => update("system.levels", Number(e.target.value))}
      min="1"
    />
  </div>

  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>

  {#if item.system.parentAttributeId}
    <div class="text-xs text-slate-500">Parent Attribute: {item.system.parentAttributeId}</div>
  {/if}
</div>
```

- [ ] **Step 5: Create PossessionSheet.svelte (stub)**

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
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => item.update({ name: e.target.value })}
  />

  <div>
    <label class="text-xs text-slate-500 uppercase">Category</label>
    <select class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
      value={item.system.category}
      onchange={(e) => update("system.category", e.target.value)}
    >
      <option value="gear">Gear</option>
      <option value="feature">Feature</option>
      <option value="other">Other</option>
    </select>
  </div>

  <label class="flex items-center gap-1 text-xs text-slate-400">
    <input type="checkbox" checked={item.system.isMechanical}
      onchange={(e) => update("system.isMechanical", e.target.checked)} />
    Mechanical (has budget cost)
  </label>

  {#if item.system.isMechanical}
    <div>
      <label class="text-xs text-slate-500 uppercase">Budget Cost</label>
      <input type="number" class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-100 p-1"
        value={item.system.budgetCost}
        onchange={(e) => update("system.budgetCost", Number(e.target.value))}
      />
    </div>
  {/if}

  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>
</div>
```

- [ ] **Step 6: Create SkillSheet.svelte (stub)**

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
</script>

<div class="p-3 bg-slate-900 text-slate-100 flex flex-col gap-3 overflow-y-auto h-full">
  <input
    class="text-lg font-bold bg-transparent border border-transparent hover:border-slate-600 focus:border-blue-500 text-slate-100 w-full p-1 rounded"
    value={item.name}
    onchange={(e) => item.update({ name: e.target.value })}
  />

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

  <div>
    <label class="text-xs text-slate-500 uppercase">Description</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-20 resize-y"
      value={item.system.description ?? ""}
      onchange={(e) => update("system.description", e.target.value)}
    ></textarea>
  </div>
</div>
```

- [ ] **Step 7: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 8: Commit**

```bash
git add src/components/items/
git commit -m "feat: add item sheet components for all 6 item types"
```

---

### Task 4: BESMItemSheet DocumentSheetV2 + Registration

**Files:**
- Create: `src/sheets/BESMItemSheet.mjs`
- Modify: `src/besm4e.mjs`

- [ ] **Step 1: Create BESMItemSheet.mjs**

```js
import { mount, unmount } from "svelte";
import AttributeSheet from "../components/items/AttributeSheet.svelte";
import DefectSheet from "../components/items/DefectSheet.svelte";
import EnhancementSheet from "../components/items/EnhancementSheet.svelte";
import LimiterSheet from "../components/items/LimiterSheet.svelte";
import PossessionSheet from "../components/items/PossessionSheet.svelte";
import SkillSheet from "../components/items/SkillSheet.svelte";

const COMPONENT_MAP = {
  attribute: AttributeSheet,
  defect: DefectSheet,
  enhancement: EnhancementSheet,
  limiter: LimiterSheet,
  possession: PossessionSheet,
  skill: SkillSheet,
};

export class BESMItemSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "item-sheet"],
    position: { width: 450, height: 500 },
    window: { resizable: true },
  };

  #svelteComponent = null;

  async _renderHTML(context, options) {
    const el = document.createElement("div");
    el.classList.add("svelte-mount");
    return el;
  }

  _replaceHTML(element, html, options) {
    super._replaceHTML(element, html, options);
    if (!this.#svelteComponent) {
      const Component = COMPONENT_MAP[this.document.type];
      if (!Component) return;
      this.#svelteComponent = mount(Component, {
        target: html,
        props: { document: this.document, sheet: this },
      });
    }
  }

  async close(options) {
    if (this.#svelteComponent) {
      unmount(this.#svelteComponent);
      this.#svelteComponent = null;
    }
    return super.close(options);
  }
}
```

- [ ] **Step 2: Update besm4e.mjs**

Read `src/besm4e.mjs`. Add import at the top:
```js
import { BESMItemSheet } from "./sheets/BESMItemSheet.mjs";
```

Add after the actor sheet registrations (after the last `Actors.registerSheet` call):
```js
  foundry.documents.collections.Items.registerSheet("besm", BESMItemSheet, {
    types: ["attribute", "defect", "enhancement", "limiter", "possession", "skill"],
    makeDefault: true,
    label: "BESM4e.SheetItem",
  });
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/sheets/BESMItemSheet.mjs src/besm4e.mjs
git commit -m "feat: add BESMItemSheet and register for all item types"
```

---

### Task 5: Update AttributesTab with Interactive Rows and Drop Handling

**Files:**
- Modify: `src/components/tabs/AttributesTab.svelte`

- [ ] **Step 1: Rewrite AttributesTab.svelte**

Read `src/components/tabs/AttributesTab.svelte` first, then replace the entire file:

```svelte
<script>
  import CollapsibleSection from "../ui/CollapsibleSection.svelte";
  import AttributeRow from "../ui/AttributeRow.svelte";
  import DefectRow from "../ui/DefectRow.svelte";
  import GearBudget from "../ui/GearBudget.svelte";

  let { actor } = $props();

  let attributes = $derived(
    [...actor.items].filter(i => i.type === "attribute")
  );
  let defects = $derived(
    [...actor.items].filter(i => i.type === "defect")
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

    if (item.type === "attribute" || item.type === "defect") {
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
  <CollapsibleSection title="Attributes" count={attributes.length} headerClass="text-slate-100">
    {#if attributes.length === 0}
      <p class="text-xs text-slate-500 italic px-2">No attributes. Drag from compendium to add.</p>
    {:else}
      {#each attributes as attr (attr.id)}
        <AttributeRow attribute={attr} {actor} />
      {/each}
    {/if}
  </CollapsibleSection>

  <GearBudget {actor} />

  <CollapsibleSection title="Defects" count={defects.length} headerClass="text-red-400">
    {#if defects.length === 0}
      <p class="text-xs text-slate-500 italic px-2">No defects.</p>
    {:else}
      {#each defects as defect (defect.id)}
        <DefectRow {defect} />
      {/each}
    {/if}
  </CollapsibleSection>
</div>
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 3: Commit**

```bash
git add src/components/tabs/AttributesTab.svelte
git commit -m "feat: upgrade AttributesTab with interactive rows, drop handling, and gear budget"
```

---

### Task 6: Foundry Visual Verification

**Files:**
- None — manual testing in Foundry VTT V14

- [ ] **Step 1: Build and launch**

Run: `npm run build`
Launch Foundry VTT V14, open the test world.

- [ ] **Step 2: Run setup script**

Paste into browser console:

```js
(async () => {
  let char = await Actor.create({name: "Attr Test", type: "character"});
  await char.update({"system.stats.body.value": 5, "system.stats.mind.value": 5, "system.stats.soul.value": 5});
  await char.createEmbeddedDocuments("Item", [
    {name: "Superstrength", type: "attribute", system: {baseCostPerLevel: 4, purchasedLevel: 3}},
    {name: "Armour", type: "attribute", system: {baseCostPerLevel: 3, purchasedLevel: 2}},
    {name: "Fragile", type: "defect", system: {cpGranted: 2, rankLevel: 1}},
  ]);
  await Item.create({name: "Test Enhancement", type: "enhancement", system: {levels: 1}});
  await Item.create({name: "Test Limiter", type: "limiter", system: {levels: 2}});
  console.log("Done - open the character sheet and item sheets to test");
})();
```

- [ ] **Step 3: Visual checks**

1. Open "Attr Test" character sheet
2. **Attributes tab:** Superstrength and Armour shown as interactive rows with Lv/Eff/CP
3. **Click Superstrength** → item sheet opens with all fields editable
4. **Click Fragile** → defect sheet opens
5. **Drag "Test Enhancement" from Items sidebar** onto the Superstrength row → enhancement tag appears
6. **Click x on enhancement tag** → removed
7. **Drag "Test Limiter"** onto Armour row → limiter tag appears
8. **Open Test Enhancement from sidebar** → enhancement item sheet opens
9. **Open Test Limiter from sidebar** → limiter item sheet opens

- [ ] **Step 4: Clean up**

```js
for (const a of game.actors) await a.delete();
for (const i of game.items) await i.delete();
```
