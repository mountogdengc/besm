<script>
  import CollapsibleSection from "../ui/CollapsibleSection.svelte";

  let { actor } = $props();

  let attributes = $derived(
    [...actor.items].filter(i => i.type === "attribute")
  );
  let defects = $derived(
    [...actor.items].filter(i => i.type === "defect")
  );
</script>

<div class="p-3">
  <CollapsibleSection title="Attributes" count={attributes.length} headerClass="text-slate-100">
    {#if attributes.length === 0}
      <p class="text-xs text-slate-500 italic px-2">No attributes. Drag from compendium to add.</p>
    {:else}
      {#each attributes as attr}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-slate-200">{attr.name}</span>
          <span class="text-slate-400">
            Lv {attr.system.purchasedLevel}
            {#if attr.system.purchasedLevel !== attr.system.effectiveLevel}
              <span class="text-amber-400">→ Eff {attr.system.effectiveLevel}</span>
            {/if}
          </span>
          <span class="text-slate-400">{attr.system.totalCost} CP</span>
        </div>
      {/each}
    {/if}
  </CollapsibleSection>

  <CollapsibleSection title="Defects" count={defects.length} headerClass="text-red-400">
    {#if defects.length === 0}
      <p class="text-xs text-slate-500 italic px-2">No defects.</p>
    {:else}
      {#each defects as defect}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-red-300">{defect.name}</span>
          <span class="text-slate-400">Rank {defect.system.rankLevel}</span>
          <span class="text-emerald-400">+{defect.system.cpGranted} CP</span>
        </div>
      {/each}
    {/if}
  </CollapsibleSection>
</div>
