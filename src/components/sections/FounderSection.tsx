import { site } from '../../config/site'
import { Button } from '../Button'
import { ImageReveal } from '../ImageReveal'
import { Reveal } from '../Reveal'
import { Dot, Eyebrow } from '../SectionHeading'

type FounderSectionProps = { index?: string; showLink?: boolean; id?: string }

/** Founder portrait and message. All personal details come from site config placeholders. */
export function FounderSection({ index, showLink = true, id }: FounderSectionProps) {
  const { founder } = site

  return (
    <section id={id} aria-labelledby="founder-title" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          {founder.portrait ? (
            <ImageReveal image={founder.portrait} className="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          ) : (
            <Reveal>
              <div
                role="img"
                aria-label="Founder portrait placeholder"
                className="pattern-hatch relative flex aspect-[4/5] flex-col items-center justify-center bg-stone/70"
              >
                <svg viewBox="0 0 32 32" aria-hidden className="size-16 text-ink/30">
                  <rect x="0.75" y="0.75" width="30.5" height="30.5" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M8.5 9l7.5 14 7.5-14" fill="none" stroke="var(--color-bronze)" strokeWidth="1.25" />
                </svg>
                <p className="eyebrow mt-6 text-concrete">[Founder portrait]</p>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="flex flex-col justify-center lg:col-span-6 lg:col-start-7" delay={0.1}>
          <Eyebrow index={index}>Founder</Eyebrow>
          <h2 id="founder-title" className="display display-2 mt-6">
            Built on
            <br />
            experience<Dot />
          </h2>

          <blockquote className="mt-10 border-l border-bronze pl-6 md:pl-8">
            <p className="font-serif text-[clamp(1.5rem,2.4vw,2.125rem)] leading-snug italic">“{founder.message}”</p>
          </blockquote>
          <p className="mt-8 max-w-lg leading-relaxed text-concrete">{founder.story}</p>

          <div className="mt-10 flex items-center gap-5 border-t border-ink/15 pt-6">
            <div>
              <p className="text-lg font-semibold tracking-wide">{founder.name}</p>
              <p className="eyebrow mt-1 text-concrete">{founder.role}</p>
            </div>
          </div>

          {showLink && (
            <Button to="/about#founder" variant="text" className="mt-10 self-start">
              Read More
            </Button>
          )}
        </Reveal>
      </div>
    </section>
  )
}
