<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import CrewTab from "../tabs/CrewTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";

  let { document: actorDocument } = $props();
  let actor = $state(actorDocument);
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "crew", label: "Crew" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) actor = updatedActor;
    });
    return () => Hooks.off("updateActor", hookId);
  });
</script>

<div class="flex h-full bg-slate-900 text-slate-100">
  <ActorSidebar {actor} showSP={false} showEP={false} showCV={false} statsToShow={["body"]} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "crew"}
        <CrewTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
