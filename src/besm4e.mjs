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
