import { motion } from 'framer-motion'
import { Icon } from '../../atoms/Icon/Icon'
import { CompanyLogo } from '../../atoms/CompanyLogo/CompanyLogo'
import type { ExperienceEntry } from '../../../data/experience'

interface ExperienceHeaderProps {
  entry: ExperienceEntry
  isOpen: boolean
  onToggle: () => void
}

export function ExperienceHeader({ entry, isOpen, onToggle }: ExperienceHeaderProps) {
  return (
    <div
      role="button"
      aria-expanded={isOpen}
      aria-controls={`experience-body-${entry.id}`}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle()
        }
      }}
      className="flex items-start gap-4 p-5 cursor-pointer hover:bg-bg-secondary/40 transition-colors rounded-t-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset"
    >
      <CompanyLogo name={entry.company} />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-text-primary leading-snug">
              {entry.role}
            </p>
            <p className="text-sm mt-0.5">
              <span className="text-accent-primary font-medium">{entry.company}</span>
              <span className="text-text-secondary"> · {entry.sector}</span>
            </p>
            <p className="text-xs text-text-secondary mt-1 leading-relaxed">
              {entry.period} · {entry.duration} · {entry.location}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            {entry.highlight && (
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                Current
              </span>
            )}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <Icon name="ChevronDown" size={18} className="text-text-secondary" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
