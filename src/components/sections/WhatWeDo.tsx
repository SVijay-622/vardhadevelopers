import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { services } from '../../data/services'
import { ease } from '../../lib/motion'
import { Button } from '../Button'
import { Img } from '../Img'
import { RevealGroup, RevealItem } from '../Reveal'
import { ServiceCard } from '../ServiceCard'
import { Dot, SectionHeading } from '../SectionHeading'

/** Index of services with a sticky image panel that follows the hovered/focused row. */
export function WhatWeDo() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section aria-labelledby="services-title" className="section-y bg-ink text-white">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="services-title"
            index="03"
            eyebrow="What we do"
            tone="light"
            title={
              <>
                Four capabilities<Dot />
                <br />
                <span className="text-white/45">
                  One perspective<Dot />
                </span>
              </>
            }
          />
          <Button to="/services" variant="text-light" className="self-start lg:self-auto">
            All Services
          </Button>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <RevealGroup className="border-b border-white/12 lg:col-span-7">
            {services.map((service, i) => (
              <RevealItem key={service.slug}>
                <ServiceCard service={service} active={i === active} onActivate={() => setActive(i)} />
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <Img image={current.image} sizes="33vw" className="h-full w-full object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-5 flex items-center justify-between text-white/55">
                <p className="eyebrow">{current.title}</p>
                <p className="eyebrow text-bronze">
                  {current.number} / {String(services.length).padStart(2, '0')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

