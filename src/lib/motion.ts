import type { Transition, Variants } from 'framer-motion'

/** Signature easing: fast start, long soft settle. */
export const ease = [0.22, 1, 0.36, 1] as const

export const transition: Transition = { duration: 0.8, ease }

export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition },
}

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})
