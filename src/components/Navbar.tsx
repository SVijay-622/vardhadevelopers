import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { mainNav, site } from '../config/site'
import { ease } from '../lib/motion'
import { useIsLightPage } from '../lib/navTone'
import { cn, pad } from '../lib/utils'
import { Button } from './Button'
import { Logo } from './Logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)

  const lightHero = useIsLightPage()
  const transparent = !scrolled && !lightHero
  const onDark = open || transparent

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the menu whenever the route changes (adjusting state during render, not in an effect).
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    // Keep keyboard and screen-reader focus inside the menu while it is open.
    const background = document.querySelectorAll<HTMLElement>('[data-menu-inert]')
    background.forEach((el) => (el.inert = true))
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      background.forEach((el) => (el.inert = false))
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color,height] duration-500 ease-premium',
          'border-b',
          onDark ? 'text-white' : 'text-ink',
          open || transparent
            ? 'border-white/0 bg-transparent'
            : 'border-ink/10 bg-paper/92 backdrop-blur-md',
        )}
      >
        <div
          className={cn(
            'container-x flex items-center justify-between transition-[height] duration-500 ease-premium',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <Link to="/" aria-label={`${site.name} — home`} className="relative z-10">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-8">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative block py-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-opacity duration-300',
                        isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-indicator"
                            className="absolute inset-x-0 -bottom-0.5 h-px bg-bronze"
                            transition={{ duration: 0.5, ease }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Button to="/contact" variant={onDark ? 'outline-light' : 'secondary'} className="h-11! px-5!">
                Start a Conversation
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-10 -mr-2 flex size-11 items-center justify-center xl:hidden"
            >
              <span aria-hidden className="relative block h-3 w-7">
                <span
                  className={cn(
                    'absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-premium',
                    open ? 'top-1.5 rotate-45' : 'top-0',
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-px bg-current transition-all duration-500 ease-premium',
                    open ? 'top-1.5 w-full -rotate-45' : 'top-3 w-4/6',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu />}</AnimatePresence>
    </>
  )
}

function MobileMenu() {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => firstLinkRef.current?.focus(), [])

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink text-white xl:hidden"
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="container-x flex flex-1 flex-col pt-28 pb-10">
        <nav aria-label="Mobile">
          <motion.ul
            className="border-t border-white/10"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } } }}
          >
            {mainNav.map((item, i) => (
              <motion.li
                key={item.to}
                className="border-b border-white/10"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              >
                <NavLink
                  ref={i === 0 ? firstLinkRef : undefined}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-baseline gap-5 py-4 transition-colors',
                      isActive ? 'text-white' : 'text-white/60 hover:text-white',
                    )
                  }
                >
                  <span className="eyebrow text-bronze">{pad(i + 1)}</span>
                  <span className="display text-[clamp(1.75rem,7vw,3rem)]">{item.label}</span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        <motion.div
          className="mt-auto flex flex-col gap-8 pt-12 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.6 } }}
        >
          <div className="space-y-1 text-sm text-white/55">
            <p>{site.contact.email}</p>
            <p>{site.contact.phone}</p>
          </div>
          <Button to="/contact" variant="light">
            Start a Conversation
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
