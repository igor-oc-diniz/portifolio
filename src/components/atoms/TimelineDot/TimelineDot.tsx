import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'

interface TimelineDotProps {
  active?: boolean
  highlight?: boolean
}

export function TimelineDot({ active = false, highlight = false }: TimelineDotProps) {
  return (
    <div className="relative flex items-center justify-center shrink-0">
      {highlight && (
        <span
          className="absolute rounded-full bg-accent-primary opacity-30 animate-ping"
          style={{ width: 24, height: 24 }}
          aria-hidden="true"
        />
      )}
      <motion.div
        animate={{
          width: active ? 20 : 16,
          height: active ? 20 : 16,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          'rounded-full border-2 relative z-10 transition-colors duration-200',
          active
            ? 'bg-accent-primary border-accent-primary'
            : 'bg-bg-elevated border-border'
        )}
      />
    </div>
  )
}
