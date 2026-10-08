import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { networkCategories, type NetworkCategory } from '../data/partners'
import { ease, viewport } from '../lib/motion'
import { cn } from '../lib/utils'

type PartnerNetworkProps = {
  categories?: NetworkCategory[]
  tone?: 'dark' | 'light'
  className?: string
}

/** Radius of the node ring, as a percentage of the frame's width / height. */
const RING = { x: 36, y: 40 }

/**
 * Development ecosystem: Vardha at the centre, partner categories on an orbit,
 * connected by hairlines. Hovering or focusing a category explains its role.
 */
export function PartnerNetwork({ categories = networkCategories, tone = 'dark', className }: PartnerNetworkProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [active, setActive] = useState<number | null>(null)
  const dark = tone === 'dark'

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) =>
      setSize({ w: entry.contentRect.width, h: entry.contentRect.height }),
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  const nodes = categories.map((category, i) => {
    const angle = ((-90 + (i * 360) / categories.length) * Math.PI) / 180
    return { ...category, x: 50 + RING.x * Math.cos(angle), y: 50 + RING.y * Math.sin(angle) }
  })
  const px = (x: number, y: number) => ({ x: (x / 100) * size.w, y: (y / 100) * size.h })
  const centre = px(50, 50)
  const activeNode = active === null ? null : nodes[active]

  const line = dark ? 'var(--color-ink)' : '#ffffff'

  return (
    <div className={className}>
      {/* Desktop / tablet: orbital diagram */}
      <div ref={frameRef} className="relative hidden aspect-[16/10] md:block">
        {size.w > 0 && (
          <motion.svg
            aria-hidden
            className="absolute inset-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${size.w} ${size.h}`}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            <ellipse
              cx={centre.x}
              cy={centre.y}
              rx={(RING.x / 100) * size.w}
              ry={(RING.y / 100) * size.h}
              fill="none"
              stroke={line}
              strokeOpacity={0.12}
              strokeDasharray="2 6"
            />
            {nodes.map((node, i) => {
              const p = px(node.x, node.y)
              const highlighted = active === i
              return (
                <motion.line
                  key={node.name}
                  x1={centre.x}
                  y1={centre.y}
                  x2={p.x}
                  y2={p.y}
                  stroke={highlighted ? 'var(--color-bronze)' : line}
                  strokeOpacity={highlighted ? 1 : 0.16}
                  strokeWidth={1}
                  variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.9, ease } } }}
                />
              )
            })}
          </motion.svg>
        )}

        <div
          className={cn(
            'absolute top-1/2 left-1/2 flex aspect-square w-[30%] max-w-64 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border p-6 text-center',
            dark ? 'border-ink/15 bg-paper' : 'border-white/15 bg-ink',
          )}
        >
          <div aria-hidden>
            {activeNode ? (
              <span className="flex flex-col items-center gap-3">
                <span className="eyebrow text-bronze">{activeNode.name}</span>
                <span className={cn('text-sm leading-snug', dark ? 'text-ink/80' : 'text-white/80')}>
                  {activeNode.role}
                </span>
              </span>
            ) : (
              <span className="flex flex-col items-center gap-2">
                <span className="text-base font-semibold tracking-[0.3em] lg:text-lg">VARDHA</span>
                <span className={cn('eyebrow', dark ? 'text-concrete' : 'text-white/55')}>Development ecosystem</span>
              </span>
            )}
          </div>
        </div>

        <ul>
          {nodes.map((node, i) => (
            <li key={node.name} className="absolute" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${node.name}: ${node.role}`}
                className="group absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 p-2"
              >
                <span
                  aria-hidden
                  className={cn(
                    'block size-2.5 rotate-45 border transition-colors duration-300',
                    active === i ? 'border-bronze bg-bronze' : dark ? 'border-ink/50 bg-paper' : 'border-white/60 bg-ink',
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    'eyebrow absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-colors duration-300',
                    node.y < 50 ? 'bottom-full mb-1' : 'top-full mt-1',
                    active === i ? 'text-bronze-deep' : dark ? 'text-ink' : 'text-white',
                    active === i && !dark && 'text-bronze',
                  )}
                >
                  {node.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: branching list */}
      <div className="md:hidden">
        <div className={cn('border px-6 py-5 text-center', dark ? 'border-ink/15' : 'border-white/15')}>
          <p className="text-base font-semibold tracking-[0.3em]">VARDHA</p>
          <p className={cn('eyebrow mt-2', dark ? 'text-concrete' : 'text-white/55')}>Development ecosystem</p>
        </div>
        <ul className={cn('relative ml-6 border-l', dark ? 'border-ink/15' : 'border-white/15')}>
          {categories.map((category) => (
            <li key={category.name} className="relative py-4 pl-10">
              <span aria-hidden className={cn('absolute top-7 left-0 h-px w-6', dark ? 'bg-ink/15' : 'bg-white/15')} />
              <span aria-hidden className="absolute top-7 left-6 size-2 -translate-y-1/2 rotate-45 bg-bronze" />
              <p className="eyebrow">{category.name}</p>
              <p className={cn('mt-1.5 text-sm leading-relaxed', dark ? 'text-concrete' : 'text-white/60')}>
                {category.role}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
