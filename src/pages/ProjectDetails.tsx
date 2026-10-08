import { Info } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Arrow } from '../components/Button'
import { ImageReveal } from '../components/ImageReveal'
import { Img } from '../components/Img'
import { PageHero } from '../components/PageHero'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal, RevealGroup, RevealItem } from '../components/Reveal'
import { Eyebrow, SectionHeading } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { Tag } from '../components/Tag'
import { FinalCta } from '../components/sections/FinalCta'
import { getProject, getRelatedProjects, projects } from '../data/projects'
import { cn } from '../lib/utils'
import NotFound from './NotFound'

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const related = getRelatedProjects(project.slug)

  const details = [
    { label: 'Location', value: project.location },
    { label: 'Development Type', value: project.type },
    { label: 'Area', value: project.area },
    { label: 'Status', value: project.status },
    { label: 'Vardha’s Role', value: project.role },
  ]

  const story = [
    { title: 'The Opportunity', text: project.opportunity, image: project.gallery[0] },
    { title: 'The Approach', text: project.approach, image: project.gallery[1] },
    { title: 'The Execution', text: project.execution, image: project.gallery[2] },
  ]

  return (
    <>
      <Seo
        title={project.name}
        description={`${project.name} — ${project.type} in ${project.location}. A Vardha Developers project.`}
        image={project.cover.src}
      />
      <PageHero
        eyebrow={project.type}
        title={project.name}
        image={project.cover}
        crumbs={[{ label: 'Projects', to: '/projects' }, { label: project.name }]}
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-6">
          <p className="eyebrow text-white/70">{project.location}</p>
          <Tag tone="light">{project.status}</Tag>
          {project.placeholder && <Tag tone="placeholder">Placeholder</Tag>}
        </div>
      </PageHero>

      {project.placeholder && (
        <div className="border-b border-ink/10 bg-paper-deep">
          <p className="container-x flex items-center gap-3 py-4 text-sm text-concrete">
            <Info aria-hidden strokeWidth={1.5} className="size-4 shrink-0 text-bronze-deep" />
            Placeholder project — details and photography to be confirmed.
          </p>
        </div>
      )}

      {/* Overview + details */}
      <section aria-labelledby="overview-title" className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow index="01">Project overview</Eyebrow>
            <h2 id="overview-title" className="sr-only">
              Project overview
            </h2>
            <p className="mt-8 text-[clamp(1.375rem,2.4vw,2rem)] leading-snug font-medium tracking-[-0.015em]">
              {project.overview}
            </p>
          </Reveal>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <Eyebrow index="02">Project details</Eyebrow>
            <dl className="mt-8 border-t border-ink/15">
              {details.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-6 border-b border-ink/15 py-4">
                  <dt className="eyebrow text-concrete">{d.label}</dt>
                  <dd className="text-right text-sm font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Opportunity / Approach / Execution */}
      <section aria-label="Project story" className="pb-24 lg:pb-36">
        <div className="container-x space-y-24 lg:space-y-36">
          {story.map((chapter, i) => {
            const flipped = i % 2 === 1
            return (
              <article key={chapter.title} className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
                <ImageReveal
                  image={chapter.image}
                  className={cn('aspect-[16/11] lg:col-span-7', flipped && 'lg:order-2 lg:col-start-6')}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
                <Reveal className={cn('lg:col-span-4', flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9')}>
                  <p className="font-serif text-5xl leading-none text-bronze italic">{String(i + 3).padStart(2, '0')}</p>
                  <h2 className="display display-3 mt-6">{chapter.title}</h2>
                  <p className="mt-5 leading-relaxed text-concrete">{chapter.text}</p>
                </Reveal>
              </article>
            )
          })}
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="gallery-title" className="section-y bg-ink text-white">
        <div className="container-x">
          <SectionHeading id="gallery-title" index="06" eyebrow="Gallery" title="Gallery" tone="light" size="md" />
          <RevealGroup className="mt-12 grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-12">
            {[project.cover, ...project.gallery].slice(0, 5).map((image, i) => (
              <RevealItem
                key={`${image.src}-${i}`}
                className={cn(
                  'relative overflow-hidden bg-graphite',
                  i === 0 && 'col-span-2 aspect-[16/10] lg:col-span-8 lg:row-span-2 lg:aspect-auto',
                  i > 0 && 'aspect-square lg:col-span-4 lg:aspect-[4/3]',
                  i > 2 && 'lg:col-span-6 lg:aspect-[16/10]',
                )}
              >
                <Img
                  image={image}
                  sizes={i === 0 ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 50vw, 50vw'}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-premium hover:scale-[1.03]"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Next project */}
      <Link to={`/projects/${next.slug}`} className="group block border-b border-ink/10">
        <div className="container-x flex items-center justify-between gap-8 py-12 md:py-16">
          <div>
            <p className="eyebrow text-concrete">Next project</p>
            <p className="display display-2 mt-4 transition-transform duration-500 ease-premium group-hover:translate-x-2">
              {next.name}
            </p>
          </div>
          <Arrow className="size-8 md:size-12" />
        </div>
      </Link>

      {/* Related */}
      <section aria-labelledby="related-title" className="section-y">
        <div className="container-x">
          <SectionHeading id="related-title" index="07" eyebrow="Related projects" title="More projects" size="md" />
          <RevealGroup className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
            {related.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} aspect="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Discuss a project
            <span className="text-bronze">.</span>
          </>
        }
        text="Have land, a site or a development in mind? Let’s talk about what it could become."
        primary={{ label: 'Discuss a Project', to: '/contact?type=project' }}
        secondary={{ label: 'View All Projects', to: '/projects' }}
        image={project.gallery[3] ?? project.cover}
      />
    </>
  )
}
