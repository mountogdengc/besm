import { mount, unmount } from "svelte";
import CharacterSheet from "../components/sheets/CharacterSheet.svelte";

export class BESMActorSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "actor-sheet"],
    position: { width: 800, height: 650 },
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
      this.#svelteComponent = mount(CharacterSheet, {
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
