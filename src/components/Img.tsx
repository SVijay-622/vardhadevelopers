import type { ImageAsset } from '../data/images'

const WIDTHS = [480, 768, 1080, 1440, 1920, 2400]

type ImgProps = {
  image: ImageAsset
  className?: string
  /** Rendered width hint for the browser, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
}

/** Responsive image. Unsplash sources get a generated srcset; other sources render as-is. */
export function Img({ image, className, sizes = '100vw', priority = false }: ImgProps) {
  const responsive = image.src.startsWith('https://images.unsplash.com/')
  const at = (w: number) => `${image.src}?auto=format&fit=crop&w=${w}&q=72`

  return (
    <img
      src={responsive ? at(1440) : image.src}
      srcSet={responsive ? WIDTHS.map((w) => `${at(w)} ${w}w`).join(', ') : undefined}
      sizes={responsive ? sizes : undefined}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  )
}
