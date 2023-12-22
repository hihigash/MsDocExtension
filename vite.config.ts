import { defineConfig } from 'vite'
import { crx, defineManifest } from '@crxjs/vite-plugin'

const manifest = defineManifest({
  manifest_version: 3,
  name: 'My Extension',
  description: 'My Extension',
  version: '0.0.1',
  icons: {
    16: 'icons/16.png',
    32: 'icons/32.png',
    48: 'icons/48.png',
    128: 'icons/128.png',
  },
  content_scripts: [
    {
      js: ['scripts/content.ts'],
      matches: ['https://learn.microsoft.com/*'],
    }
  ],});

  export default defineConfig({
    plugins: [crx({ manifest})],
  });
