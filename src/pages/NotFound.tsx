import { Button } from '../components/Button'
import { Eyebrow } from '../components/SectionHeading'
import { Seo } from '../components/Seo'
import { useLightNav } from '../lib/navTone'

export default function NotFound() {
  useLightNav()
  return (
    <>
      <Seo title="Page not found" />
      <section className="pattern-grid relative flex min-h-svh items-center">
        <div aria-hidden className="absolute inset-0 bg-linear-to-b from-paper/50 via-paper/85 to-paper" />
        <div className="container-x relative py-36">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="display display-1 mt-6">
            This page
            <br />
            isn’t built yet<span className="text-bronze">.</span>
          </h1>
          <p className="lead mt-8 max-w-md text-concrete">
            The page you’re looking for doesn’t exist or has moved.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/">Back to Home</Button>
            <Button to="/projects" variant="secondary">
              Explore Projects
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
