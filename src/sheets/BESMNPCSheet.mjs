import { mount, unmount } from "svelte";
import NPCSheet from "../components/sheets/NPCSheet.svelte";

export class BESMNPCSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "actor-sheet", "npc-sheet"],
    position: { width: 700, height: 550 },
    window: { resizable: true },
  };

  #svelteComponent = null;

  async _renderHTML(context, options) {
    const el = document.createElement("div");
    el.classList.add("svelte-mount");
    return el;
  }

  _replaceHTML(element, html, options) {
    super._replaceHTML(element, html, options);
    if (!this.#svelteComponent) {
      this.#svelteComponent = mount(NPCSheet, {
        target: html,
        props: { document: this.document, sheet: this },
      });
    }
  }

  async close(options) {
    if (this.#svelteComponent) {
      unmount(this.#svelteComponent);
      this.#svelteComponent = null;
    }
    return super.close(options);
  }
}
