import { cn } from '../lib/utils'

type MarqueeProps = { items: string[]; tone?: 'dark' | 'light'; className?: string }

/** Slow, continuous band of outlined words. Decorative — hidden from assistive tech. */
export function Marquee({ items, tone = 'dark', className }: MarqueeProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'group overflow-hidden border-y py-6 md:py-8',
        tone === 'dark' ? 'border-ink/10 text-ink/25' : 'border-white/10 text-white/25',
        className,
      )}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center">
                <span className="display text-outline px-6 text-[clamp(2.5rem,6vw,5.5rem)] md:px-10">{item}</span>
                <span className="size-2 rotate-45 bg-bronze" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
