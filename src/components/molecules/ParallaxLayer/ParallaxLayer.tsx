import { motion } from 'framer-motion'
import { useParallax } from '../../../hooks/useParallax'
import { cn } from '../../../lib/utils'

interface ParallaxLayerProps {
  speed: number
  children: React.ReactNode
  className?: string
}

export function ParallaxLayer({ speed, children, className }: ParallaxLayerProps) {
  const { y } = useParallax(speed)

  return (
    <motion.div style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  )
}
