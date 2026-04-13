<script>
  import ResourceBar from "../ui/ResourceBar.svelte";
  import RollButton from "../ui/RollButton.svelte";
  import { performSanityRoll } from "../../rolls/BESMCombat.mjs";
  import { performSocialAttackRoll, openSocialEdgeDialog } from "../../rolls/BESMSocial.mjs";

  let { actor } = $props();
  let d = $derived(actor.system.derived);

  let sanityEnabled = $state(false);
  let socialEnabled = $state(false);

  $effect(() => {
    try {
      sanityEnabled = game.settings.get("besm", "sanityEnabled");
      socialEnabled = game.settings.get("besm", "socialCombatEnabled");
    } catch {}
  });

  function updateCurrentHp(val) {
    actor.update({ "system.derived.currentHp": val });
  }

  function updateCurrentEp(val) {
    actor.update({ "system.derived.currentEp": val });
  }

  function rollSanity() {
    performSanityRoll(actor);
  }

  function rollSocialAttack() {
    performSocialAttackRoll(actor, 0, "Social", null);
  }
</script>

<div class="p-3 flex flex-col gap-4">
  <!-- Resource Bars -->
  <div class="flex flex-col gap-2">
    {#if d.hpApplicable}
      <ResourceBar label="HP" current={d.currentHp} max={d.hpMax} onUpdate={updateCurrentHp} />
    {/if}
    {#if d.epApplicable}
      <ResourceBar label="EP" current={d.currentEp} max={d.epMax} onUpdate={updateCurrentEp} />
    {/if}
  </div>

  <!-- Combat Values Grid -->
  <div class="grid grid-cols-3 gap-3">
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">ACV</div>
      <div class="text-2xl font-bold text-slate-100">{d.acv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">DCV</div>
      <div class="text-2xl font-bold text-slate-100">{d.dcv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">Init</div>
      <div class="text-2xl font-bold text-slate-100">{d.initiative}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">SV</div>
      <div class="text-lg font-bold text-slate-100">{d.sv}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">DM</div>
      <div class="text-lg font-bold text-slate-100">{d.damageMultiplier}</div>
      <div class="text-xs text-slate-500">melee {d.meleeDamageMultiplier}</div>
    </div>
    <div class="text-center">
      <div class="text-xs text-slate-500 uppercase">AR</div>
      <div class="text-lg font-bold text-slate-100">{d.ar}</div>
    </div>
  </div>

  <!-- Sanity (settings-gated) -->
  {#if sanityEnabled && d.sanityPoints > 0}
    <div class="border-t border-slate-700 pt-3">
      <div class="flex items-center justify-between mb-2">
        <div class="text-xs text-slate-500 uppercase">Sanity</div>
        <RollButton onclick={rollSanity} title="Sanity Roll" />
      </div>
      <div class="text-sm text-slate-300">
        Sanity Points: {d.currentSanity ?? d.sanityPoints} / {d.sanityMax}
      </div>
    </div>
  {/if}

  <!-- Social Combat (settings-gated) -->
  {#if socialEnabled && d.socv > 0}
    <div class="border-t border-slate-700 pt-3">
      <div class="flex items-center justify-between mb-2">
        <div class="text-xs text-slate-500 uppercase">Social Combat</div>
        <RollButton onclick={rollSocialAttack} title="Social Attack Roll" />
      </div>
      <div class="text-sm text-slate-300">
        SoCV: {d.socv} | Society Points: {d.currentSocietyPoints ?? d.societyPoints} / {d.societyPointsMax}
      </div>
    </div>
  {/if}
</div>
