import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { site } from '../config/site'

type SeoProps = {
  /** Page title; omitted on the homepage to use the default site title. */
  title?: string
  description?: string
  image?: string
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

/** Updates document title, description, Open Graph tags and canonical URL per page. */
export function Seo({ title, description = site.description, image }: SeoProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : site.defaultTitle
    const url = `${site.url.replace(/\/$/, '')}${pathname}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    if (image) {
      const isUnsplash = image.startsWith('https://images.unsplash.com/')
      setMeta('property', 'og:image', isUnsplash ? `${image}?auto=format&fit=crop&w=1200&h=630&q=75` : image)
    }
    setCanonical(url)
  }, [title, description, image, pathname])

  return null
}
