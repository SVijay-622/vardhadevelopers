import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ImageAsset } from '../data/images'
import { ease, viewport } from '../lib/motion'
import { cn } from '../lib/utils'
import { Img } from './Img'

type ImageRevealProps = {
  image: ImageAsset
  /** Sizing classes for the frame, e.g. an aspect ratio. */
  className?: string
  imgClassName?: string
  sizes?: string
  parallax?: boolean
  priority?: boolean
}

/** Image that unmasks upward on first view and drifts gently with scroll. */
export function ImageReveal({
  image,
  className,
  imgClassName,
  sizes,
  parallax = true,
  priority = false,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const drift = parallax && !reduceMotion

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', !className?.includes('bg-') && 'bg-stone', className)}
      initial={{ clipPath: 'inset(14% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewport}
      transition={{ duration: 0.8, ease }}
    >
      <motion.div className={cn('absolute inset-x-0', drift ? '-inset-y-[6%]' : 'inset-y-0')} style={drift ? { y } : undefined}>
        <Img
          image={image}
          sizes={sizes}
          priority={priority}
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      </motion.div>
    </motion.div>
  )
}
