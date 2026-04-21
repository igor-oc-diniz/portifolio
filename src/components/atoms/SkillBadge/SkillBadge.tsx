import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '../../../lib/utils'

export interface SkillBadgeProps {
  name: string
  level?: 'expert' | 'advanced' | 'intermediate'
}

const levelClasses: Record<NonNullable<SkillBadgeProps['level']>, string> = {
  expert:       'bg-accent-primary/15 text-accent-primary border-accent-primary/30',
  advanced:     'bg-accent-aurora1/15 text-accent-aurora1 border-accent-aurora1/30',
  intermediate: 'bg-bg-elevated text-text-secondary border-border',
}

const reducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

export function SkillBadge({ name, level }: SkillBadgeProps) {
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 300, damping: 20 })
  const springY = useSpring(rotY, { stiffness: 300, damping: 20 })

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    rotY.set((dx / (rect.width / 2)) * 12)
    rotX.set((-dy / (rect.height / 2)) * 12)
  }

  const onLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border cursor-default',
        level ? levelClasses[level] : levelClasses.intermediate
      )}
      style={{
        transformPerspective: 600,
        rotateX: reducedMotion ? 0 : springX,
        rotateY: reducedMotion ? 0 : springY,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.15 }}
    >
      {name}
    </motion.span>
  )
}
