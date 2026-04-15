<script>
  let { defect } = $props();

  function openSheet() {
    defect.sheet.render(true);
  }
</script>

<div
  class="flex items-center gap-x-3 px-2 py-1.5 border-b border-slate-800 text-xs cursor-pointer hover:bg-slate-800/50"
  onclick={openSheet}
  role="button"
  tabindex="0"
  onkeydown={(e) => { if (e.key === "Enter") openSheet(); }}
>
  <span class="text-slate-400 flex-shrink-0 tabular-nums">{defect.system.rankLevel}</span>
  <span class="text-emerald-400 flex-shrink-0 tabular-nums">+{defect.system.cpGranted}</span>
  <span class="text-red-300">{defect.name}</span>
</div>
