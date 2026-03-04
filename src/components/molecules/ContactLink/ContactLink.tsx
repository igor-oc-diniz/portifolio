import { motion } from 'framer-motion'
import { Icon } from '../../atoms/Icon/Icon'
import { cn } from '../../../lib/utils'
import type { ContactLink as ContactLinkData } from '../../../data/contact'
import type { LucideIconName } from '../../atoms/Icon/Icon'

type ContactLinkProps = ContactLinkData & {
  className?: string
}

export function ContactLink({ icon, label, value, href, className }: ContactLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex flex-col items-center gap-3 p-6 rounded-xl',
        'border border-border bg-bg-elevated/50 backdrop-blur-sm',
        'hover:border-accent-primary/50 transition-colors duration-200',
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-3 rounded-full bg-accent-primary/10 text-accent-primary group-hover:bg-accent-primary/20 transition-colors">
        <Icon name={icon as LucideIconName} size={24} />
      </div>
      <div className="text-center">
        <div className="font-semibold text-text-primary text-sm">{label}</div>
        <div className="text-text-secondary text-xs mt-1">{value}</div>
      </div>
    </motion.a>
  )
}
