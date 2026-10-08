import { images, type ImageAsset } from './images.ts'

/** Nodes in the partner-network diagram. */
export type NetworkCategory = { name: string; role: string }

export const networkCategories: NetworkCategory[] = [
  { name: 'Landowners', role: 'Land with development potential, unlocked through structured partnerships.' },
  { name: 'Builders', role: 'Collaboration on development opportunities and execution.' },
  { name: 'Strategic Partners', role: 'Developers and business partners aligned around a shared opportunity.' },
  { name: 'Investors', role: 'Capital partners looking for well-structured developments.' },
  { name: 'Architects', role: 'Design that shapes how a development performs and endures.' },
  { name: 'Engineers', role: 'Structural and services expertise behind every build.' },
  { name: 'Contractors', role: 'Teams on site, coordinated to programme and quality.' },
  { name: 'Consultants', role: 'Specialist advice across approvals, cost and planning.' },
  { name: 'Suppliers', role: 'Materials and services sourced with cost and quality in view.' },
]

export type PartnerProgram = {
  slug: string
  number: string
  title: string
  headline: string
  short: string
  intro: string
  points: { title: string; text: string }[]
  steps: string[]
  cta: { label: string; to: string }
  image: ImageAsset
}

export const partnerPrograms: PartnerProgram[] = [
  {
    slug: 'landowners',
    number: '01',
    title: 'Landowners',
    headline: 'Have land?',
    short: 'Understand what your land could become — and the right way to realise it.',
    intro:
      'If you own land, Vardha can help you understand its potential and explore the right way to develop it — whether through joint development or another structured partnership.',
    points: [
      { title: 'Land Evaluation', text: 'An experienced assessment of the site, its context and its constraints.' },
      { title: 'Development Potential', text: 'What the land could support, and the options worth considering.' },
      { title: 'Joint Development', text: 'Arrangements where land and development expertise come together.' },
      { title: 'Structured Partnerships', text: 'Clear agreements so every party understands their role and return.' },
    ],
    steps: ['Share your property details', 'Initial evaluation', 'Explore development options', 'Structure the partnership'],
    cta: { label: 'Submit Your Property', to: '/contact?type=landowner' },
    image: images.earthworks,
  },
  {
    slug: 'builders',
    number: '02',
    title: 'Builders',
    headline: 'Build together.',
    short: 'Development opportunities, project collaboration and execution partnerships.',
    intro:
      'Vardha works with builders on development opportunities where combined experience and capacity lead to a stronger project.',
    points: [
      { title: 'Development Opportunities', text: 'Access to opportunities identified and evaluated by Vardha.' },
      { title: 'Project Collaboration', text: 'Working together across planning, design and delivery.' },
      { title: 'Execution Partnerships', text: 'Shared responsibility for delivering to programme and quality.' },
    ],
    steps: ['Introduce your company', 'Discuss capabilities', 'Identify a fit', 'Agree the partnership'],
    cta: { label: 'Partner With Us', to: '/contact?type=partnership' },
    image: images.rebarDeck,
  },
  {
    slug: 'strategic-partners',
    number: '03',
    title: 'Strategic Partners',
    headline: 'Aligned on value.',
    short: 'Developers, investors and business partners aligned around long-term value.',
    intro:
      'For developers, investors and business partners, Vardha brings experience in identifying, structuring and executing developments.',
    points: [
      { title: 'Developers', text: 'Collaboration on opportunities that benefit from shared expertise.' },
      { title: 'Investors', text: 'Developments structured with clarity, governance and a long-term view.' },
      { title: 'Business Partners', text: 'Partnerships built on transparency and accountability.' },
    ],
    steps: ['Start a conversation', 'Understand objectives', 'Evaluate opportunities', 'Structure the partnership'],
    cta: { label: 'Start a Conversation', to: '/contact?type=partnership' },
    image: images.glassTowers,
  },
  {
    slug: 'professional-network',
    number: '04',
    title: 'Professional Network',
    headline: 'Join the network.',
    short: 'Architects, engineers, contractors, consultants and suppliers.',
    intro:
      'Every development depends on the people who design, engineer, build and supply it. Vardha works with a network of professionals and welcomes new relationships.',
    points: [
      { title: 'Architects', text: 'Design partners for residential, commercial and mixed-use work.' },
      { title: 'Engineers', text: 'Structural, MEP and civil expertise.' },
      { title: 'Contractors', text: 'Specialist and general contractors.' },
      { title: 'Consultants', text: 'Approvals, cost, planning and specialist advisory.' },
      { title: 'Suppliers', text: 'Materials, systems and services.' },
    ],
    steps: ['Introduce your practice', 'Share relevant work', 'Discuss future projects'],
    cta: { label: 'Join Our Network', to: '/contact?type=career' },
    image: images.planning,
  },
]

export const getPartnerProgram = (slug: string | undefined) => partnerPrograms.find((p) => p.slug === slug)
