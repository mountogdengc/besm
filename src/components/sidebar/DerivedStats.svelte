<script>
  let { derived, showEP = true, showCV = true, showMovement = false } = $props();
</script>

<div class="border-t border-slate-700 pt-2">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Derived</div>
  <div class="grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
    {#if derived.hpApplicable}
      <span class="text-slate-400">HP</span>
      <span class="text-slate-100 text-right">{derived.currentHp}/{derived.hpMax}</span>
    {/if}
    {#if showEP && derived.epApplicable}
      <span class="text-slate-400">EP</span>
      <span class="text-slate-100 text-right">{derived.currentEp}/{derived.epMax}</span>
    {/if}
    {#if showCV}
      <span class="text-slate-400">ACV</span>
      <span class="text-slate-100 text-right">{derived.acv}</span>
      <span class="text-slate-400">DCV</span>
      <span class="text-slate-100 text-right">{derived.dcv}</span>
    {/if}
    {#if derived.hpApplicable}
      <span class="text-slate-400">SV</span>
      <span class="text-slate-100 text-right">{derived.sv}</span>
    {/if}
    <span class="text-slate-400">DM</span>
    <span class="text-slate-100 text-right">{derived.damageMultiplier}/{derived.meleeDamageMultiplier}</span>
    <span class="text-slate-400">AR</span>
    <span class="text-slate-100 text-right">{derived.ar}</span>
  </div>
</div>
