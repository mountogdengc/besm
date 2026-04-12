<script>
  let { tabs, activeTab, onSelect } = $props();
</script>

<div class="flex border-b border-slate-700 bg-slate-950">
  {#each tabs as tab}
    <button
      class="px-3.5 py-2 text-xs border-0 cursor-pointer bg-transparent
             {activeTab === tab.id
               ? 'text-slate-100 border-b-2 border-b-blue-500'
               : 'text-slate-500 hover:text-slate-300'}"
      onclick={() => onSelect(tab.id)}
    >
      {tab.label}
    </button>
  {/each}
</div>
