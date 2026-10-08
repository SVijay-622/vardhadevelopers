import { Button } from '../components/Button'
import { ImageReveal } from '../components/ImageReveal'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Dot } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { ApproachProcess } from '../components/sections/ApproachProcess'
import { FinalCta } from '../components/sections/FinalCta'
import { positioning } from '../data/content'
import { images } from '../data/images'
import { services } from '../data/services'
import { cn } from '../lib/utils'

export default function Services() {
  return (
    <>
      <Seo
        title="What We Do"
        description="Property development, joint ventures, project management and development consultancy from Vardha Developers."
        image={images.structureFrame.src}
      />
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Four capabilities<Dot />
            <br />
            One perspective<Dot />
          </>
        }
        intro="From identifying an opportunity to handing over a completed development."
        image={images.structureFrame}
      />

      <section aria-label="Introduction" className="section-y pb-0!">
        <div className="container-x">
          <Reveal>
            <p className="max-w-5xl text-[clamp(1.5rem,3vw,2.5rem)] leading-tight font-medium tracking-[-0.02em] text-balance">
              {positioning}
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-label="Services" className="section-y">
        <div className="container-x space-y-24 lg:space-y-40">
          {services.map((service, i) => {
            const flipped = i % 2 === 1
            return (
              <article key={service.slug} className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
                <ImageReveal
                  image={service.image}
                  className={cn('aspect-[4/3] lg:col-span-7', flipped && 'lg:order-2 lg:col-start-6')}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
                <Reveal className={cn('lg:col-span-4', flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9')}>
                  <p className="font-serif text-6xl leading-none text-bronze italic">{service.number}</p>
                  <h2 className="display display-3 mt-6">{service.title}</h2>
                  <p className="mt-5 leading-relaxed text-concrete">{service.description}</p>
                  <ul className="mt-8 border-t border-ink/15">
                    {service.capabilities.map((c) => (
                      <li key={c.title} className="border-b border-ink/15 py-3 text-sm font-medium tracking-wide">
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <Button to={`/services/${service.slug}`} variant="text" className="mt-8">
                    Explore {service.title}
                  </Button>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>

      <ApproachProcess />
      <FinalCta
        title={
          <>
            Have an opportunity
            <br />
            in mind<span className="text-bronze">?</span>
          </>
        }
        text="Tell us about the land, the project or the partnership you are considering."
        primary={{ label: 'Discuss a Project', to: '/contact?type=project' }}
        secondary={{ label: 'Submit Your Property', to: '/contact?type=landowner' }}
      />
    </>
  )
}
