import { motion } from 'framer-motion'
import { Icon } from '../../atoms/Icon/Icon'
import type { LucideIconName } from '../../atoms/Icon/Icon'
import { cn } from '../../../lib/utils'

export interface SocialLinkProps {
  href: string
  icon: LucideIconName
  label: string
  className?: string
}

export function SocialLink({ href, icon, label, className }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary',
        className
      )}
      whileHover={{ y: -2, opacity: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <Icon name={icon} size={18} />
      <span>{label}</span>
    </motion.a>
  )
}
