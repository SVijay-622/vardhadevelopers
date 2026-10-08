import { partnerPrograms } from '../../data/partners'
import { Button } from '../Button'
import { PartnerCard } from '../PartnerCard'
import { PartnerNetwork } from '../PartnerNetwork'
import { Reveal, RevealGroup, RevealItem } from '../Reveal'
import { Dot, SectionHeading } from '../SectionHeading'

export function PartnershipsSection({ index }: { index?: string }) {
  return (
    <section aria-labelledby="partnerships-title" className="section-y overflow-hidden">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionHeading
            id="partnerships-title"
            index={index}
            eyebrow="Partnerships"
            title={
              <>
                Built on
                <br />
                partnerships<Dot />
              </>
            }
            className="lg:col-span-6"
          />
          <Reveal className="flex flex-col justify-end gap-8 lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="lead text-concrete">
              Vardha works across a network of landowners, builders, investors and professionals — bringing the right
              people together around each opportunity.
            </p>
            <Button to="/partnerships" variant="primary" className="self-start">
              Become a Partner
            </Button>
          </Reveal>
        </div>

        <Reveal className="mt-16 lg:mt-20">
          <PartnerNetwork />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {partnerPrograms.map((program) => (
            <RevealItem key={program.slug} className="flex">
              <PartnerCard program={program} className="w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
