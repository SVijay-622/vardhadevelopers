import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { ImageReveal } from '../components/ImageReveal'
import { LightHeader } from '../components/LightHeader'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { Tag } from '../components/Tag'
import { FinalCta } from '../components/sections/FinalCta'
import { getInsight, insights } from '../data/insights'
import NotFound from './NotFound'

export default function InsightDetail() {
  const { slug } = useParams()
  const article = getInsight(slug)
  if (!article) return <NotFound />

  const related = insights.filter((i) => i.slug !== article.slug).slice(0, 3)

  return (
    <>
      <Seo title={article.title} description={`${article.title} — Vardha Insights.`} image={article.image.src} />
      <article>
        <LightHeader
          eyebrow={
            <>
              {article.category} <span className="mx-2 text-ink/30">/</span> {article.date}
            </>
          }
          title={<span className="display-2 block normal-case">{article.title}</span>}
        >
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/insights"
              className="eyebrow group inline-flex items-center gap-2 text-ink transition-opacity hover:opacity-70"
            >
              <ArrowLeft aria-hidden strokeWidth={1.5} className="size-4 transition-transform group-hover:-translate-x-1" />
              All insights
            </Link>
            {article.placeholder && (
              <Tag tone="dark" className="border-dashed border-bronze">
                Sample article
              </Tag>
            )}
          </div>
        </LightHeader>

        <div className="container-x py-14 md:py-20">
          <ImageReveal image={article.image} className="aspect-[16/9]" sizes="100vw" priority />
        </div>

        <div className="container-x pb-24 lg:pb-36">
          <Reveal className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-ink/85">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </article>

      <section aria-labelledby="related-title" className="section-y border-t border-ink/10 bg-paper-deep">
        <div className="container-x">
          <SectionHeading id="related-title" eyebrow="Continue reading" title="More insights" size="md" />
          <RevealGroup className="mt-12 grid gap-14 md:grid-cols-3 md:gap-8">
            {related.map((r) => (
              <RevealItem key={r.slug}>
                <ArticleCard article={r} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta />
    </>
  )
}
