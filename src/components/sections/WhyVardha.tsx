import { principles } from '../../data/content'
import { pad } from '../../lib/utils'
import { RevealGroup, RevealItem } from '../Reveal'
import { SectionHeading } from '../SectionHeading'

export function WhyVardha({ index }: { index?: string }) {
  return (
    <section aria-labelledby="why-title" className="section-y relative overflow-hidden bg-graphite text-white">
      <p
        aria-hidden
        className="display text-outline pointer-events-none absolute -top-[0.12em] right-0 text-[clamp(8rem,26vw,24rem)] leading-none text-white/15 select-none"
      >
        Why
      </p>

      <div className="container-x relative">
        <SectionHeading
          id="why-title"
          index={index}
          eyebrow="The difference"
          tone="light"
          title={
            <>
              Why Vardha<span className="text-bronze">?</span>
            </>
          }
          intro="Four principles that shape how every opportunity is evaluated, structured and delivered."
        />

        <RevealGroup className="mt-16 grid border-t border-white/15 md:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {principles.map((principle, i) => (
            <RevealItem
              key={principle.title}
              className="group relative border-b border-white/15 py-10 md:py-12 md:pr-8 md:even:border-l md:even:pl-8 lg:border-b-0 lg:border-l lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <span
                aria-hidden
                className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-premium group-hover:scale-x-100"
              />
              <p className="font-serif text-2xl text-bronze italic">{pad(i + 1)}</p>
              <h3 className="display mt-10 text-[clamp(1.75rem,2.6vw,2.5rem)] lg:mt-16">{principle.title}</h3>
              <p className="mt-5 max-w-xs leading-relaxed text-white/65">{principle.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
