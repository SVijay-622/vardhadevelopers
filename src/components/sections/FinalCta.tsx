import type { ReactNode } from 'react'
import { images, type ImageAsset } from '../../data/images'
import { Button } from '../Button'
import { ImageReveal } from '../ImageReveal'
import { Reveal } from '../Reveal'
import { Dot } from '../SectionHeading'

type Action = { label: string; to: string }

type FinalCtaProps = {
  title?: ReactNode
  text?: string
  primary?: Action
  secondary?: Action
  image?: ImageAsset
}

/** Closing call to action. Defaults match the homepage; inner pages override the copy. */
export function FinalCta({
  title = (
    <>
      Build something
      <br />
      worth building<Dot />
    </>
  ),
  text = 'Let’s explore the opportunity together.',
  primary = { label: 'Start a Conversation', to: '/contact' },
  secondary = { label: 'Explore Projects', to: '/projects' },
  image = images.darkFacade,
}: FinalCtaProps) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <ImageReveal image={image} className="h-full bg-ink" imgClassName="opacity-40" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/70 to-ink/40" />

      <Reveal className="container-x relative flex min-h-[78svh] flex-col justify-center py-28 lg:py-40">
        <h2 id="cta-title" className="display display-1 max-w-5xl">
          {title}
        </h2>
        <div className="mt-12 flex flex-col gap-10 border-t border-white/15 pt-10 md:flex-row md:items-center md:justify-between">
          <p className="lead max-w-md text-white/75">{text}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to={primary.to} variant="light">
              {primary.label}
            </Button>
            <Button to={secondary.to} variant="outline-light">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
