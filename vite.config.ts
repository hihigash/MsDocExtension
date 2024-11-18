import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, Plugin } from "vite";
import manifest from './manifest.json'

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
  plugins: [react(),viteManifestHackIssue846, crx({ manifest })],
	build: {
    rollupOptions: {
      input: {
        background: 'scripts/background.ts',
        contentScript: 'scripts/contentScript.ts',
      },
      output: {
        entryFileNames: '[name].js',
      },
		}
	}
});
