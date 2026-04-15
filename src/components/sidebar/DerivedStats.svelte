<script>
  let { derived, showEP = true, showCV = true, showMovement = false } = $props();

  let sanityEnabled = $state(false);
  let socialEnabled = $state(false);

  $effect(() => {
    try {
      sanityEnabled = game.settings.get("besm", "sanityEnabled");
      socialEnabled = game.settings.get("besm", "socialCombatEnabled");
    } catch {}
  });
</script>

<div class="border-t border-slate-700 pt-2">
  <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Derived</div>
  <div class="flex flex-col gap-0.5 text-xs">
    {#if derived.hpApplicable}
      <div class="flex justify-between">
        <span class="text-slate-400">Health Points (HP)</span>
        <span class="text-slate-100">{derived.currentHp}/{derived.hpMax}</span>
      </div>
    {/if}
    {#if showEP && derived.epApplicable}
      <div class="flex justify-between">
        <span class="text-slate-400">Energy Points (EP)</span>
        <span class="text-slate-100">{derived.currentEp}/{derived.epMax}</span>
      </div>
    {/if}
    {#if showCV}
      <div class="flex justify-between">
        <span class="text-slate-400">Attack Combat Value (ACV)</span>
        <span class="text-slate-100">{derived.acv}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-400">Defence Combat Value (DCV)</span>
        <span class="text-slate-100">{derived.dcv}</span>
      </div>
    {/if}
    {#if derived.hpApplicable}
      <div class="flex justify-between">
        <span class="text-slate-400">Shock Value (SV)</span>
        <span class="text-slate-100">{derived.sv}</span>
      </div>
    {/if}
    <div class="flex justify-between">
      <span class="text-slate-400">Damage Multiplier (DM)</span>
      <span class="text-slate-100">
        {derived.damageMultiplier}{#if derived.meleeDamageMultiplier !== derived.damageMultiplier} / {derived.meleeDamageMultiplier} melee{/if}
      </span>
    </div>
    <div class="flex justify-between">
      <span class="text-slate-400">Armour Rating (AR)</span>
      <span class="text-slate-100">{derived.ar}</span>
    </div>
    {#if sanityEnabled && derived.sanityPoints > 0}
      <div class="flex justify-between">
        <span class="text-slate-400">Sanity Points</span>
        <span class="text-slate-100">{derived.currentSanity ?? derived.sanityPoints}/{derived.sanityMax}</span>
      </div>
    {/if}
    {#if socialEnabled && derived.socv > 0}
      <div class="flex justify-between">
        <span class="text-slate-400">Social Combat Value (SoCV)</span>
        <span class="text-slate-100">{derived.socv}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-slate-400">Society Points</span>
        <span class="text-slate-100">{derived.currentSocietyPoints ?? derived.societyPoints}/{derived.societyPointsMax}</span>
      </div>
    {/if}
  </div>
</div>
