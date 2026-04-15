import "./styles/global.css";
import { BESMActorSheet } from "./sheets/BESMActorSheet.mjs";
import { BESMItemSheet } from "./sheets/BESMItemSheet.mjs";
import { BESMNPCSheet } from "./sheets/BESMNPCSheet.mjs";
import { BESMVehicleSheet } from "./sheets/BESMVehicleSheet.mjs";
import { BESMMechaSheet } from "./sheets/BESMMechaSheet.mjs";
import { CharacterData } from "./models/actors/CharacterData.mjs";
import { NPCData } from "./models/actors/NPCData.mjs";
import { VehicleData } from "./models/actors/VehicleData.mjs";
import { MechaData } from "./models/actors/MechaData.mjs";
import { AttributeData } from "./models/items/AttributeData.mjs";
import { EnhancementData } from "./models/items/EnhancementData.mjs";
import { LimiterData } from "./models/items/LimiterData.mjs";
import { DefectData } from "./models/items/DefectData.mjs";
import { PossessionData } from "./models/items/PossessionData.mjs";
import { SkillData } from "./models/items/SkillData.mjs";
import { BESMTemplateData } from "./models/items/BESMTemplateData.mjs";
import { registerSettings } from "./settings/registerSettings.mjs";
import { registerFolderHooks } from "./hooks/folderHooks.mjs";
import { BESM_STATUS_EFFECTS } from "./combat/statusEffects.mjs";
import { performDefenceRoll, applyDamage, promptEpBonus, executeAttackRoll, executeDefenceRoll, executeSanityRoll } from "./rolls/BESMCombat.mjs";
import { executeStatRoll, executeSkillRoll } from "./rolls/BESMRoll.mjs";
import { performSocialDefenceRoll, applySocialDamage } from "./rolls/BESMSocial.mjs";
import { readEdgeSelection } from "./engine/rolls.mjs";

