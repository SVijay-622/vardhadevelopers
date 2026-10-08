import { ArrowRight } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

type Variant = 'primary' | 'secondary' | 'light' | 'outline-light' | 'text' | 'text-light'

const base =
  'group inline-flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50'

const boxed = 'h-13 justify-center px-7'

const variants: Record<Variant, string> = {
  primary: cn(boxed, 'bg-ink text-paper hover:bg-graphite'),
  secondary: cn(boxed, 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper'),
  light: cn(boxed, 'bg-paper text-ink hover:bg-white'),
  'outline-light': cn(boxed, 'border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink'),
  text: 'border-b border-ink/25 pb-2 text-ink hover:border-ink',
  'text-light': 'border-b border-white/30 pb-2 text-white hover:border-white',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
  arrow?: boolean
}

type LinkProps = CommonProps & { to: string; href?: never }
type AnchorProps = CommonProps & { href: string; to?: never }
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { to?: never; href?: never }

export type ButtonProps = LinkProps | AnchorProps | NativeButtonProps

/** Arrow that slides right when its parent `.group` is hovered or focused. */
export function Arrow({ className }: { className?: string }) {
  return (
    <ArrowRight
      aria-hidden
      strokeWidth={1.5}
      className={cn(
        'size-4 shrink-0 transition-transform duration-300 ease-premium group-hover:translate-x-1 group-focus-visible:translate-x-1',
        className,
      )}
    />
  )
}

/** Renders a router Link, an anchor or a button depending on the props given. */
export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className, arrow = true } = props
  const classes = cn(base, variants[variant], className)
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  )

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    )
  }

  if (props.href !== undefined) {
    return (
      <a href={props.href} className={classes}>
        {content}
      </a>
    )
  }

  const { variant: _v, className: _c, arrow: _a, children: _ch, type = 'button', ...rest } = props
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
