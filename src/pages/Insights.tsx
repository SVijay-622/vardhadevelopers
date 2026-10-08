import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { ArticleCard } from '../components/ArticleCard'
import { LightHeader } from '../components/LightHeader'
import { Reveal } from '../components/Reveal'
import { Dot } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { insightCategories, insights, type InsightCategory } from '../data/insights'
import { ease } from '../lib/motion'
import { cn } from '../lib/utils'

const isCategory = (value: string | null): value is InsightCategory =>
  value !== null && (insightCategories as readonly string[]).includes(value)

export default function Insights() {
  const [params, setParams] = useSearchParams()
  const requested = params.get('category')
  const category = isCategory(requested) ? requested : null

  const filtered = category ? insights.filter((i) => i.category === category) : insights
  const [lead, ...rest] = filtered

  const select = (value: InsightCategory | null) =>
    setParams(value ? { category: value } : {}, { replace: true, preventScrollReset: true })

  return (
    <>
      <Seo
        title="Insights"
        description="Vardha Insights — perspectives on real estate, construction and development."
      />
      <LightHeader
        eyebrow="Vardha Insights"
        title={
          <>
            Perspectives on
            <br />
            development<Dot />
          </>
        }
        intro="Real estate, construction and development — insights, project updates and industry knowledge."
      />

      <section aria-labelledby="articles-title" className="section-y pt-12! lg:pt-16!">
        <div className="container-x">
          <h2 id="articles-title" className="sr-only">
            Articles
          </h2>
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2 border-b border-ink/15 pb-6">
            {[null, ...insightCategories].map((c) => (
              <button
                key={c ?? 'all'}
                type="button"
                aria-pressed={category === c}
                onClick={() => select(c)}
                className={cn(
                  'h-10 border px-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
                  category === c ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink',
                )}
              >
                {c ?? 'All'}
              </button>
            ))}
          </div>

          {insights.some((i) => i.placeholder) && (
            <p className="mt-6 text-sm text-concrete">
              Articles marked “Sample article” indicate planned topics — full articles will be published here.
            </p>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={category ?? 'all'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
            >
              {lead ? (
                <>
                  <ArticleCard article={lead} variant="wide" className="mt-14" />
                  {rest.length > 0 && (
                    <div className="mt-20 grid gap-14 border-t border-ink/15 pt-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                      {rest.map((article, i) => (
                        <Reveal key={article.slug} delay={(i % 3) * 0.08}>
                          <ArticleCard article={article} />
                        </Reveal>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-20 text-center text-concrete">No articles in this category yet.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