Hooks.on("init", () => {
  console.log("BESM 4e | Initializing BESM 4th Edition system");

  CONFIG.Actor.dataModels.character = CharacterData;
  CONFIG.Actor.dataModels.npc = NPCData;
  CONFIG.Actor.dataModels.vehicle = VehicleData;
  CONFIG.Actor.dataModels.mecha = MechaData;

  CONFIG.Item.dataModels.attribute = AttributeData;
  CONFIG.Item.dataModels.enhancement = EnhancementData;
  CONFIG.Item.dataModels.limiter = LimiterData;
  CONFIG.Item.dataModels.defect = DefectData;
  CONFIG.Item.dataModels.possession = PossessionData;
  CONFIG.Item.dataModels.skill = SkillData;
  CONFIG.Item.dataModels.besm4eTemplate = BESMTemplateData;

  registerSettings();
  registerFolderHooks();

  // Initiative override
  try {
    const initMode = game.settings.get("besm", "initiativeMode");
    if (initMode === "cv_static") {
      CONFIG.Combat.initiative = { formula: "@derived.initiative", decimals: 0 };
    } else {
      CONFIG.Combat.initiative = { formula: "2d6 + @derived.initiative", decimals: 0 };
    }
  } catch {
    CONFIG.Combat.initiative = { formula: "2d6 + @derived.initiative", decimals: 0 };
  }

  // Register BESM status effects
  CONFIG.statusEffects = BESM_STATUS_EFFECTS;

  // Type labels so Foundry shows plain text instead of keys
  CONFIG.Actor.typeLabels = {
    character: "Character",
    npc: "NPC",
    vehicle: "Vehicle",
    mecha: "Mecha",
  };
  CONFIG.Item.typeLabels = {
    attribute: "Attribute",
    defect: "Defect",
    enhancement: "Enhancement",
    limiter: "Limiter",
    possession: "Possession",
    skill: "Skill",
    besm4eTemplate: "Template",
  };

  foundry.documents.collections.Actors.registerSheet("besm", BESMActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "Character Sheet",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMNPCSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "NPC Sheet",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMVehicleSheet, {
    types: ["vehicle"],
    makeDefault: true,
    label: "Vehicle Sheet",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMMechaSheet, {
    types: ["mecha"],
    makeDefault: true,
    label: "Mecha Sheet",
  });

  foundry.documents.collections.Items.registerSheet("besm", BESMItemSheet, {
    types: ["attribute", "defect", "enhancement", "limiter", "possession", "skill", "besm4eTemplate"],
    makeDefault: true,
    label: "Item Sheet",
  });
});

Hooks.on("renderChatMessageHTML", (message, el) => {

  // Defend button
  el.querySelectorAll('[data-action="defend"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const msgId = btn.getAttribute("data-message-id");
      const attackMsg = game.messages.get(msgId);
      if (!attackMsg) return;
      const controlled = canvas.tokens?.controlled?.[0];
      const defender = controlled?.actor ?? game.user.character;
      if (!defender) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await performDefenceRoll(defender, attackMsg);
    });
  });

  // Auto-Defend button
  el.querySelectorAll('[data-action="auto-defend"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const msgId = btn.getAttribute("data-message-id");
      const attackMsg = game.messages.get(msgId);
      if (!attackMsg) return;
      const controlled = canvas.tokens?.controlled?.[0];
      const defender = controlled?.actor;
      if (!defender) {
        ui.notifications.warn("Select the defending token first.");
        return;
      }
      await performDefenceRoll(defender, attackMsg);
    });
  });

  // Apply Damage button
  el.querySelectorAll('[data-action="apply-damage"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const defenderId = btn.getAttribute("data-defender-id");
      const damage = Number(btn.getAttribute("data-damage"));
      const defender = game.actors.get(defenderId);
      if (defender) await applyDamage(defender, damage);
    });
  });

  // Spend EP button
  el.querySelectorAll('[data-action="spend-ep"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const actorId = btn.getAttribute("data-actor-id");
      const total = Number(btn.getAttribute("data-total"));
      const msgId = btn.getAttribute("data-message-id");
      const actor = game.actors.get(actorId);
      if (actor) await promptEpBonus(actor, total, msgId);
    });
  });

  // Social Defend button
  el.querySelectorAll('[data-action="social-defend"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const msgId = btn.getAttribute("data-message-id");
      const attackMsg = game.messages.get(msgId);
      if (!attackMsg) return;
      const controlled = canvas.tokens?.controlled?.[0];
      const defender = controlled?.actor ?? game.user.character;
      if (!defender) {
        ui.notifications.warn("Select a token or assign a character to defend.");
        return;
      }
      await performSocialDefenceRoll(defender, attackMsg);
    });
  });

  // Apply Social Damage button
  el.querySelectorAll('[data-action="apply-social-damage"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const defenderId = btn.getAttribute("data-defender-id");
      const damage = Number(btn.getAttribute("data-damage"));
      const defender = game.actors.get(defenderId);
      if (defender) await applySocialDamage(defender, damage);
    });
  });

  // Execute roll buttons (chat card pattern)
  el.querySelectorAll('[data-action="execute-stat-roll"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const edge = readEdgeSelection(btn.closest(".besm-roll"));
      const actorId = btn.getAttribute("data-actor-id");
      const statLabel = btn.getAttribute("data-stat-key");
      const statValue = Number(btn.getAttribute("data-stat-value"));
      await executeStatRoll(actorId, statLabel, statValue, edge);
    });
  });

  el.querySelectorAll('[data-action="execute-skill-roll"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const edge = readEdgeSelection(btn.closest(".besm-roll"));
      const actorId = btn.getAttribute("data-actor-id");
      const statLabel = btn.getAttribute("data-stat-key");
      const statValue = Number(btn.getAttribute("data-stat-value"));
      const skillLevel = Number(btn.getAttribute("data-skill-level"));
      const skillName = btn.getAttribute("data-skill-name");
      await executeSkillRoll(actorId, statLabel, statValue, skillLevel, skillName, edge);
    });
  });

  el.querySelectorAll('[data-action="execute-attack-roll"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const edge = readEdgeSelection(btn.closest(".besm-roll"));
      await executeAttackRoll(btn, edge);
    });
  });

  el.querySelectorAll('[data-action="execute-defence-roll"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const edge = readEdgeSelection(btn.closest(".besm-roll"));
      await executeDefenceRoll(btn, edge);
    });
  });

  el.querySelectorAll('[data-action="execute-sanity-roll"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const edge = readEdgeSelection(btn.closest(".besm-roll"));
      await executeSanityRoll(btn, edge);
    });
  });
});
