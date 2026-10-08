import { motion } from 'framer-motion'
import { approachSteps } from '../../data/content'
import { ease, viewport } from '../../lib/motion'
import { cn, pad } from '../../lib/utils'
import { Dot, SectionHeading } from '../SectionHeading'

type ApproachProcessProps = { index?: string; className?: string }

/** Five-stage process: horizontal line on desktop, vertical timeline on smaller screens. */
export function ApproachProcess({ index, className }: ApproachProcessProps) {
  return (
    <section aria-labelledby="approach-title" className={cn('section-y bg-paper-deep', className)}>
      <div className="container-x">
        <SectionHeading
          id="approach-title"
          index={index}
          eyebrow="Our approach"
          title={
            <>
              From opportunity
              <br />
              to handover<Dot />
            </>
          }
          intro="A structured path that gives every development clarity at each stage."
        />

        <motion.ol
          className="relative mt-16 lg:mt-24 lg:grid lg:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{ show: { transition: { staggerChildren: 0.14 } } }}
        >
          {/* Track lines — horizontal on desktop, vertical below */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-ink/12 lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          <motion.span
            aria-hidden
            className="absolute top-[7px] left-0 hidden h-px w-full origin-left bg-bronze lg:block"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.4, ease } } }}
          />
          <motion.span
            aria-hidden
            className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-bronze lg:hidden"
            variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.4, ease } } }}
          />

          {approachSteps.map((step, i) => (
            <motion.li
              key={step.title}
              className="group relative pb-12 pl-12 last:pb-0 lg:pr-8 lg:pb-0 lg:pl-0"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
              }}
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 flex size-[15px] items-center justify-center border border-bronze bg-paper-deep transition-colors duration-500 group-hover:bg-bronze"
              >
                <span className="size-[5px] bg-bronze transition-colors group-hover:bg-ink" />
              </span>

              <p className="font-serif text-6xl leading-none text-bronze italic lg:mt-14 lg:text-7xl">{pad(i + 1)}</p>
              <h3 className="display mt-4 text-2xl lg:mt-8 lg:text-[1.75rem]">{step.title}</h3>
              <p className="mt-3 max-w-[16rem] text-[0.95rem] leading-relaxed text-concrete">{step.text}</p>
              <span
                aria-hidden
                className="mt-6 hidden h-px w-10 origin-left scale-x-50 bg-ink/30 transition-transform duration-500 ease-premium group-hover:scale-x-100 lg:block"
              />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
