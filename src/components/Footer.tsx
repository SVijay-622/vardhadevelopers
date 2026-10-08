import { Link } from 'react-router-dom'
import { isPlaceholder, site } from '../config/site'
import { Arrow } from './Button'
import { Logo } from './Logo'
import { Dot } from './SectionHeading'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'What We Do', to: '/services' },
      { label: 'Projects', to: '/projects' },
      { label: 'Insights', to: '/insights' },
    ],
  },
  {
    title: 'Partners',
    links: [
      { label: 'Landowners', to: '/partnerships/landowners' },
      { label: 'Builders', to: '/partnerships/builders' },
      { label: 'Strategic Partners', to: '/partnerships/strategic-partners' },
      { label: 'Professional Network', to: '/partnerships/professional-network' },
    ],
  },
]

const year = new Date().getFullYear()

const linkClass = 'text-sm text-white/65 transition-colors duration-300 hover:text-white'

/** Renders a link only when a real URL exists; otherwise a clearly marked placeholder. */
function ExternalOrPlaceholder({ label, url }: { label: string; url: string }) {
  if (isPlaceholder(url)) {
    return (
      <span className="text-sm text-white/35">
        {label} <span className="text-xs">[URL]</span>
      </span>
    )
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" className={linkClass}>
      {label}
    </a>
  )
}

export function Footer() {
  const { email } = site.contact

  return (
    <footer className="bg-ink text-white" data-menu-inert>
      <div className="container-x">
        <div className="grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-12 lg:py-24">
          <div className="sm:col-span-2 lg:col-span-5">
            <Link to="/" aria-label={`${site.name} — home`} className="inline-block">
              <Logo />
            </Link>
            <p className="display mt-10 text-[clamp(1.5rem,2.4vw,2.25rem)]">
              Building opportunities<Dot />
              <br />
              <span className="text-white/45">
                Creating value<Dot />
              </span>
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              Real estate development, construction and strategic partnerships — built on {site.experience} years of
              experience.
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="lg:col-span-2">
              <h2 className="eyebrow text-bronze">{column.title}</h2>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="eyebrow text-bronze">Connect</h2>
            <ul className="mt-6 space-y-3">
              <li>
                <Link to="/contact" className={`group inline-flex items-center gap-2 ${linkClass}`}>
                  Contact <Arrow className="size-3.5" />
                </Link>
              </li>
              {site.socials.map((social) => (
                <li key={social.label}>
                  <ExternalOrPlaceholder label={social.label} url={social.url} />
                </li>
              ))}
              <li>
                {isPlaceholder(email) ? (
                  <span className="text-sm text-white/35">{email}</span>
                ) : (
                  <a href={`mailto:${email}`} className={linkClass}>
                    {email}
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All Rights Reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
