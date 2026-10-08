import { ImageReveal } from '../components/ImageReveal'
import { PageHero } from '../components/PageHero'
import { PartnerNetwork } from '../components/PartnerNetwork'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Dot, Eyebrow, SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { ExperienceSection } from '../components/sections/ExperienceSection'
import { FinalCta } from '../components/sections/FinalCta'
import { FounderSection } from '../components/sections/FounderSection'
import { companyStory, mission, positioning, values, vision, whoWeAre } from '../data/content'
import { images } from '../data/images'
import { pad } from '../lib/utils'

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Vardha Developers brings together 25+ years of experience in real estate, construction and development to identify opportunities, structure partnerships and deliver projects."
        image={images.whiteAngular.src}
      />
      <PageHero
        eyebrow="About Vardha"
        title={
          <>
            Experience that
            <br />
            sees opportunity<Dot />
          </>
        }
        intro="Real estate, construction and development experience — brought together with a long-term perspective."
        image={images.whiteAngular}
      />

      {/* Our story */}
      <section aria-labelledby="story-title" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow index="01">Our story</Eyebrow>
              <h2 id="story-title" className="display display-3 mt-6">
                Building opportunities<Dot />
                <br />
                Creating value<Dot />
              </h2>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="text-[clamp(1.375rem,2.2vw,1.875rem)] leading-snug font-medium tracking-[-0.01em] text-balance">
                {whoWeAre}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead mt-10 text-concrete">{companyStory}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-10 border-l border-bronze pl-6 font-serif text-2xl leading-snug italic md:text-3xl">
                {positioning}
              </p>
            </Reveal>
            <ImageReveal
              image={images.planning}
              className="mt-16 aspect-[16/10]"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </div>
        </div>
      </section>

      <div className="bg-paper-deep">
        <FounderSection id="founder" index="02" showLink={false} />
      </div>

      <ExperienceSection index="03" className="border-b border-ink/10" />

      {/* Vision & mission */}
      <section aria-label="Vision and mission" className="bg-ink text-white">
        <div className="container-x grid md:grid-cols-2">
          {[
            { label: 'Vision', text: vision },
            { label: 'Mission', text: mission },
          ].map((item, i) => (
            <Reveal
              key={item.label}
              delay={i * 0.1}
              className="border-white/15 py-20 md:py-28 md:odd:border-r md:odd:pr-12 md:even:pl-12 max-md:first:border-b"
            >
              <Eyebrow tone="light" index={pad(i + 4)}>
                {item.label}
              </Eyebrow>
              <h2 className="sr-only">{item.label}</h2>
              <p className="mt-8 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-snug font-medium tracking-[-0.015em] text-balance">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="section-y">
        <div className="container-x">
          <SectionHeading
            id="values-title"
            index="06"
            eyebrow="Values"
            title={
              <>
                What we stand on<Dot />
              </>
            }
          />
          <RevealGroup as="ol" className="mt-16 border-t border-ink/15 lg:mt-20">
            {values.map((value, i) => (
              <RevealItem
                as="li"
                key={value.title}
                className="group grid gap-3 border-b border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
              >
                <span className="font-serif text-2xl text-bronze-deep italic md:col-span-1">{pad(i + 1)}</span>
                <h3 className="display text-[clamp(1.75rem,3.4vw,3rem)] transition-transform duration-500 ease-premium group-hover:translate-x-2 md:col-span-6">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-concrete md:col-span-4 md:col-start-9">{value.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Network */}
      <section aria-labelledby="network-title" className="section-y bg-paper-deep">
        <div className="container-x">
          <SectionHeading
            id="network-title"
            index="07"
            eyebrow="Our network"
            title={
              <>
                A development ecosystem<Dot />
              </>
            }
            intro="Every opportunity draws on a network of landowners, builders, investors and professionals."
          />
          <Reveal className="mt-16">
            <PartnerNetwork />
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
