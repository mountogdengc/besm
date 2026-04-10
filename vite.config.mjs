import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/besm4e.mjs",
      formats: ["es"],
      fileName: "besm4e",
    },
    rollupOptions: {
      external: [/^\/scripts\//, /^\/prosemirror/],
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    port: 29999,
    hmr: { port: 29999 },
  },
});
