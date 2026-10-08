import { Link } from 'react-router-dom'
import type { PartnerProgram } from '../data/partners'
import { cn } from '../lib/utils'
import { Arrow } from './Button'

type PartnerCardProps = { program: PartnerProgram; className?: string }

/** Ruled column linking to a partnership programme — no box, just hierarchy and a hover rule. */
export function PartnerCard({ program, className }: PartnerCardProps) {
  return (
    <article className={cn('group relative flex flex-col border-t border-ink/15 pt-6', className)}>
      <span
        aria-hidden
        className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-premium group-hover:scale-x-100"
      />
      <span className="eyebrow text-bronze-deep">{program.number}</span>
      <h3 className="mt-6 text-2xl font-medium uppercase tracking-[-0.01em]">
        <Link to={`/partnerships/${program.slug}`} className="after:absolute after:inset-0">
          {program.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-concrete">{program.short}</p>
      <span className="eyebrow mt-8 inline-flex items-center gap-2 text-ink">
        Learn more <Arrow className="size-3.5" />
      </span>
    </article>
  )
}
