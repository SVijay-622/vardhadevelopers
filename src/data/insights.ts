import { images, type ImageAsset } from './images.ts'

export const insightCategories = [
  'Real Estate',
  'Construction',
  'Development',
  'Project Updates',
  'Founder Insights',
  'Industry Knowledge',
] as const

export type InsightCategory = (typeof insightCategories)[number]

export type Insight = {
  slug: string
  title: string
  category: InsightCategory
  date: string
  excerpt: string
  body: string[]
  image: ImageAsset
  featured?: boolean
  /** Sample articles are labelled in the UI until real articles are published. */
  placeholder: boolean
}

/**
 * SAMPLE ARTICLES — titles indicate intended topics only.
 * Replace with published articles; set `placeholder: false` for real content.
 */
const sample = {
  date: '[DATE]',
  body: ['[Article content to be added]'],
  placeholder: true,
}

export const insights: Insight[] = [
  {
    ...sample,
    slug: 'what-landowners-should-consider-before-a-joint-development',
    title: 'What landowners should consider before a joint development',
    category: 'Real Estate',
    excerpt: '[Article summary to be added]',
    image: images.earthworks,
    featured: true,
  },
  {
    ...sample,
    slug: 'from-feasibility-to-handover',
    title: 'From feasibility to handover: the shape of a development',
    category: 'Development',
    excerpt: '[Article summary to be added]',
    image: images.planning,
  },
  {
    ...sample,
    slug: 'why-execution-decides-outcomes',
    title: 'Why execution decides project outcomes',
    category: 'Construction',
    excerpt: '[Article summary to be added]',
    image: images.siteTeam,
  },
  {
    ...sample,
    slug: 'reading-a-site',
    title: 'Reading a site: the first questions in land evaluation',
    category: 'Industry Knowledge',
    excerpt: '[Article summary to be added]',
    image: images.excavator,
  },
  {
    ...sample,
    slug: 'founder-insight',
    title: '[Founder insight title]',
    category: 'Founder Insights',
    excerpt: '[Article summary to be added]',
    image: images.darkFacade,
  },
  {
    ...sample,
    slug: 'project-update',
    title: '[Project update title]',
    category: 'Project Updates',
    excerpt: '[Article summary to be added]',
    image: images.structureFrame,
  },
]

export const getInsight = (slug: string | undefined) => insights.find((i) => i.slug === slug)

export const featuredInsight = insights.find((i) => i.featured) ?? insights[0]
