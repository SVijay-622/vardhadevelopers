import { featuredProjects } from '../../data/projects'
import { cn } from '../../lib/utils'
import { Button } from '../Button'
import { ProjectCard } from '../ProjectCard'
import { Reveal } from '../Reveal'
import { Dot, SectionHeading } from '../SectionHeading'

/** Editorial, asymmetric composition for up to three featured projects. */
const layout = [
  { className: 'lg:col-span-7', aspect: 'aspect-[4/3]', sizes: '(min-width: 1024px) 55vw, 100vw' },
  { className: 'lg:col-span-4 lg:col-start-9 lg:mt-48', aspect: 'aspect-[4/5]', sizes: '(min-width: 1024px) 30vw, 100vw' },
  { className: 'lg:col-span-6 lg:col-start-2 lg:-mt-24', aspect: 'aspect-[16/10]', sizes: '(min-width: 1024px) 48vw, 100vw' },
]

export function SelectedProjects() {
  const projects = featuredProjects.slice(0, layout.length)

  return (
    <section aria-labelledby="projects-title" className="section-y">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="projects-title"
            index="04"
            eyebrow="Portfolio"
            title={
              <>
                Selected projects<Dot />
              </>
            }
            className="lg:col-span-7"
          />
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="lead text-concrete">Developments shaped by opportunity, strategy and execution.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-y-0">
          {projects.map((project, i) => (
            <Reveal key={project.slug} className={cn(layout[i].className, i === 2 && 'md:col-span-2 lg:col-span-6')}>
              <ProjectCard project={project} aspect={layout[i].aspect} sizes={layout[i].sizes} />
            </Reveal>
          ))}

          <Reveal className="flex flex-col justify-end gap-6 md:col-span-2 lg:col-span-3 lg:col-start-9 lg:pb-24">
            <p className="text-sm leading-relaxed text-concrete">
              Residential, mixed-use and development opportunities — each approached with the same discipline, from
              first evaluation to final handover.
            </p>
            <Button to="/projects" variant="secondary" className="self-start">
              View All Projects
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
