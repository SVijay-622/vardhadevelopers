import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ImageAsset } from '../data/images'
import { ease } from '../lib/motion'
import { Img } from './Img'
import { Eyebrow } from './SectionHeading'

type Crumb = { label: string; to?: string }

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  image: ImageAsset
  crumbs?: Crumb[]
  /** Extra content under the title row, e.g. project meta or tags. */
  children?: ReactNode
}

/** Dark, image-led page header used across inner pages. */
export function PageHero({ eyebrow, title, intro, image, crumbs, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  return (
    <section ref={ref} className="relative flex min-h-[78svh] items-end overflow-hidden bg-ink text-white md:min-h-[86svh]">
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { y }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease }}
        >
          <Img image={image} priority className="h-full w-full object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/55 to-ink/30" />

      <div className="container-x relative pt-36 pb-14 md:pb-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="eyebrow flex flex-wrap items-center gap-3 text-white/55">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.15 }}>
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 className="display display-1 text-balance lg:col-span-8">{title}</h1>
            {intro && <p className="lead max-w-md text-white/75 lg:col-span-4 lg:justify-self-end">{intro}</p>}
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  )
}
