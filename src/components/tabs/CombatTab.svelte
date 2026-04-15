<script>
  import ResourceBar from "../ui/ResourceBar.svelte";
  import RollButton from "../ui/RollButton.svelte";
  import { performAttackRoll } from "../../rolls/BESMCombat.mjs";
  import { performSanityRoll } from "../../rolls/BESMCombat.mjs";
  import { performSocialAttackRoll } from "../../rolls/BESMSocial.mjs";

  let { actor } = $props();
  let d = $derived(actor.system.derived);

  let weapons = $derived(
    [...actor.items].filter(i => i.type === "attribute" && i.system.isWeapon)
  );

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

  function attackWith(weapon) {
    performAttackRoll(actor, weapon);
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
      <ResourceBar label="Health Points (HP)" current={d.currentHp} max={d.hpMax} onUpdate={updateCurrentHp} />
    {/if}
    {#if d.epApplicable}
      <ResourceBar label="Energy Points (EP)" current={d.currentEp} max={d.epMax} onUpdate={updateCurrentEp} />
    {/if}
  </div>

  <!-- Attacks -->
  <div>
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Attacks</div>
    {#if weapons.length === 0}
      <p class="text-xs text-slate-500 italic">No weapon attributes. Mark an attribute as a Weapon on its sheet to add it here.</p>
    {:else}
      <div class="flex flex-col gap-1">
        {#each weapons as weapon}
          <div class="flex items-center justify-between px-2 py-1.5 border border-slate-700 rounded text-xs hover:bg-slate-800/50">
            <div class="flex flex-col">
              <span class="text-slate-200 font-medium">{weapon.name}</span>
              <span class="text-slate-500">
                Lv {weapon.system.effectiveLevel}
                {#if weapon.system.weaponOptions.isMuscleAttack}
                  · Melee (DM {d.meleeDamageMultiplier})
                {:else}
                  · Ranged (DM {d.damageMultiplier})
                {/if}
                {#if weapon.system.weaponOptions.range}
                  · {weapon.system.weaponOptions.range}
                {/if}
                {#if weapon.system.weaponOptions.accurate > 0}
                  · Accurate +{weapon.system.weaponOptions.accurate}
                {/if}
                {#if weapon.system.weaponOptions.spreading}
                  · Spreading
                {/if}
              </span>
            </div>
            <RollButton onclick={() => attackWith(weapon)} title="Attack with {weapon.name}" />
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Sanity (settings-gated) -->
  {#if sanityEnabled && d.sanityPoints > 0}
    <div class="border-t border-slate-700 pt-3">
      <div class="flex items-center justify-between">
        <div class="text-xs text-slate-500 uppercase">Sanity</div>
        <RollButton onclick={rollSanity} title="Sanity Roll" />
      </div>
    </div>
  {/if}

  <!-- Social Combat (settings-gated) -->
  {#if socialEnabled && d.socv > 0}
    <div class="border-t border-slate-700 pt-3">
      <div class="flex items-center justify-between">
        <div class="text-xs text-slate-500 uppercase">Social Combat</div>
        <RollButton onclick={rollSocialAttack} title="Social Attack Roll" />
      </div>
    </div>
  {/if}
</div>
