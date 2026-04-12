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
