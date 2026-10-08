import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ease } from '../lib/motion'

/** Back-to-top control that appears once the visitor is well down the page. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollUp}
          aria-label="Back to top"
          data-menu-inert
          className="fixed right-5 bottom-5 z-30 flex size-12 items-center justify-center border border-ink/15 bg-paper/90 text-ink backdrop-blur transition-colors hover:bg-ink hover:text-paper md:right-8 md:bottom-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease }}
        >
          <ArrowUp aria-hidden strokeWidth={1.5} className="size-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
