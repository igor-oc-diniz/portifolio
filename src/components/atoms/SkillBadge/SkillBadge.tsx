import { motion } from 'framer-motion'
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

export function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <motion.span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        level ? levelClasses[level] : levelClasses.intermediate
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.15 }}
    >
      {name}
    </motion.span>
  )
}
