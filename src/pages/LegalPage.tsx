import { LightHeader } from '../components/LightHeader'
import { Dot } from '../components/SectionHeading'
import { Seo } from '../components/Seo'

type LegalPageProps = { title: string; placeholder: string }

/** Shared shell for legal documents awaiting final text from Vardha Developers. */
export function LegalPage({ title, placeholder }: LegalPageProps) {
  return (
    <>
      <Seo title={title} description={`${title} — Vardha Developers.`} />
      <LightHeader
        eyebrow="Legal"
        title={
          <>
            {title}
            <Dot />
          </>
        }
      />
      <section className="container-x py-20 lg:py-28">
        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-concrete">
          <p>{placeholder}</p>
        </div>
      </section>
    </>
  )
}
