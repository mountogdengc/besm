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

  let isLinkable = $derived(
    /companion|minion|alternate/i.test(item.name)
  );

  let linkedActor = $derived(
    item.system.linkedActorId
      ? game.actors.get(item.system.linkedActorId)
      : null
  );

  let cpBudget = $derived(item.system.effectiveLevel * 10);

  async function createLinkedActor() {
    const parent = item.parent;
    if (!parent) return;
    const newActor = await Actor.create({
      name: `${item.name} of ${parent.name}`,
      type: "character",
      folder: parent.folder || undefined,
    });
    if (newActor) {
      await item.update({ "system.linkedActorId": newActor.id });
    }
  }

  async function unlinkActor() {
    await item.update({ "system.linkedActorId": "" });
  }

  function openLinkedSheet() {
    if (linkedActor) linkedActor.sheet.render(true);
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

  <!-- Linked Actor -->
  {#if isLinkable}
    <div class="border border-slate-700 rounded p-2">
      <div class="text-xs text-slate-500 uppercase mb-2">Linked Actor</div>
      {#if linkedActor}
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-200">{linkedActor.name}</span>
          <span class="px-1.5 py-0.5 rounded {linkedActor.system.cpSpent <= cpBudget ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}">
            {linkedActor.system.cpSpent} / {cpBudget} CP
          </span>
          <button class="px-2 py-1 bg-blue-700 text-blue-100 rounded border-0 cursor-pointer text-xs hover:bg-blue-600"
            onclick={openLinkedSheet}>Open Sheet</button>
          <button class="px-2 py-1 bg-slate-700 text-slate-300 rounded border-0 cursor-pointer text-xs hover:bg-slate-600"
            onclick={unlinkActor}>Unlink</button>
        </div>
      {:else}
        <div class="flex flex-col gap-2">
          <button class="px-2 py-1 bg-emerald-700 text-emerald-100 rounded border-0 cursor-pointer text-xs hover:bg-emerald-600 self-start"
            onclick={createLinkedActor}>Create Linked Actor</button>
          <div class="flex items-center gap-2">
            <input
              class="flex-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-100 p-1"
              placeholder="Paste actor ID to link..."
              value={item.system.linkedActorId}
              onchange={(e) => update("system.linkedActorId", e.target.value)}
            />
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Notes -->
  <div>
    <label class="text-xs text-slate-500 uppercase">Notes</label>
    <textarea class="w-full bg-slate-800 border border-slate-700 rounded text-sm text-slate-200 p-2 h-16 resize-y"
      value={item.system.notes ?? ""}
      onchange={(e) => update("system.notes", e.target.value)}
    ></textarea>
  </div>
</div>
