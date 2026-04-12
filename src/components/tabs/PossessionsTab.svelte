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
