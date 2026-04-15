<script>
  import { swapToAlternateForm } from "../../hooks/alternateForm.mjs";

  let { attribute, actor } = $props();

  let linkedActor = $derived(
    attribute.system.linkedActorId
      ? game.actors.get(attribute.system.linkedActorId)
      : null
  );

  let cpBudget = $derived(attribute.system.effectiveLevel * 10);

  let cpSpent = $derived(linkedActor?.system.cpSpent ?? 0);

  let cpValid = $derived(cpSpent <= cpBudget);

  let isItemAttr = $derived(attribute.system.baseCostPerLevel === 0 && attribute.system.linkedActorId);
  let itemCost = $derived(isItemAttr ? Math.ceil(cpSpent / 2) : null);

  let isAlternateForm = $derived(/alternate/i.test(attribute.name));

  function openLinkedSheet(e) {
    e.stopPropagation();
    if (linkedActor) linkedActor.sheet.render(true);
  }

  function swapForm(e) {
    e.stopPropagation();
    if (linkedActor && actor) swapToAlternateForm(actor, linkedActor);
  }
</script>

{#if linkedActor}
  <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700 text-xs flex-shrink-0">
    <span class="text-slate-300">{linkedActor.name}</span>
    <span class="px-1 rounded text-xs {cpValid ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}">
      {cpSpent}/{cpBudget} CP
    </span>
    {#if itemCost !== null}
      <span class="px-1 rounded bg-slate-600 text-slate-200 text-xs" title="Character pays half the linked actor's CP">
        Cost: {itemCost} CP
      </span>
    {/if}
    <button
      class="text-blue-400 hover:text-blue-200 bg-transparent border-0 cursor-pointer text-xs p-0"
      onclick={openLinkedSheet}
      title="Open {linkedActor.name} sheet"
    >Open</button>
    {#if isAlternateForm}
      <button
        class="text-amber-400 hover:text-amber-200 bg-transparent border-0 cursor-pointer text-xs p-0"
        onclick={swapForm}
        title="Swap to {linkedActor.name}"
      >Swap</button>
    {/if}
  </span>
{/if}
