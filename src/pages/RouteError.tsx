import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

/** Last-resort error screen rendered outside the main layout. */
export default function RouteError() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404

  return (
    <main className="flex min-h-svh items-center bg-paper">
      <div className="container-x">
        <p className="eyebrow text-concrete">{notFound ? 'Error 404' : 'Something went wrong'}</p>
        <h1 className="display display-2 mt-6">
          {notFound ? 'Page not found' : 'We couldn’t load this page'}
          <span className="text-bronze">.</span>
        </h1>
        <a
          href="/"
          className="mt-10 inline-flex h-13 items-center bg-ink px-7 text-[0.75rem] font-semibold tracking-[0.18em] text-paper uppercase"
        >
          Back to Home
        </a>
      </div>
    </main>
  )
}
