import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '../../config/site'
import { images } from '../../data/images'
import { ease } from '../../lib/motion'
import { Button } from '../Button'
import { Img } from '../Img'
import { Dot, Eyebrow } from '../SectionHeading'

const lines = [
  <>Building</>,
  <>
    Opportunities<Dot />
  </>,
  <>
    Creating value<Dot />
  </>,
]

export function HomeHero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex h-svh min-h-[640px] items-end overflow-hidden bg-ink text-white"
    >
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { y: imageY }}>
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Img image={images.heroCrane} priority className="h-full w-full object-cover object-[70%_center]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/55 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/80 to-transparent" />

      {/* Architectural column guides */}
      <div aria-hidden className="container-x pointer-events-none absolute inset-0 hidden md:block">
        <div className="grid h-full grid-cols-4 border-x border-white/[0.06]">
          <span className="border-r border-white/[0.06]" />
          <span className="border-r border-white/[0.06]" />
          <span className="border-r border-white/[0.06]" />
        </div>
      </div>

      <motion.div
        className="container-x relative w-full pb-24 md:pb-28"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Eyebrow tone="light">{site.experience} Years of Experience</Eyebrow>
        </motion.div>

        <h1 id="hero-title" className="display display-hero mt-7">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.4 + i * 0.1 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 grid gap-8 md:mt-12 lg:grid-cols-12 lg:items-end"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.8 }}
        >
          <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg lg:col-span-5">
            Real estate development, construction and strategic partnerships built around experience, execution and
            long-term value.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-7 lg:justify-end">
            <Button to="/projects" variant="light">
              Explore Projects
            </Button>
            <Button to="/partnerships" variant="outline-light">
              Partner With Us
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#experience"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-white/60 transition-colors hover:text-white md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 animate-scroll-line bg-white" />
        </span>
      </motion.a>
    </section>
  )
}
