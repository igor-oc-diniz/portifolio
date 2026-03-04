import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Icon } from '../../atoms/Icon/Icon'
import { SkillBadge } from '../../atoms/SkillBadge/SkillBadge'
import { cn } from '../../../lib/utils'
import type { SkillCategory } from '../../../data/skills'
import type { LucideIconName } from '../../atoms/Icon/Icon'

interface SkillGroupProps {
  category: SkillCategory
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
}

export function SkillGroup({ category, className }: SkillGroupProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'p-5 rounded-xl border border-border bg-bg-elevated/50 backdrop-blur-sm',
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon
          name={category.icon as LucideIconName}
          size={18}
          className="text-accent-primary"
        />
        <span className="font-semibold text-text-primary text-sm">{category.label}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <motion.div key={skill.name} variants={badgeVariants}>
            <SkillBadge name={skill.name} level={skill.level} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
