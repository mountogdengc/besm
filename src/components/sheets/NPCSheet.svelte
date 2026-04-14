<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import BenchmarkPanel from "../ui/BenchmarkPanel.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import CombatTab from "../tabs/CombatTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";

  let { document: actorDocument } = $props();
  let version = $state(0);
  let actor = $derived.by(() => { version; return actorDocument; });
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actorDocument.id) version++;
    });
    return () => Hooks.off("updateActor", hookId);
  });

  $effect(() => {
    const hookId = Hooks.on("createItem", (item) => {
      if (item.parent?.id === actorDocument.id) version++;
    });
    return () => Hooks.off("createItem", hookId);
  });

  $effect(() => {
    const hookId = Hooks.on("updateItem", (item) => {
      if (item.parent?.id === actorDocument.id) version++;
    });
    return () => Hooks.off("updateItem", hookId);
  });

  $effect(() => {
    const hookId = Hooks.on("deleteItem", (item) => {
      if (item.parent?.id === actorDocument.id) version++;
    });
    return () => Hooks.off("deleteItem", hookId);
  });
</script>

<div class="flex h-full bg-slate-900 text-slate-100">
  <ActorSidebar {actor} showSP={false} showEP={true} showCV={true} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />
    <BenchmarkPanel warnings={actor.system.benchmarkWarnings ?? []} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "combat"}
        <CombatTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
