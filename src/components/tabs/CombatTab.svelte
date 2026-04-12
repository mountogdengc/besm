<script>
  import ResourceBar from "../ui/ResourceBar.svelte";

  let { actor } = $props();
  let d = $derived(actor.system.derived);

  function updateCurrentHp(val) {
    actor.update({ "system.derived.currentHp": val });
  }

  function updateCurrentEp(val) {
    actor.update({ "system.derived.currentEp": val });
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
</div>
