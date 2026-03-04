import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { SkillBadge } from '../../atoms/SkillBadge/SkillBadge'

interface ExperienceStackProps {
  stack: string[]
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
}

export function ExperienceStack({ stack }: ExperienceStackProps) {
  return (
    <div>
      <p className="text-xs text-text-secondary uppercase tracking-wider font-medium mb-3">
        Stack
      </p>
      <motion.div
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stack.map((tech) => (
          <motion.div key={tech} variants={itemVariants}>
            <SkillBadge name={tech} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
