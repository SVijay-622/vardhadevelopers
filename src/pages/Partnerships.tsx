import { Button } from '../components/Button'
import { ImageReveal } from '../components/ImageReveal'
import { PageHero } from '../components/PageHero'
import { PartnerNetwork } from '../components/PartnerNetwork'
import { Reveal } from '../components/Reveal'
import { Dot, Eyebrow, SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { FinalCta } from '../components/sections/FinalCta'
import { images } from '../data/images'
import { partnerPrograms } from '../data/partners'
import { cn } from '../lib/utils'

export default function Partnerships() {
  return (
    <>
      <Seo
        title="Partnerships"
        description="Partner with Vardha Developers — landowners, builders, strategic partners and professionals working together on development opportunities."
        image={images.rebarDeck.src}
      />
      <PageHero
        eyebrow="Partnerships"
        title={
          <>
            Built on
            <br />
            partnerships<Dot />
          </>
        }
        intro="The right development brings the right people together. Find where you fit."
        image={images.rebarDeck}
      >
        <nav aria-label="Partnership types" className="mt-12 border-t border-white/15 pt-6">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {partnerPrograms.map((program) => (
              <li key={program.slug}>
                <a href={`#${program.slug}`} className="eyebrow text-white/70 transition-colors hover:text-white">
                  <span className="text-bronze">{program.number}</span> {program.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section aria-label="Partnership programmes" className="section-y">
        <div className="container-x space-y-28 lg:space-y-40">
          {partnerPrograms.map((program, i) => {
            const flipped = i % 2 === 1
            return (
              <article
                key={program.slug}
                id={program.slug}
                aria-labelledby={`${program.slug}-title`}
                className="grid scroll-mt-24 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8"
              >
                <ImageReveal
                  image={program.image}
                  className={cn('aspect-[4/3] lg:col-span-6', flipped && 'lg:order-2 lg:col-start-7')}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <Reveal className={cn('lg:col-span-5', flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8')}>
                  <Eyebrow index={program.number}>{program.title}</Eyebrow>
                  <h2 id={`${program.slug}-title`} className="display display-2 mt-6">
                    {program.headline}
                  </h2>
                  <p className="mt-6 leading-relaxed text-concrete">{program.intro}</p>
                  <ul className="mt-8 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-6">
                    {program.points.map((point) => (
                      <li key={point.title} className="flex items-center gap-3 border-b border-ink/15 py-3 text-sm font-medium">
                        <span aria-hidden className="size-1.5 rotate-45 bg-bronze" />
                        {point.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap items-center gap-6">
                    <Button to={program.cta.to}>{program.cta.label}</Button>
                    <Button to={`/partnerships/${program.slug}`} variant="text">
                      Learn More
                    </Button>
                  </div>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="network-title" className="section-y bg-paper-deep">
        <div className="container-x">
          <SectionHeading
            id="network-title"
            eyebrow="The network"
            title={
              <>
                A development ecosystem<Dot />
              </>
            }
            intro="Landowners, builders, investors and professionals — each with a defined role around every opportunity."
          />
          <Reveal className="mt-16">
            <PartnerNetwork />
          </Reveal>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Become a partner
            <span className="text-bronze">.</span>
          </>
        }
        text="Tell us who you are and what you’re looking for — we’ll take it from there."
        primary={{ label: 'Start a Conversation', to: '/contact?type=partnership' }}
        secondary={{ label: 'Submit Your Property', to: '/contact?type=landowner' }}
        image={images.towersOvercast}
      />
    </>
  )
}
