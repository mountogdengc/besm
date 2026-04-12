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
        <SkillRow {skill} {actor} />
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
