<script>
  import CollapsibleSection from "../ui/CollapsibleSection.svelte";
  import AttributeRow from "../ui/AttributeRow.svelte";
  import DefectRow from "../ui/DefectRow.svelte";
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
