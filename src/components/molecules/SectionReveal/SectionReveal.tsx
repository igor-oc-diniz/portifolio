import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
}

const reducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

const variants: Variants = {
  hidden: {
    clipPath: 'inset(7% 3% 7% 3% round 20px)',
    opacity: 0.4,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0% round 0px)',
    opacity: 1,
  },
}

export function SectionReveal({ children }: SectionRevealProps) {
  if (reducedMotion) return <>{children}</>

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
