import { site } from '../../config/site'
import { positioning, whoWeAre } from '../../data/content'
import { images } from '../../data/images'
import { Button } from '../Button'
import { ImageReveal } from '../ImageReveal'
import { Reveal } from '../Reveal'
import { Dot, Eyebrow } from '../SectionHeading'

export function WhoWeAre() {
  return (
    <section aria-labelledby="who-title" className="section-y bg-paper-deep">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-7">
          <ImageReveal
            image={images.siteTeam}
            className="aspect-[4/5] md:aspect-[5/4] lg:aspect-[4/5]"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          <div className="absolute -bottom-8 left-5 bg-ink px-6 py-5 text-white md:left-auto md:-right-6 md:px-8 md:py-6 lg:-right-10">
            <p className="display text-4xl md:text-5xl">
              {site.experience.replace('+', '')}
              <span className="text-bronze">+</span>
            </p>
            <p className="eyebrow mt-2 text-white/60">Years of experience</p>
          </div>
        </div>

        <div className="flex flex-col justify-center pt-8 lg:col-span-4 lg:col-start-9 lg:pt-0">
          <Reveal>
            <Eyebrow index="02">Who we are</Eyebrow>
            <h2 id="who-title" className="display display-3 mt-6 text-balance">
              More than a builder<Dot />
            </h2>
            <p className="lead mt-6 text-ink/80">{whoWeAre}</p>
            <p className="mt-6 border-l border-bronze pl-5 text-[0.95rem] leading-relaxed text-concrete">{positioning}</p>
            <Button to="/about" variant="text" className="mt-10">
              Discover Our Story
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
