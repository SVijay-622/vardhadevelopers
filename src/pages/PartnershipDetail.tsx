import { useParams } from 'react-router-dom'
import { Button } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { PartnerCard } from '../components/PartnerCard'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Eyebrow, SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { FinalCta } from '../components/sections/FinalCta'
import { getPartnerProgram, partnerPrograms } from '../data/partners'
import { pad } from '../lib/utils'
import NotFound from './NotFound'

export default function PartnershipDetail() {
  const { slug } = useParams()
  const program = getPartnerProgram(slug)
  if (!program) return <NotFound />

  const others = partnerPrograms.filter((p) => p.slug !== program.slug)

  return (
    <>
      <Seo title={`Partnerships — ${program.title}`} description={program.intro} image={program.image.src} />
      <PageHero
        eyebrow={`Partnerships / ${program.title}`}
        title={program.headline}
        intro={program.short}
        image={program.image}
        crumbs={[{ label: 'Partnerships', to: '/partnerships' }, { label: program.title }]}
      />

      <section aria-labelledby="intro-title" className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="01">{program.title}</Eyebrow>
            <h2 id="intro-title" className="sr-only">
              {program.title}
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <p className="text-[clamp(1.375rem,2.4vw,2rem)] leading-snug font-medium tracking-[-0.015em] text-balance">
              {program.intro}
            </p>
            <Button to={program.cta.to} className="mt-10">
              {program.cta.label}
            </Button>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="offer-title" className="section-y bg-ink text-white">
        <div className="container-x">
          <SectionHeading id="offer-title" index="02" eyebrow="What we offer" title="How we work together" tone="light" />
          <RevealGroup as="ol" className="mt-14 grid border-t border-white/15 md:grid-cols-2">
            {program.points.map((point, i) => (
              <RevealItem
                as="li"
                key={point.title}
                className="border-b border-white/15 py-8 md:px-8 md:py-10 md:odd:border-r md:odd:pl-0"
              >
                <span className="font-serif text-xl text-bronze italic">{pad(i + 1)}</span>
                <h3 className="display mt-4 text-2xl md:text-3xl">{point.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-white/65">{point.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="section-y bg-paper-deep">
        <div className="container-x">
          <SectionHeading id="steps-title" index="03" eyebrow="The process" title="Getting started" size="md" />
          <RevealGroup as="ol" className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {program.steps.map((step, i) => (
              <RevealItem as="li" key={step} className="bg-paper-deep p-6 md:p-8">
                <span className="eyebrow text-bronze-deep">Step {pad(i + 1)}</span>
                <p className="mt-4 text-xl font-medium tracking-[-0.01em]">{step}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="other-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="other-title" index="04" eyebrow="Other partnerships" title="Explore further" size="md" />
          <RevealGroup className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {others.map((other) => (
              <RevealItem key={other.slug} className="flex">
                <PartnerCard program={other} className="w-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta
        title={
          <>
            {program.cta.label}
            <span className="text-bronze">.</span>
          </>
        }
        text="Share a few details and we’ll be in touch to understand the opportunity."
        primary={program.cta}
        secondary={{ label: 'All Partnerships', to: '/partnerships' }}
      />
    </>
  )
}
