import { insights } from './insights.ts'
import { partnerPrograms } from './partners.ts'
import { projects } from './projects.ts'
import { services } from './services.ts'

const staticPaths = ['/', '/about', '/services', '/projects', '/partnerships', '/insights', '/contact']

/** Every indexable path — consumed by the sitemap generator in vite.config.ts. */
export const getSitemapPaths = () => [
  ...staticPaths,
  ...services.map((s) => `/services/${s.slug}`),
  ...projects.map((p) => `/projects/${p.slug}`),
  ...partnerPrograms.map((p) => `/partnerships/${p.slug}`),
  ...insights.map((i) => `/insights/${i.slug}`),
]
