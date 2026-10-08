import { Link } from 'react-router-dom'
import type { Insight } from '../data/insights'
import { cn } from '../lib/utils'
import { Arrow } from './Button'
import { Img } from './Img'
import { Tag } from './Tag'

type Variant = 'featured' | 'wide' | 'compact' | 'standard'

type ArticleCardProps = {
  article: Insight
  /** featured: large stacked · wide: image beside text · compact: thumbnail row · standard: grid card */
  variant?: Variant
  className?: string
}

const layout: Record<Variant, { root: string; frame: string; body: string; title: string; sizes: string }> = {
  featured: {
    root: '',
    frame: 'aspect-[16/11]',
    body: 'mt-6',
    title: 'text-2xl md:text-[2.125rem] md:leading-tight',
    sizes: '(min-width: 1024px) 58vw, 100vw',
  },
  wide: {
    root: 'grid gap-8 lg:grid-cols-12 lg:items-center',
    frame: 'aspect-[16/10] lg:col-span-7',
    body: 'lg:col-span-4 lg:col-start-9',
    title: 'text-2xl md:text-[2.5rem] md:leading-[1.1]',
    sizes: '(min-width: 1024px) 58vw, 100vw',
  },
  compact: {
    root: 'grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-5 md:gap-6',
    frame: 'aspect-square',
    body: '',
    title: 'text-lg leading-snug md:text-xl',
    sizes: '(min-width: 1024px) 16vw, 40vw',
  },
  standard: {
    root: '',
    frame: 'aspect-[4/3]',
    body: 'mt-6',
    title: 'text-lg leading-snug md:text-xl',
    sizes: '(min-width: 768px) 33vw, 100vw',
  },
}

export function ArticleCard({ article, variant = 'standard', className }: ArticleCardProps) {
  const l = layout[variant]
  const compact = variant === 'compact'

  return (
    <article className={cn('group relative', l.root, className)}>
      <div className={cn('relative overflow-hidden bg-stone', l.frame)}>
        <Img
          image={article.image}
          sizes={l.sizes}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]"
        />
        {article.placeholder && !compact && (
          <Tag tone="placeholder" className="absolute top-4 left-4">
            Sample article
          </Tag>
        )}
      </div>

      <div className={cn('flex flex-col', l.body)}>
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-bronze-deep">
          {article.category}
          <span aria-hidden className="h-px w-4 bg-ink/20" />
          <span className="text-concrete">{article.date}</span>
        </p>
        <h3 className={cn('mt-3 font-medium tracking-[-0.015em] text-balance', l.title)}>
          <Link to={`/insights/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h3>
        {compact && article.placeholder && <p className="mt-2 text-xs text-concrete">Sample article</p>}
        <span className="eyebrow mt-5 inline-flex items-center gap-2 text-ink">
          Read Article <Arrow className="size-3.5" />
        </span>
      </div>
    </article>
  )
}
