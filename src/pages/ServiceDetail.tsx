import { Link, useParams } from 'react-router-dom'
import { Arrow } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Eyebrow, SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { ApproachProcess } from '../components/sections/ApproachProcess'
import { FinalCta } from '../components/sections/FinalCta'
import { getService, services } from '../data/services'
import { pad } from '../lib/utils'
import NotFound from './NotFound'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <NotFound />

  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <Seo title={service.title} description={service.description} image={service.image.src} />
      <PageHero
        eyebrow={`Service ${service.number}`}
        title={service.title}
        intro={service.short}
        image={service.image}
        crumbs={[{ label: 'What we do', to: '/services' }, { label: service.title }]}
      />

      <section aria-labelledby="overview-title" className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow index="01">Overview</Eyebrow>
            <h2 id="overview-title" className="sr-only">
              Overview
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <p className="text-[clamp(1.375rem,2.4vw,2rem)] leading-snug font-medium tracking-[-0.015em] text-balance">
              {service.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="eyebrow mr-2 text-concrete">Who it’s for</span>
              {service.audience.map((a) => (
                <span key={a} className="border border-ink/15 px-3 py-1.5 text-xs font-medium tracking-wide">
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="capabilities-title" className="section-y bg-ink text-white">
        <div className="container-x">
          <SectionHeading id="capabilities-title" index="02" eyebrow="Capabilities" tone="light" title="What’s involved" />
          <RevealGroup as="ol" className="mt-14 grid border-t border-white/15 md:grid-cols-2">
            {service.capabilities.map((capability, i) => (
              <RevealItem
                as="li"
                key={capability.title}
                className="border-b border-white/15 py-8 md:px-8 md:py-10 md:odd:border-r md:odd:pl-0"
              >
                <span className="font-serif text-xl text-bronze italic">{pad(i + 1)}</span>
                <h3 className="display mt-4 text-2xl md:text-3xl">{capability.title}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-white/65">{capability.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <ApproachProcess index="03" />

      <section aria-labelledby="other-services-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="other-services-title" index="04" eyebrow="Other capabilities" title="Explore further" size="md" />
          <ul className="mt-12 border-t border-ink/15">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  to={`/services/${other.slug}`}
                  className="group flex items-center justify-between gap-6 border-b border-ink/15 py-7 md:py-9"
                >
                  <span className="flex items-baseline gap-5 md:gap-8">
                    <span className="eyebrow text-bronze-deep">{other.number}</span>
                    <span className="display text-[clamp(1.5rem,3.2vw,2.75rem)] transition-transform duration-500 ease-premium group-hover:translate-x-2">
                      {other.title}
                    </span>
                  </span>
                  <Arrow className="size-6" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Discuss a project
            <span className="text-bronze">.</span>
          </>
        }
        text={`Talk to Vardha about ${service.title.toLowerCase()} for your land, project or partnership.`}
        primary={{ label: 'Discuss a Project', to: '/contact?type=project' }}
        secondary={{ label: 'Explore Projects', to: '/projects' }}
        image={service.image}
      />
    </>
  )
}
