import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { cn } from '../lib/utils'
import { Img } from './Img'
import { Tag } from './Tag'

type ProjectCardProps = {
  project: Project
  /** Aspect-ratio utility for the image frame. */
  aspect?: string
  sizes?: string
  className?: string
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({
  project,
  aspect = 'aspect-[4/3]',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  headingLevel: Heading = 'h3',
}: ProjectCardProps) {
  return (
    <article className={cn('group relative', className)}>
      <div className={cn('relative overflow-hidden bg-stone', aspect)}>
        <Img
          image={project.cover}
          sizes={sizes}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/45 via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 md:top-5 md:left-5">
          <Tag tone="light">{project.status}</Tag>
          {project.placeholder && <Tag tone="placeholder">Placeholder</Tag>}
        </div>
        <span
          aria-hidden
          className="absolute right-4 bottom-4 flex size-12 translate-y-2 items-center justify-center bg-paper text-ink opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100 md:right-5 md:bottom-5"
        >
          <ArrowUpRight strokeWidth={1.5} className="size-5" />
        </span>
      </div>

      <div className="mt-5 flex flex-col gap-3 border-t border-ink/10 pt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <Heading className="text-xl font-medium uppercase tracking-[-0.01em] md:text-2xl">
            {/* Stretched link makes the whole card clickable while keeping one accessible link. */}
            <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0">
              {project.name}
            </Link>
          </Heading>
          <p className="mt-2 text-sm text-concrete">{project.location}</p>
        </div>
        <p className="eyebrow text-concrete sm:pt-1.5 sm:text-right">{project.type}</p>
      </div>
    </article>
  )
}
