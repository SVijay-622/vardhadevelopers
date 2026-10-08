import { images, type ImageAsset } from './images.ts'

export type ProjectStatus = 'Ongoing' | 'Completed' | 'Upcoming'

export type Project = {
  slug: string
  name: string
  location: string
  type: string
  status: ProjectStatus
  area: string
  role: string
  overview: string
  opportunity: string
  approach: string
  execution: string
  cover: ImageAsset
  gallery: ImageAsset[]
  /** Shown in the homepage "Selected Projects" section. */
  featured?: boolean
  /**
   * Marks sample content. Placeholder projects are labelled as such in the UI.
   * Set to false once real project information has been supplied.
   */
  placeholder: boolean
}

/**
 * PLACEHOLDER PROJECTS — these are not real Vardha projects.
 * Replace each entry with confirmed project information and photography.
 */
const placeholderCopy = {
  area: '[AREA]',
  role: "[VARDHA'S ROLE]",
  overview:
    '[PROJECT DESCRIPTION] — an overview of the development: its site, its purpose and what it set out to achieve.',
  opportunity: '[Describe the site, the opportunity that was identified and why it was worth pursuing.]',
  approach: '[Describe how the development and any partnership were structured, planned and designed.]',
  execution: '[Describe how the project was delivered — programme, quality, coordination and handover.]',
  placeholder: true,
}

export const projects: Project[] = [
  {
    ...placeholderCopy,
    slug: 'project-one',
    name: 'Project One',
    location: 'Chennai, Tamil Nadu',
    type: 'Residential Development',
    status: 'Ongoing',
    cover: images.residentialDark,
    gallery: [images.structureFrame, images.rebarDeck, images.stoneResidential, images.whiteFacade],
    featured: true,
  },
  {
    ...placeholderCopy,
    slug: 'project-two',
    name: 'Project Two',
    location: 'Chennai, Tamil Nadu',
    type: 'Mixed Use',
    status: 'Completed',
    cover: images.glassBuilding,
    gallery: [images.glassTowers, images.concreteFacade, images.towersOvercast, images.darkFacade],
    featured: true,
  },
  {
    ...placeholderCopy,
    slug: 'project-three',
    name: 'Project Three',
    location: 'Tamil Nadu',
    type: 'Development Opportunity',
    status: 'Upcoming',
    cover: images.concreteFacade,
    gallery: [images.excavator, images.planning, images.earthworks, images.whiteAngular],
    featured: true,
  },
  {
    ...placeholderCopy,
    slug: 'project-four',
    name: 'Project Four',
    location: '[LOCATION]',
    type: 'Joint Development',
    status: 'Ongoing',
    cover: images.structureFrame,
    gallery: [images.rebarColumns, images.siteTeam, images.cranes, images.stoneResidential],
  },
  {
    ...placeholderCopy,
    slug: 'project-five',
    name: 'Project Five',
    location: '[LOCATION]',
    type: 'Residential Development',
    status: 'Completed',
    cover: images.stoneResidential,
    gallery: [images.whiteResidence, images.timberResidence, images.whiteFacade, images.residentialDark],
  },
  {
    ...placeholderCopy,
    slug: 'project-six',
    name: 'Project Six',
    location: '[LOCATION]',
    type: 'Commercial Development',
    status: 'Upcoming',
    cover: images.whiteFacade,
    gallery: [images.whiteAngular, images.glassTowers, images.planning, images.concreteFacade],
  },
]

export const projectStatuses: ProjectStatus[] = ['Ongoing', 'Completed', 'Upcoming']

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug)

export const featuredProjects = projects.filter((p) => p.featured)

export const getRelatedProjects = (slug: string, count = 3) =>
  projects.filter((p) => p.slug !== slug).slice(0, count)
