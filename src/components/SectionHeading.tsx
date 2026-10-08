import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Reveal } from './Reveal'

type EyebrowProps = { children: ReactNode; index?: string; tone?: 'dark' | 'light'; className?: string }

/** Small uppercase label preceded by a bronze rule, e.g. "— 02  What we do". */
export function Eyebrow({ children, index, tone = 'dark', className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'eyebrow flex items-center gap-3',
        tone === 'dark' ? 'text-concrete' : 'text-white/65',
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-bronze" />
      {index && <span className={tone === 'dark' ? 'text-bronze-deep' : 'text-bronze'}>{index}</span>}
      <span>{children}</span>
    </p>
  )
}

type SectionHeadingProps = {
  eyebrow: string
  index?: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'dark' | 'light'
  as?: 'h1' | 'h2'
  size?: 'lg' | 'md'
  className?: string
  id?: string
}

/** Eyebrow + display heading + optional intro, laid out as an editorial header. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  tone = 'dark',
  as: Heading = 'h2',
  size = 'lg',
  className,
  id,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-4xl', className)}>
      <Eyebrow index={index} tone={tone}>
        {eyebrow}
      </Eyebrow>
      <Heading id={id} className={cn('display mt-6 text-balance', size === 'lg' ? 'display-2' : 'display-3')}>
        {title}
      </Heading>
      {intro && (
        <p className={cn('lead mt-6 max-w-2xl', tone === 'dark' ? 'text-concrete' : 'text-white/70')}>{intro}</p>
      )}
    </Reveal>
  )
}

/** Bronze full stop used to punctuate display headings. */
export const Dot = () => <span className="text-bronze">.</span>
