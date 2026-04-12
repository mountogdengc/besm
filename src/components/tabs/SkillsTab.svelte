<script>
  let { actor } = $props();

  let skills = $derived(
    [...actor.items].filter(i => i.type === "skill")
  );
  let skillGroups = $derived(
    [...actor.items].filter(i => i.type === "attribute" && i.system.isSkillGroup)
  );

  let isPointBuy = $derived(actor.system.skillMode === "pointbuy");
</script>

<div class="p-3">
  {#if isPointBuy}
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skills (Point Buy)</div>
    {#if skills.length === 0}
      <p class="text-xs text-slate-500 italic">No skills. Drag from compendium to add.</p>
    {:else}
      {#each skills as skill}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-slate-200 {skill.system.isFlavor ? 'italic' : ''}">
            {skill.name}
            {#if skill.system.isFlavor}
              <span class="text-slate-500">(flavor)</span>
            {/if}
          </span>
          <span class="text-slate-400">Rank {skill.system.rank}</span>
          <span class="text-slate-400">{skill.system.linkedStat}</span>
          <span class="text-slate-400">{skill.system.totalSpCost} SP</span>
        </div>
      {/each}
    {/if}
  {:else}
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-2">Skill Groups</div>
    {#if skillGroups.length === 0}
      <p class="text-xs text-slate-500 italic">No skill groups. Drag from compendium to add.</p>
    {:else}
      {#each skillGroups as group}
        <div class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs">
          <span class="text-slate-200">{group.name}</span>
          <span class="text-slate-400">Lv {group.system.purchasedLevel}</span>
          <span class="text-slate-400">{group.system.skillGroupCategory}</span>
          <span class="text-slate-400">{group.system.totalCost} CP</span>
        </div>
      {/each}
    {/if}
  {/if}
</div>
