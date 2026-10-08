import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease, fadeUp, stagger, viewport } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

/** Fades content up into place the first time it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

type GroupProps = { children: ReactNode; className?: string; gap?: number; as?: 'div' | 'ul' | 'ol' }

/** Staggers its RevealItem children as the group scrolls into view. */
export function RevealGroup({ children, className, gap = 0.08, as = 'div' }: GroupProps) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={stagger(gap)} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </Tag>
  )
}

export function RevealItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}
