/**
 * Shared editorial content. Copy here is derived from Vardha's brand positioning;
 * statements marked [BRACKETS] are placeholders awaiting company information.
 */

export type Stat = {
  /** Numeric values animate on scroll; omit for placeholder figures. */
  value?: number
  /** Text shown when there is no numeric value, e.g. "XX". */
  display?: string
  pad?: number
  suffix?: string
  label: string
}

export const stats: Stat[] = [
  { value: 25, suffix: '+', label: 'Years Experience' },
  { value: 4, pad: 2, label: 'Core Capabilities' },
  { display: 'XX', suffix: '+', label: 'Projects / Opportunities' },
  { display: 'XX', suffix: '+', label: 'Professional Partners' },
]

export const positioning =
  'Vardha is not simply a builder. Vardha identifies opportunities, structures developments, manages execution, and creates long-term value.'

export const whoWeAre =
  'Vardha Developers brings together experience in real estate, construction and development to identify opportunities, structure partnerships and deliver projects with a long-term perspective.'

export const approachSteps = [
  { title: 'Identify', text: 'Opportunity identification' },
  { title: 'Evaluate', text: 'Feasibility and potential' },
  { title: 'Structure', text: 'Development and partnership strategy' },
  { title: 'Develop', text: 'Planning and execution' },
  { title: 'Deliver', text: 'Quality, completion and handover' },
]

export const principles = [
  { title: 'Experience', text: '25+ years of real estate and construction experience.' },
  { title: 'Network', text: 'A strong ecosystem of landowners, builders, consultants and professionals.' },
  { title: 'Execution', text: 'Structured project management from planning through delivery.' },
  { title: 'Trust', text: 'Long-term relationships built through transparency and accountability.' },
]

export const values = [
  { title: 'Integrity', text: 'Doing what we say, and saying what we will do.' },
  { title: 'Execution', text: 'Plans are only as good as their delivery.' },
  { title: 'Partnership', text: 'The best developments are built by the right people together.' },
  { title: 'Long-term Thinking', text: 'Decisions measured by the value they create over time.' },
  { title: 'Accountability', text: 'Clear ownership of outcomes at every stage.' },
]

/** Draft statements derived from the brand positioning — confirm with Vardha before launch. */
export const vision =
  'To be the development partner that landowners, builders and investors trust to turn opportunity into lasting value.'

export const mission =
  'To identify the right opportunities, structure them with clarity, and deliver them with discipline — through experience, partnership and accountability.'

export const companyStory = '[Company story to be added — how Vardha began, how it has grown, and the work that defines it.]'
