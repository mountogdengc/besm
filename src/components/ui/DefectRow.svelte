<script>
  let { defect } = $props();

  function openSheet() {
    defect.sheet.render(true);
  }
</script>

<div
  class="flex justify-between items-center px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-red-300">{defect.name}</span>
  <span class="text-slate-400">Rank {defect.system.rankLevel}</span>
  <span class="text-emerald-400">+{defect.system.cpGranted} CP</span>
</div>
