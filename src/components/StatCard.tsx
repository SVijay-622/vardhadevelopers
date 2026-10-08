import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { Stat } from '../data/content'
import { cn, pad } from '../lib/utils'

/** Counts from zero to `value` once visible. The final value is always exposed to screen readers. */
export function CountUp({ value, padTo = 1 }: { value: number; padTo?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCurrent(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduceMotion, value])

  const shown = reduceMotion ? value : current

  return (
    <span ref={ref}>
      <span aria-hidden>{pad(shown, padTo)}</span>
      <span className="sr-only">{pad(value, padTo)}</span>
    </span>
  )
}

type StatCardProps = { stat: Stat; tone?: 'dark' | 'light'; className?: string }

export function StatCard({ stat, tone = 'dark', className }: StatCardProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <p className="display text-[clamp(2.5rem,4.4vw,4rem)] leading-none">
        {stat.value !== undefined ? (
          <CountUp value={stat.value} padTo={stat.pad} />
        ) : (
          <span className={tone === 'dark' ? 'text-ink/35' : 'text-white/40'}>{stat.display}</span>
        )}
        {stat.suffix && <span className="text-bronze">{stat.suffix}</span>}
      </p>
      <p className={cn('eyebrow', tone === 'dark' ? 'text-concrete' : 'text-white/60')}>{stat.label}</p>
    </div>
  )
}
