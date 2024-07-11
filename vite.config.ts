import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Microsoft Document Extension",
  description:
    "This is a Simple Browser extension for Microsoft document.",
  version: "0.0.2",
  icons: {
    16: "icons/16.png",
    32: "icons/32.png",
    48: "icons/48.png",
    128: "icons/128.png",
  },
  content_scripts: [
    {
      js: ["scripts/content.ts"],
      matches: ["https://learn.microsoft.com/*"],
    },
  ],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
