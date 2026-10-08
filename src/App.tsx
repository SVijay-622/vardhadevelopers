import { MotionConfig } from 'framer-motion'
import type { ComponentType } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import RouteError from './pages/RouteError'

/** Code-splits a page module; the homepage stays in the main bundle for fastest first paint. */
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({ Component: (await load()).default })

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    // Shown only while the first lazily-loaded page chunk downloads.
    hydrateFallbackElement: <div className="min-h-svh bg-paper" />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'services', lazy: page(() => import('./pages/Services')) },
      { path: 'services/:slug', lazy: page(() => import('./pages/ServiceDetail')) },
      { path: 'projects', lazy: page(() => import('./pages/Projects')) },
      { path: 'projects/:slug', lazy: page(() => import('./pages/ProjectDetails')) },
      { path: 'partnerships', lazy: page(() => import('./pages/Partnerships')) },
      { path: 'partnerships/:slug', lazy: page(() => import('./pages/PartnershipDetail')) },
      { path: 'insights', lazy: page(() => import('./pages/Insights')) },
      { path: 'insights/:slug', lazy: page(() => import('./pages/InsightDetail')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: 'privacy', lazy: page(() => import('./pages/Privacy')) },
      { path: 'terms', lazy: page(() => import('./pages/Terms')) },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
