// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Static output only — no ecommerce, no server runtime.
export default defineConfig({
  site: 'https://candelacanada.ca',
  output: 'static',
  // @astrojs/sitemap needs `site` above to build absolute URLs. It reads the
  // page list at build time, so sitemap-index.xml/sitemap-0.xml regenerate
  // automatically — no upkeep as pages are added.
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
