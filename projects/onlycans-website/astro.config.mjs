// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// Static output only — single wholesale brochure page, no backend.
// No UI framework: the only interactivity (mobile nav toggle, the mailto
// inquiry form) is small enough for plain <script> tags, so there's no
// islands runtime to ship.
export default defineConfig({
  site: 'https://shoponlycans.ca',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
})
