import { AnimatePresence, motion } from 'framer-motion'
import { Icon } from '../../atoms/Icon/Icon'
import { useRecruiterMode } from '../../../hooks/useRecruiterMode'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { cn } from '../../../lib/utils'

// ─── RecruiterToggle ──────────────────────────────────────────────────────────
// Fixed floating button in the bottom-right corner.
// On desktop: icon + label.  On mobile: icon only (to avoid covering content).

export function RecruiterToggle() {
  const { isActive, toggle } = useRecruiterMode()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggle}
        aria-label={isActive ? 'Exit Recruiter Mode' : 'Activate Recruiter Mode'}
        aria-pressed={isActive}
        title={isActive ? 'Back to default view' : 'Activate recruiter view'}
        className={cn(
          'flex items-center gap-2 rounded-full shadow-lg font-medium text-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary',
          'transition-colors',
          isMobile ? 'p-3' : 'px-4 py-2.5',
          isActive
            ? 'bg-accent-primary text-white hover:bg-accent-primary/90'
            : 'bg-bg-elevated border border-border text-text-primary hover:border-accent-primary',
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Icon name={isActive ? 'BriefcaseBusiness' : 'Briefcase'} size={16} />

        {!isMobile && (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isActive ? 'exit' : 'enter'}
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.15 }}
              className="whitespace-nowrap"
            >
              {isActive ? 'Exit Mode' : 'Recruiter Mode'}
            </motion.span>
          </AnimatePresence>
        )}
      </motion.button>
    </div>
  )
}
