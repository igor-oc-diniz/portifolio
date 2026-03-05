import { AnimatePresence, motion } from 'framer-motion'
import { useAppSelector } from '../../../store/hooks'
import { selectIsRecruiterActive } from '../../../store/slices/recruiterSlice'
import { Icon } from '../Icon/Icon'

// ─── ModeIndicator ────────────────────────────────────────────────────────────
// Floating badge pinned to the top-centre of the viewport — visible only when
// Recruiter Mode is active.  Reads its own state from Redux.

export function ModeIndicator() {
  const isActive = useAppSelector(selectIsRecruiterActive)

  return (
    <div
      className="fixed top-[72px] left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="mode-indicator"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-primary/90 backdrop-blur-md text-white text-sm font-medium shadow-lg"
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <Icon name="Briefcase" size={13} />
            <span>Recruiter Mode</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
