import { AnimatePresence, motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useState } from 'react'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Dot } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { FinalCta } from '../components/sections/FinalCta'
import { images } from '../data/images'
import { projects, projectStatuses, type ProjectStatus } from '../data/projects'
import { ease } from '../lib/motion'
import { cn } from '../lib/utils'

type Filter = 'All' | ProjectStatus

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.status === filter)
  const hasPlaceholders = projects.some((p) => p.placeholder)
  const filters: Filter[] = ['All', ...projectStatuses]

  return (
    <>
      <Seo
        title="Projects"
        description="Residential, mixed-use and development opportunities from Vardha Developers."
        image={images.glassTowers.src}
      />
      <PageHero
        eyebrow="Projects"
        title={
          <>
            Selected
            <br />
            projects<Dot />
          </>
        }
        intro="Developments shaped by opportunity, strategy and execution."
        image={images.glassTowers}
      />

      <section aria-label="Project portfolio" className="section-y pt-16! lg:pt-20!">
        <div className="container-x">
          <div className="flex flex-col gap-6 border-b border-ink/15 pb-6 md:flex-row md:items-center md:justify-between">
            <div role="group" aria-label="Filter projects by status" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'h-10 border px-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
                    filter === f ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink',
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="eyebrow text-concrete" aria-live="polite">
              {String(visible.length).padStart(2, '0')} {visible.length === 1 ? 'Project' : 'Projects'}
            </p>
          </div>

          {hasPlaceholders && (
            <p className="mt-6 flex items-start gap-3 text-sm text-concrete">
              <Info aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-bronze-deep" />
              Projects marked “Placeholder” are sample entries — project details and photography will be updated.
            </p>
          )}

          <motion.ul layout className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-24 lg:gap-x-12">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, i) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                  className={cn(i % 2 === 1 && 'md:mt-32')}
                >
                  <ProjectCard
                    project={project}
                    headingLevel="h2"
                    aspect={i % 4 === 0 || i % 4 === 3 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Discuss a project
            <span className="text-bronze">.</span>
          </>
        }
        text="Whether you own land or are planning a development, we’d like to understand the opportunity."
        primary={{ label: 'Discuss a Project', to: '/contact?type=project' }}
        secondary={{ label: 'Submit Your Property', to: '/contact?type=landowner' }}
        image={images.concreteFacade}
      />
    </>
  )
}
