<script>
  let { actor } = $props();
  let notes = $state(actor.system.notes ?? "");

  function saveNotes() {
    actor.update({ "system.notes": notes });
  }
</script>

<div class="p-3 flex flex-col gap-3">
  <div>
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Biography</div>
    <div class="text-xs text-slate-400 italic">
      Biography editing requires the full Foundry editor (coming in a future phase).
      Current content is displayed below.
    </div>
    <div class="mt-2 p-2 bg-slate-900 rounded border border-slate-700 text-xs text-slate-300 min-h-16">
      {@html actor.system.biography || "<em class='text-slate-500'>No biography.</em>"}
    </div>
  </div>

  <div>
    <div class="text-xs text-slate-500 uppercase tracking-wide mb-1">Notes</div>
    <textarea
      class="w-full h-24 bg-slate-900 border border-slate-700 rounded text-xs text-slate-200 p-2 resize-y"
      bind:value={notes}
      onblur={saveNotes}
    ></textarea>
  </div>
</div>
