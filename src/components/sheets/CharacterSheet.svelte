<script>
  import ActorSidebar from "../sidebar/ActorSidebar.svelte";
  import TabBar from "../tabs/TabBar.svelte";
  import BenchmarkPanel from "../ui/BenchmarkPanel.svelte";
  import TemplateBadges from "../ui/TemplateBadges.svelte";
  import AttributesTab from "../tabs/AttributesTab.svelte";
  import SkillsTab from "../tabs/SkillsTab.svelte";
  import PossessionsTab from "../tabs/PossessionsTab.svelte";
  import CombatTab from "../tabs/CombatTab.svelte";
  import BiographyTab from "../tabs/BiographyTab.svelte";
  import { applyTemplate } from "../../engine/templates.mjs";

  let { document: actorDocument } = $props();
  let actor = $state(actorDocument);
  let activeTab = $state("attributes");

  const tabs = [
    { id: "attributes", label: "Attributes" },
    { id: "skills", label: "Skills" },
    { id: "possessions", label: "Possessions" },
    { id: "combat", label: "Combat" },
    { id: "biography", label: "Biography" },
  ];

  $effect(() => {
    const hookId = Hooks.on("updateActor", (updatedActor) => {
      if (updatedActor.id === actor.id) {
        actor = updatedActor;
      }
    });
    return () => Hooks.off("updateActor", hookId);
  });

  async function handleTemplateDrop(event) {
    event.preventDefault();
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch { return; }

    if (data.type !== "Item") return;
    const item = await fromUuid(data.uuid);
    if (!item || item.type !== "besm4eTemplate") return;

    await applyTemplate(item, actor);
    ui.notifications.info(`Applied template: ${item.name}`);
  }

  function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex h-full bg-slate-900 text-slate-100" ondragover={handleDragOver} ondrop={handleTemplateDrop}>
  <ActorSidebar {actor} showSP={true} showEP={true} showCV={true} />

  <div class="flex-1 flex flex-col overflow-hidden">
    <TabBar {tabs} {activeTab} onSelect={(id) => activeTab = id} />
    <TemplateBadges {actor} />
    <BenchmarkPanel warnings={actor.system.benchmarkWarnings} />

    <div class="flex-1 overflow-y-auto">
      {#if activeTab === "attributes"}
        <AttributesTab {actor} />
      {:else if activeTab === "skills"}
        <SkillsTab {actor} />
      {:else if activeTab === "possessions"}
        <PossessionsTab {actor} />
      {:else if activeTab === "combat"}
        <CombatTab {actor} />
      {:else if activeTab === "biography"}
        <BiographyTab {actor} />
      {/if}
    </div>
  </div>
</div>
