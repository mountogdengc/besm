export async function applyTemplate(template, actor, applying = new Set()) {
  if (applying.has(template.id)) {
    console.warn(`BESM | Circular template reference detected: ${template.name}`);
    return;
  }
  applying.add(template.id);

  const itemEntries = [];

  for (const entry of template.system.entries) {
    if (entry.entryType === "item") {
      itemEntries.push({
        name: entry.name,
        type: entry.itemType,
        system: {
          ...entry.systemData,
          sourceTemplateId: template.id,
          sourceTemplateName: template.name,
        },
      });
    } else if (entry.entryType === "template") {
      const nested = await fromUuid(entry.templateId);
      if (!nested) {
        console.warn(`BESM | Nested template not found: ${entry.templateId}`);
        continue;
      }
      await applyTemplate(nested, actor, applying);
    }
  }

  if (itemEntries.length > 0) {
    await actor.createEmbeddedDocuments("Item", itemEntries);
  }

  // Apply stat modifiers
  const mods = template.system.statModifiers;
  if (mods && (mods.body || mods.mind || mods.soul)) {
    const updates = {};
    if (mods.body && actor.system.stats.body.mode !== "missing") {
      updates["system.stats.body.value"] = actor.system.stats.body.value + mods.body;
    }
    if (mods.mind && actor.system.stats.mind.mode !== "missing") {
      updates["system.stats.mind.value"] = actor.system.stats.mind.value + mods.mind;
    }
    if (mods.soul && actor.system.stats.soul.mode !== "missing") {
      updates["system.stats.soul.value"] = actor.system.stats.soul.value + mods.soul;
    }
    if (Object.keys(updates).length > 0) {
      await actor.update(updates);
    }
  }

  const appliedTemplates = [...(actor.system.appliedTemplates ?? [])];
  appliedTemplates.push({
    id: template.id,
    name: template.name,
    type: template.system.templateType,
    pointTotal: template.system.pointTotal,
    appliedAt: Date.now(),
  });
  await actor.update({ "system.appliedTemplates": appliedTemplates });

  applying.delete(template.id);
}
