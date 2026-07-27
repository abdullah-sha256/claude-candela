// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// Static output only — no ecommerce, no server runtime.
export default defineConfig({
  site: 'https://candelacanada.ca',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
})
