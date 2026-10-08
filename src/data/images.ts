/**
 * Central image registry. Swap `src` for Vardha's own photography (local files in
 * /public or a CDN URL) and every section using that key updates automatically.
 * Current images are licensed Unsplash placeholders.
 */
export type ImageAsset = { src: string; alt: string }

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`

export const images = {
  heroCrane: {
    src: unsplash('1535732759880-bbd5c7265e3f'),
    alt: 'Tower crane rising against a warm evening sky',
  },
  siteTeam: {
    src: unsplash('1541888946425-d81bb19240f5'),
    alt: 'Project team reviewing a reinforced concrete slab on a construction site',
  },
  planning: {
    src: unsplash('1503387762-592deb58ef4e'),
    alt: 'Architectural drawings being worked on at a drafting table',
  },
  rebarColumns: {
    src: unsplash('1531834685032-c34bf0d84c77'),
    alt: 'Construction crew fixing steel reinforcement for concrete columns',
  },
  rebarDeck: {
    src: unsplash('1504307651254-35680f356dfd'),
    alt: 'Workers laying reinforcement on a building deck',
  },
  whiteAngular: {
    src: unsplash('1487958449943-2429e8be8625'),
    alt: 'Angular white facade of a contemporary building',
  },
  darkFacade: {
    src: unsplash('1488972685288-c3fd157d7c7a'),
    alt: 'Layered metal facade with sweeping horizontal bands',
  },
  glassBuilding: {
    src: unsplash('1574958269340-fa927503f3dd'),
    alt: 'Contemporary glass-fronted building at dusk',
  },
  cranes: {
    src: unsplash('1429497419816-9ca5cfb4571a'),
    alt: 'Tower cranes above a structure under construction',
  },
  earthworks: {
    src: unsplash('1517089596392-fb9a9033e05b'),
    alt: 'Aerial view of excavators preparing land for development',
  },
  residentialDark: {
    src: unsplash('1545324418-cc1a3fa10c00'),
    alt: 'Residential apartment block with dark cladding and balconies',
  },
  stoneResidential: {
    src: unsplash('1448630360428-65456885c650'),
    alt: 'Stone-clad residential facade against a clear sky',
  },
  structureFrame: {
    src: unsplash('1508450859948-4e04fabaa4ea'),
    alt: 'Multi-storey building frame under construction',
  },
  concreteFacade: {
    src: unsplash('1541976590-713941681591'),
    alt: 'Concrete facade with recessed windows viewed from below',
  },
  whiteFacade: {
    src: unsplash('1479839672679-a46483c0e7c8'),
    alt: 'Modular white facade of a residential building',
  },
  excavator: {
    src: unsplash('1503708928676-1cb796a0891e'),
    alt: 'Excavator working on a cleared development site',
  },
  timberResidence: {
    src: unsplash('1600047509807-ba8f99d2cdde'),
    alt: 'Contemporary residence with timber and render facade',
  },
  whiteResidence: {
    src: unsplash('1523217582562-09d0def993a6'),
    alt: 'Minimal white residence with a landscaped forecourt',
  },
  glassTowers: {
    src: unsplash('1486406146926-c627a92ad1ab'),
    alt: 'Glass towers viewed from street level',
  },
  towersOvercast: {
    src: unsplash('1511818966892-d7d671e672a2'),
    alt: 'Glass office towers under an overcast sky',
  },
} satisfies Record<string, ImageAsset>
