import { mount, unmount } from "svelte";
import AttributeSheet from "../components/items/AttributeSheet.svelte";
import DefectSheet from "../components/items/DefectSheet.svelte";
import EnhancementSheet from "../components/items/EnhancementSheet.svelte";
import LimiterSheet from "../components/items/LimiterSheet.svelte";
import PossessionSheet from "../components/items/PossessionSheet.svelte";
import SkillSheet from "../components/items/SkillSheet.svelte";
import TemplateSheet from "../components/items/TemplateSheet.svelte";

const COMPONENT_MAP = {
  attribute: AttributeSheet,
  defect: DefectSheet,
  enhancement: EnhancementSheet,
  limiter: LimiterSheet,
  possession: PossessionSheet,
  skill: SkillSheet,
  besm4eTemplate: TemplateSheet,
};

export class BESMItemSheet extends foundry.applications.api.DocumentSheetV2 {
  static DEFAULT_OPTIONS = {
    classes: ["besm", "item-sheet"],
    position: { width: 450, height: 500 },
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
      const Component = COMPONENT_MAP[this.document.type];
      if (!Component) return;
      this.#svelteComponent = mount(Component, {
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
