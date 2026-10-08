import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Service } from '../data/services'
import { cn } from '../lib/utils'
import { Img } from './Img'

type ServiceCardProps = {
  service: Service
  active?: boolean
  onActivate?: () => void
  /** Shows the image inline (used below the desktop breakpoint, where there is no side panel). */
  inlineImage?: boolean
}

/** Editorial service row: number, title, description, capabilities and an arrow. Designed for dark sections. */
export function ServiceCard({ service, active = false, onActivate, inlineImage = true }: ServiceCardProps) {
  return (
    <article
      className="group relative border-t border-white/12 py-8 md:py-10"
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      {inlineImage && (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden bg-graphite lg:hidden">
          <Img image={service.image} sizes="100vw" className="h-full w-full object-cover" />
        </div>
      )}

      <div className="flex items-start gap-5 md:gap-8">
        <span className="eyebrow mt-2 text-bronze md:mt-3">{service.number}</span>
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              'display text-[clamp(1.75rem,3.6vw,3.25rem)] transition-[color,transform] duration-500 ease-premium',
              active ? 'text-white lg:translate-x-2' : 'text-white lg:text-white/55',
            )}
          >
            <Link to={`/services/${service.slug}`} className="after:absolute after:inset-0">
              {service.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/60">{service.short}</p>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs tracking-wide text-white/60">
            {service.capabilities.map((c, i) => (
              <li key={c.title} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden className="h-px w-3 bg-white/25" />}
                {c.title}
              </li>
            ))}
          </ul>
        </div>
        <span
          aria-hidden
          className={cn(
            'mt-1 flex size-11 shrink-0 items-center justify-center border transition-all duration-500 ease-premium md:size-14',
            active ? 'border-white/20 text-white lg:border-bronze lg:bg-bronze lg:text-ink' : 'border-white/20 text-white',
          )}
        >
          <ArrowUpRight strokeWidth={1.5} className={cn('size-5 transition-transform duration-500', active && 'lg:rotate-45')} />
        </span>
      </div>
    </article>
  )
}
