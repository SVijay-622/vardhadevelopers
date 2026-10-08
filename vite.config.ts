import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { site } from './src/config/site.ts'
import { getSitemapPaths } from './src/data/routes.ts'

/** Emits sitemap.xml at build time from the same content data the site renders. */
function sitemap(): Plugin {
  return {
    name: 'vardha-sitemap',
    apply: 'build',
    generateBundle() {
      const base = site.url.replace(/\/$/, '')
      const urls = getSitemapPaths()
        .map((path) => `  <url><loc>${base}${path}</loc></url>`)
        .join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sitemap()],
})
