import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ease } from '../lib/motion'
import { useLightNav } from '../lib/navTone'
import { cn } from '../lib/utils'
import { Eyebrow } from './SectionHeading'

type LightHeaderProps = {
  eyebrow: ReactNode
  title: ReactNode
  intro?: ReactNode
  className?: string
  children?: ReactNode
}

/** Typographic page header for pages that open on the light background. */
export function LightHeader({ eyebrow, title, intro, className, children }: LightHeaderProps) {
  useLightNav()
  return (
    <header className={cn('pattern-grid relative border-b border-ink/10 pt-36 pb-16 md:pt-44 md:pb-20', className)}>
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-paper/40 via-paper/80 to-paper" />
      <motion.div
        className="container-x relative"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="display display-1 text-balance lg:col-span-8">{title}</h1>
          {intro && <p className="lead max-w-md text-concrete lg:col-span-4 lg:justify-self-end">{intro}</p>}
        </div>
        {children}
      </motion.div>
    </header>
  )
}
