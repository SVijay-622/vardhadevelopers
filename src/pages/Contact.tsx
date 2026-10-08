import { MapPin } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { LightHeader } from '../components/LightHeader'
import { Reveal } from '../components/Reveal'
import { Dot } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { isPlaceholder, site } from '../config/site'
import { isEnquiryType } from '../lib/enquiry'

export default function Contact() {
  const [params] = useSearchParams()
  const requestedType = params.get('type')
  const initialType = isEnquiryType(requestedType) ? requestedType : undefined
  const { contact } = site

  const details = [
    {
      label: 'Office',
      value: (
        <address className="not-italic">
          {contact.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    },
    {
      label: 'Email',
      value: isPlaceholder(contact.email) ? contact.email : <a href={`mailto:${contact.email}`}>{contact.email}</a>,
    },
    {
      label: 'Phone',
      value: isPlaceholder(contact.phone) ? (
        contact.phone
      ) : (
        <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a>
      ),
    },
    { label: 'Hours', value: contact.hours },
  ]

  return (
    <>
      <Seo
        title="Contact"
        description="Start a conversation with Vardha Developers — landowner, partnership, project and general enquiries."
      />
      <LightHeader
        eyebrow="Contact"
        title={
          <>
            Start a
            <br />
            conversation<Dot />
          </>
        }
        intro="Whether you own land, are planning a development, or are looking for the right partner, we’d like to understand the opportunity."
      />

      <section aria-labelledby="form-title" className="section-y pt-16! lg:pt-24!">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <h2 id="form-title" className="display display-3">
              Tell us about
              <br />
              the opportunity<Dot />
            </h2>
            <dl className="mt-12 border-t border-ink/15">
              {details.map((d) => (
                <div key={d.label} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-ink/15 py-5">
                  <dt className="eyebrow pt-0.5 text-concrete">{d.label}</dt>
                  <dd className="text-sm leading-relaxed">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <ContactForm key={initialType ?? 'none'} initialType={initialType} />
          </Reveal>
        </div>
      </section>

      <section aria-label="Office location" className="container-x pb-24 lg:pb-36">
        <div
          role="img"
          aria-label="Map placeholder — office location to be added"
          className="pattern-grid relative flex aspect-[4/3] items-center justify-center border border-ink/10 bg-paper-deep md:aspect-[21/9]"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="flex size-12 items-center justify-center bg-ink text-bronze">
              <MapPin aria-hidden strokeWidth={1.5} className="size-5" />
            </span>
            <p className="eyebrow text-concrete">[Google Maps embed]</p>
            <p className="text-sm text-concrete">{contact.addressLines[0]}</p>
          </div>
        </div>
      </section>
    </>
  )
}
