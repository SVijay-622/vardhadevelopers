import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'
import { ScrollToTop } from '../components/ScrollToTop'
import { ease } from '../lib/motion'
import { NavToneProvider } from '../lib/NavToneProvider'

/** Scrolls to the element named in the URL hash, or to the top of the page. */
function scrollToLocation({ fallbackToTop }: { fallbackToTop: boolean }) {
  const id = decodeURIComponent(window.location.hash.slice(1))
  const target = id ? document.getElementById(id) : null
  if (target) target.scrollIntoView()
  else if (fallbackToTop) window.scrollTo(0, 0)
}

/** Mounts with each incoming page: jumps to its URL hash target, or the top. */
function ScrollOnEnter() {
  useLayoutEffect(() => scrollToLocation({ fallbackToTop: true }), [])
  return null
}

/** Holds on to the outlet it first rendered, so an exiting page keeps its content while fading out. */
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

export function RootLayout() {
  const location = useLocation()

  // Same-page hash links (e.g. /about#founder while on /about).
  useEffect(() => {
    if (location.hash) scrollToLocation({ fallbackToTop: false })
  }, [location.hash])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  return (
    <NavToneProvider>
      <a
        href="#main"
        className="eyebrow fixed top-3 left-3 z-[60] -translate-y-20 bg-ink px-4 py-3 text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          id="main"
          tabIndex={-1}
          data-menu-inert
          className="outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, ease } }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease } }}
        >
          <FrozenOutlet />
          <ScrollOnEnter />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ScrollToTop />
    </NavToneProvider>
  )
}
