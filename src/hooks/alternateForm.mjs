import { computeTransformDamage } from "../engine/alternateForm.mjs";

export async function swapToAlternateForm(parentActor, altFormActor) {
  const token = parentActor.getActiveTokens()[0];
  if (!token) {
    ui.notifications.warn("No active token found for this actor. Place a token on the scene first.");
    return;
  }

  // Step 1: Calculate damage state
  const currentMaxHP = parentActor.system.derived.hpMax;
  const currentHP = parentActor.system.derived.currentHp;
  const altMaxHP = altFormActor.system.derived.hpMax;

  // Step 2: Check for transformation healing on alt form
  const healingAttr = [...altFormActor.items].find(
    i => i.type === "attribute" &&
         i.name === "Healing" &&
         i.system.transformationHeal === true
  );
  const healAmount = healingAttr ? healingAttr.system.effectiveLevel * 5 : 0;

  // Step 3: Compute new HP
  const newHP = computeTransformDamage(currentMaxHP, currentHP, altMaxHP, healAmount);

  // Step 4: Update alt form's current HP
  await altFormActor.update({ "system.derived.currentHp": newHP });

  // Step 5: Transfer active status effects
  const existingEffects = token.actor.effects.map(e => e.toObject());
  if (existingEffects.length > 0) {
    // Clear any existing effects on alt form first
    const altEffectIds = altFormActor.effects.map(e => e.id);
    if (altEffectIds.length > 0) {
      await altFormActor.deleteEmbeddedDocuments("ActiveEffect", altEffectIds);
    }
    await altFormActor.createEmbeddedDocuments("ActiveEffect", existingEffects);
  }

  // Step 6: Record position
  const { x, y, elevation } = token;

  // Step 7: Delete current token
  await token.document.delete();

  // Step 8: Create new token for alt form
  const tokenData = await altFormActor.getTokenDocument({ x, y, elevation });
  await canvas.scene.createEmbeddedDocuments("Token", [tokenData.toObject()]);

  ui.notifications.info(`${parentActor.name} transforms into ${altFormActor.name}!`);
}
