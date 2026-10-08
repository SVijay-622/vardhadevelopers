import { images, type ImageAsset } from './images.ts'

export type Capability = { title: string; text: string }

export type Service = {
  slug: string
  number: string
  title: string
  /** One-line summary used in lists and cards. */
  short: string
  /** Opening paragraph on the service page. */
  description: string
  capabilities: Capability[]
  audience: string[]
  image: ImageAsset
}

export const services: Service[] = [
  {
    slug: 'property-development',
    number: '01',
    title: 'Property Development',
    short:
      'From the first look at a site to the day it is handed over — developments structured with a long-term view.',
    description:
      'Vardha takes developments from opportunity to handover: identifying the right site, testing its feasibility, shaping the plan and carrying it through construction to completion.',
    capabilities: [
      { title: 'Opportunity Identification', text: 'Recognising land and sites with genuine development potential.' },
      { title: 'Feasibility', text: 'Testing commercial, technical and regulatory viability before commitment.' },
      { title: 'Planning', text: 'Defining the development programme, approvals path and project structure.' },
      { title: 'Development', text: 'Coordinating design, construction and stakeholders through delivery.' },
      { title: 'Handover', text: 'Completing, documenting and handing over to a defined standard.' },
    ],
    audience: ['Landowners', 'Investors', 'Strategic Partners'],
    image: images.cranes,
  },
  {
    slug: 'joint-ventures',
    number: '02',
    title: 'Joint Ventures',
    short:
      'Structured partnerships that bring landowners, builders and strategic partners together around one opportunity.',
    description:
      'Many of the best developments begin as a partnership. Vardha structures joint ventures so that each party contributes what it does best — and the arrangement is clear from the outset.',
    capabilities: [
      { title: 'Landowners', text: 'Joint development arrangements that unlock the value of land.' },
      { title: 'Builders', text: 'Collaboration on development opportunities and shared execution.' },
      { title: 'Strategic Partners', text: 'Partnerships with developers, investors and business partners.' },
      { title: 'Project Structuring', text: 'Clear roles, responsibilities and agreements for every party.' },
    ],
    audience: ['Landowners', 'Builders', 'Investors', 'Developers'],
    image: images.excavator,
  },
  {
    slug: 'project-management',
    number: '03',
    title: 'Project Management',
    short:
      'Structured management from planning through delivery — so projects run to programme, quality and budget.',
    description:
      'Execution decides outcomes. Vardha provides structured project management that keeps design, procurement, contractors and quality aligned from the first drawing to the final handover.',
    capabilities: [
      { title: 'Planning', text: 'Programmes, budgets and sequencing set before work begins.' },
      { title: 'Design Coordination', text: 'Aligning architects, engineers and consultants around one brief.' },
      { title: 'Contractor Management', text: 'Selecting, coordinating and supervising contractors on site.' },
      { title: 'Procurement', text: 'Sourcing materials and services with cost and quality in view.' },
      { title: 'Quality', text: 'Defined standards, inspections and checks at every stage.' },
      { title: 'Execution', text: 'Day-to-day site leadership through to completion.' },
    ],
    audience: ['Landowners', 'Developers', 'Investors', 'Builders'],
    image: images.rebarColumns,
  },
  {
    slug: 'development-consultancy',
    number: '04',
    title: 'Development Consultancy',
    short: 'Independent advice on land, feasibility and strategy — before the significant decisions are made.',
    description:
      'For landowners and partners who want an experienced view before committing, Vardha offers consultancy on what a site can become and how best to get there.',
    capabilities: [
      { title: 'Land Evaluation', text: 'Assessing a site, its context and its development potential.' },
      { title: 'Project Feasibility', text: 'Understanding viability, risks and the options available.' },
      { title: 'Development Strategy', text: 'Choosing the right model, partners and phasing.' },
      { title: 'Execution Guidance', text: 'Advice through delivery to keep the strategy on course.' },
    ],
    audience: ['Landowners', 'Investors', 'Builders', 'Strategic Partners'],
    image: images.planning,
  },
]

export const getService = (slug: string | undefined) => services.find((s) => s.slug === slug)
