import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "MSDOC2GHMD",
  description:
    "Open the markdown file on the Github repo from the current Microsoft document.",
  version: "0.0.1",
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

const viteManifestHackIssue846: Plugin & { renderCrxManifest: (manifest: any, bundle: any) => void } = {
  // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
  name: 'manifestHackIssue846',
  renderCrxManifest(_manifest, bundle) {
      bundle['manifest.json'] = bundle['.vite/manifest.json']
      bundle['manifest.json'].fileName = 'manifest.json'
      delete bundle['.vite/manifest.json']
  },
}

export default defineConfig({
  plugins: [viteManifestHackIssue846, crx({ manifest })],
});
