import { cn } from '../lib/utils'

/** Wordmark: a V-in-square monogram with the stacked company name. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0">
        <rect x="0.75" y="0.75" width="30.5" height="30.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 9l7.5 14 7.5-14" fill="none" stroke="var(--color-bronze)" strokeWidth="1.75" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-[0.34em]">VARDHA</span>
        <span className="mt-1 text-[0.56rem] font-medium tracking-[0.47em] opacity-70">DEVELOPERS</span>
      </span>
    </span>
  )
}
