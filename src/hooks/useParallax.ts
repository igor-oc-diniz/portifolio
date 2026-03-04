import { useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

interface ParallaxResult {
  y: MotionValue<number>
}

export function useParallax(speed: number): ParallaxResult {
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const { scrollY } = useScroll()

  // When reducedMotion is true, output range [0, 0] returns constant 0
  const y = useTransform(
    scrollY,
    [0, 1000],
    [0, reducedMotion ? 0 : speed * 300]
  )

  return { y }
}
