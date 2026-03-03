import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'

export interface NavLinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
  className?: string
  onClick?: () => void
}

export function NavLink({ href, children, active = false, className, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors py-1',
        active ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary',
        className
      )}
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-accent-primary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0, width: '100%' }}
      />
    </a>
  )
}
