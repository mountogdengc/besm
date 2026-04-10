<script>
  let { document: actorDocument } = $props();

  let actor = $state(actorDocument);

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) {
        actor = updatedActor;
      }
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>

<div class="p-4 text-lg font-bold text-white bg-gray-800 rounded">
  {actor.name}
</div>
