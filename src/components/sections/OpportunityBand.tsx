import { images } from '../../data/images'
import { partnerPrograms } from '../../data/partners'
import { pad } from '../../lib/utils'
import { Button } from '../Button'
import { ImageReveal } from '../ImageReveal'
import { Reveal, RevealGroup, RevealItem } from '../Reveal'
import { Eyebrow } from '../SectionHeading'

const landowners = partnerPrograms.find((p) => p.slug === 'landowners')

/** Primary landowner conversion section. */
export function OpportunityBand() {
  return (
    <section aria-labelledby="opportunity-title" className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <ImageReveal image={images.earthworks} className="h-full bg-ink" imgClassName="opacity-55" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/80 to-ink/30" />

      <div className="container-x relative grid gap-14 py-28 lg:grid-cols-12 lg:py-44">
        <Reveal className="lg:col-span-7">
          <Eyebrow tone="light">Landowners & opportunities</Eyebrow>
          <h2 id="opportunity-title" className="display display-2 mt-6 text-balance">
            Have land or a development opportunity<span className="text-bronze">?</span>
          </h2>
          <p className="lead mt-8 max-w-lg text-white/75">
            If you own land or represent a development opportunity, let’s explore its potential.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/contact?type=landowner" variant="light">
              Submit Your Property
            </Button>
            <Button to="/contact" variant="outline-light">
              Talk to Us
            </Button>
          </div>
        </Reveal>

        {landowners && (
          <RevealGroup as="ul" className="self-end border-t border-white/15 lg:col-span-4 lg:col-start-9">
            {landowners.points.map((point, i) => (
              <RevealItem as="li" key={point.title} className="flex items-baseline gap-5 border-b border-white/15 py-5">
                <span className="eyebrow text-bronze">{pad(i + 1)}</span>
                <span className="text-lg font-medium">{point.title}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  )
}
