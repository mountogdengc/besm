<script>
  import RollButton from "./RollButton.svelte";
  import LinkedActorBadge from "./LinkedActorBadge.svelte";
  import { performAttackRoll } from "../../rolls/BESMCombat.mjs";

  let { attribute, actor } = $props();

  function attackRoll(e) {
    e.stopPropagation();
    performAttackRoll(actor, attribute);
  }

  let enhancements = $derived(attribute.system.enhancements ?? []);
  let limiters = $derived(attribute.system.limiters ?? []);
  let options = $derived(attribute.system.selectedOptions ?? []);
  let levelMismatch = $derived(attribute.system.purchasedLevel !== attribute.system.effectiveLevel);

  let parenthetical = $derived(() => {
    const parts = [];
    if (options.length > 0) parts.push(options.join(", "));
    if (enhancements.length > 0) {
      parts.push(enhancements.map(e => `${e.name} -${e.levels}`).join(", "));
    }
    if (limiters.length > 0) {
      parts.push(limiters.map(l => `${l.name} +${l.levels}`).join(", "));
    }
    return parts.length > 0 ? `(${parts.join("; ")})` : "";
  });

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
    } else if (item.type === "besm4eTemplate" && item.system.templateType === "powerpack") {
      // Apply all enhancements/limiters from the power pack
      const newEnhancements = [...enhancements];
      const newLimiters = [...limiters];
      for (const entry of item.system.entries ?? []) {
        if (entry.entryType !== "item") continue;
        const e = { id: foundry.utils.randomID(), name: entry.name, levels: entry.systemData?.levels ?? 1 };
        if (entry.itemType === "enhancement") newEnhancements.push(e);
        else if (entry.itemType === "limiter") newLimiters.push(e);
      }
      await attribute.update({
        "system.enhancements": newEnhancements,
        "system.limiters": newLimiters,
      });
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
  <span class="text-slate-400 flex-shrink-0 tabular-nums">
    {attribute.system.purchasedLevel}{#if levelMismatch}<span class="text-amber-400">({attribute.system.effectiveLevel})</span>{/if}
  </span>

  <span class="text-slate-400 flex-shrink-0 tabular-nums">{attribute.system.totalCost}</span>

  <span class="text-slate-200 font-medium">{attribute.name}</span>

  {#if parenthetical()}
    <span class="text-slate-400">{parenthetical()}</span>
  {/if}

  {#if attribute.system.isWeapon}
    <RollButton onclick={attackRoll} title="Attack with {attribute.name}" />
  {/if}

  {#if attribute.system.linkedActorId}
    <LinkedActorBadge {attribute} {actor} />
  {/if}
</div>
