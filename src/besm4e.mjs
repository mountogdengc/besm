import "./styles/global.css";
import { BESMActorSheet } from "./sheets/BESMActorSheet.mjs";

Hooks.on("init", () => {
  console.log("BESM 4e | Initializing BESM 4th Edition system");

  Actors.registerSheet("besm", BESMActorSheet, {
    types: ["character"],
    makeDefault: true,
    label: "BESM4e.SheetCharacter",
  });
});
