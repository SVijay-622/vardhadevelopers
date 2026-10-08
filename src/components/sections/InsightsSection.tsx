import { featuredInsight, insightCategories, insights } from '../../data/insights'
import { ArticleCard } from '../ArticleCard'
import { Button } from '../Button'
import { Reveal } from '../Reveal'
import { Dot, SectionHeading } from '../SectionHeading'

export function InsightsSection({ index }: { index?: string }) {
  const secondary = insights.filter((i) => i.slug !== featuredInsight.slug).slice(0, 2)

  return (
    <section aria-labelledby="insights-title" className="section-y border-t border-ink/10 bg-paper-deep">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="insights-title"
            index={index}
            eyebrow="Vardha Insights"
            title={
              <>
                Perspectives on
                <br />
                development<Dot />
              </>
            }
          />
          <Button to="/insights" variant="text" className="self-start lg:self-auto">
            All Insights
          </Button>
        </div>

        <Reveal>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-y border-ink/10 py-5" aria-label="Insight categories">
            {insightCategories.map((category) => (
              <li key={category} className="eyebrow text-concrete">
                {category}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <ArticleCard article={featuredInsight} variant="featured" />
          </Reveal>
          <div className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
            {secondary.map((article, i) => (
              <Reveal key={article.slug} delay={0.1 * (i + 1)} className="border-t border-ink/10 pt-10 first:border-t-0 first:pt-0">
                <ArticleCard article={article} variant="compact" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
