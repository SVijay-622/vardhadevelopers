import { stats } from '../../data/content'
import { cn } from '../../lib/utils'
import { Reveal, RevealGroup, RevealItem } from '../Reveal'
import { Eyebrow } from '../SectionHeading'
import { CountUp, StatCard } from '../StatCard'

type ExperienceSectionProps = { id?: string; index?: string; className?: string }

/** Monumental "25+" with the supporting statistics row. */
export function ExperienceSection({ id, index = '01', className }: ExperienceSectionProps) {
  return (
    <section id={id} aria-labelledby="experience-title" className={cn('section-y relative overflow-hidden', className)}>
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <Eyebrow index={index}>Experience</Eyebrow>
            <p
              aria-hidden
              className="mt-6 -ml-[0.06em] text-[clamp(8rem,30vw,21rem)] leading-[0.78] font-light tracking-[-0.07em]"
            >
              <CountUp value={25} />
              <span className="text-bronze">+</span>
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pb-6" delay={0.1}>
            <h2 id="experience-title" className="display display-3">
              <span className="sr-only">25+ </span>Years of experience
            </h2>
            <p className="lead mt-5 max-w-md text-concrete">
              Experience across real estate, construction and development — the foundation for how Vardha identifies
              opportunities, structures partnerships and delivers projects.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid grid-cols-2 border-t border-ink/15 lg:mt-28 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className={cn(
                'pt-8 pb-2 pr-4 lg:pt-10',
                i % 2 === 1 && 'border-l border-ink/15 pl-5 md:pl-8',
                i >= 2 && 'mt-8 lg:mt-0',
                i >= 1 && 'lg:border-l lg:border-ink/15 lg:pl-8',
              )}
            >
              <StatCard stat={stat} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
