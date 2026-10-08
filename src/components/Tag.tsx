import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

type TagProps = { children: ReactNode; tone?: 'dark' | 'light' | 'placeholder'; className?: string }

/** Small bordered label for statuses and placeholder markers. */
export function Tag({ children, tone = 'dark', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center border px-3 text-[0.625rem] font-semibold uppercase tracking-[0.2em]',
        tone === 'dark' && 'border-ink/20 text-ink',
        tone === 'light' && 'border-white/40 text-white backdrop-blur-sm',
        tone === 'placeholder' && 'border-dashed border-bronze/70 bg-ink/40 text-white backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </span>
  )
}
