/**
 * Company-wide settings. Every value in [BRACKETS] is a placeholder awaiting
 * confirmation from Vardha Developers — replace here and it updates site-wide.
 */
import type { ImageAsset } from '../data/images.ts'

export type SocialLink = { label: string; url: string }

export const site = {
  name: 'Vardha Developers',
  tagline: 'Building Opportunities. Creating Value.',
  /** [SITE URL] — production domain, used for canonical URLs and sitemap.xml. */
  url: 'https://example.com',
  experience: '25+',
  defaultTitle: 'Vardha Developers | Real Estate & Property Development',
  description:
    'Vardha Developers brings 25+ years of experience in real estate, construction, property development, joint ventures and project management.',
  contact: {
    addressLines: ['[OFFICE ADDRESS]', '[CITY, STATE, PIN CODE]'],
    email: '[EMAIL ADDRESS]',
    phone: '[PHONE NUMBER]',
    hours: '[OFFICE HOURS]',
  },
  /** Leave `url` empty until the real profile exists — the UI shows a placeholder. */
  socials: [
    { label: 'LinkedIn', url: '' },
    { label: 'Instagram', url: '' },
  ] satisfies SocialLink[],
  founder: {
    name: '[FOUNDER NAME]',
    role: 'Founder / Managing Director',
    message: '[Founder message to be added]',
    story: '[Founder story to be added]',
    /** Set to an ImageAsset once a portrait is supplied. */
    portrait: undefined as ImageAsset | undefined,
  },
  /**
   * Endpoint that receives contact-form submissions (e.g. a form service or API route).
   * While empty, the form validates and confirms locally but does not send anything.
   */
  enquiryEndpoint: '',
}

export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'What We Do', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Partnerships', to: '/partnerships' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

/** True for "[PLACEHOLDER]" values and empty strings. */
export const isPlaceholder = (value: string) => value.trim() === '' || /^\[.*\]$/.test(value.trim())
