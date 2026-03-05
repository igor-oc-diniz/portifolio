import { motion } from 'framer-motion'
import { Icon } from '../Icon/Icon'
import type { LucideIconName } from '../Icon/Icon'
import { cn } from '../../../lib/utils'

interface MetricChipProps {
  label: string
  value: string
  icon?: string
  className?: string
}

export function MetricChip({ label, value, icon, className }: MetricChipProps) {
  return (
    <motion.div
      className={cn(
        'flex flex-col gap-1 p-3 rounded-lg',
        'bg-accent-primary/10 border border-accent-primary/20',
        'hover:bg-accent-primary/20 transition-colors cursor-default',
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center gap-1.5">
        {icon && (
          <Icon
            name={icon as LucideIconName}
            size={14}
            className="text-accent-primary shrink-0"
          />
        )}
        <span className="font-bold text-accent-primary text-base leading-none">{value}</span>
      </div>
      <span className="text-text-secondary text-xs leading-snug">{label}</span>
    </motion.div>
  )
}
