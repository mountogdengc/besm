export function registerFolderHooks() {
  Hooks.on("createActor", async (actor) => {
    if (actor.type !== "character") return;
    if (actor.folder) return;

    const folder = await Folder.create({
      name: actor.name,
      type: "Actor",
      color: "#555555",
    });
    await actor.update({ folder: folder.id });
  });

  Hooks.on("updateActor", async (actor, changes) => {
    if (!changes.name) return;
    if (!actor.folder) return;
    const folder = game.folders.get(actor.folder);
    if (!folder) return;
    // Only rename if the folder name matches the old name
    // actor._source.name has the pre-update name in some contexts,
    // but after update it's already changed. Use a heuristic:
    // if the folder contains this actor and has only one direct actor child, rename.
    const folderActors = game.actors.filter(a => a.folder === actor.folder);
    const isMainActor = folderActors.some(a => a.id === actor.id && a.type === "character");
    if (isMainActor && folder.name !== changes.name) {
      await folder.update({ name: changes.name });
    }
  });
}
