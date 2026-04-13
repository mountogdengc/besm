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
import { registerSettings } from "./settings/registerSettings.mjs";
import { BESM_STATUS_EFFECTS } from "./combat/statusEffects.mjs";
import { performDefenceRoll, applyDamage, promptEpBonus } from "./rolls/BESMCombat.mjs";
import { performSocialDefenceRoll, applySocialDamage } from "./rolls/BESMSocial.mjs";

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

  registerSettings();

  // Initiative override
  try {
    const initMode = game.settings.get("besm", "initiativeMode");
    if (initMode === "cv_static") {
      CONFIG.Combat.initiative = { formula: "@derived.acv", decimals: 0 };
    } else {
      CONFIG.Combat.initiative = { formula: "2d6 + @derived.acv", decimals: 0 };
    }
  } catch {
    CONFIG.Combat.initiative = { formula: "2d6 + @derived.acv", decimals: 0 };
  }

  // Register BESM status effects
  CONFIG.statusEffects = BESM_STATUS_EFFECTS;

  foundry.documents.collections.Actors.registerSheet("besm", BESMActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "BESM4e.SheetCharacter",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMNPCSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "BESM4e.SheetNPC",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMVehicleSheet, {
    types: ["vehicle"],
    makeDefault: true,
    label: "BESM4e.SheetVehicle",
  });

  foundry.documents.collections.Actors.registerSheet("besm", BESMMechaSheet, {
    types: ["mecha"],
    makeDefault: true,
    label: "BESM4e.SheetMecha",
  });

  foundry.documents.collections.Items.registerSheet("besm", BESMItemSheet, {
    types: ["attribute", "defect", "enhancement", "limiter", "possession", "skill"],
    makeDefault: true,
    label: "BESM4e.SheetItem",
  });
});

Hooks.on("renderChatMessage", (message, html) => {
  // Defend button
  html.querySelectorAll('[data-action="defend"]').forEach(btn => {
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
  html.querySelectorAll('[data-action="auto-defend"]').forEach(btn => {
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
  html.querySelectorAll('[data-action="apply-damage"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const defenderId = btn.getAttribute("data-defender-id");
      const damage = Number(btn.getAttribute("data-damage"));
      const defender = game.actors.get(defenderId);
      if (defender) await applyDamage(defender, damage);
    });
  });

  // Spend EP button
  html.querySelectorAll('[data-action="spend-ep"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const actorId = btn.getAttribute("data-actor-id");
      const total = Number(btn.getAttribute("data-total"));
      const msgId = btn.getAttribute("data-message-id");
      const actor = game.actors.get(actorId);
      if (actor) await promptEpBonus(actor, total, msgId);
    });
  });

  // Social Defend button
  html.querySelectorAll('[data-action="social-defend"]').forEach(btn => {
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
  html.querySelectorAll('[data-action="apply-social-damage"]').forEach(btn => {
    btn.addEventListener("click", async () => {
      const defenderId = btn.getAttribute("data-defender-id");
      const damage = Number(btn.getAttribute("data-damage"));
      const defender = game.actors.get(defenderId);
      if (defender) await applySocialDamage(defender, damage);
    });
  });
});
