import { motion } from 'framer-motion'
import { cn } from '../../../lib/utils'

// ─── PerformanceBar ───────────────────────────────────────────────────────────
// Horizontal progress bar for a 0–100 normalised score.
// Colour follows the Lighthouse / FPS thresholds.

interface PerformanceBarProps {
  value:        number           // normalised 0–100
  colorScheme?: 'score' | 'fps'
  animated?:    boolean
}

function barColor(value: number, scheme: 'score' | 'fps'): string {
  const n = Math.min(100, Math.max(0, value))
  if (scheme === 'fps') {
    if (n >= (55 / 60) * 100) return 'bg-green-400'
    if (n >= (30 / 60) * 100) return 'bg-yellow-400'
    return 'bg-red-400'
  }
  // Lighthouse score
  if (n >= 90) return 'bg-green-400'
  if (n >= 50) return 'bg-yellow-400'
  return 'bg-red-400'
}

export function PerformanceBar({
  value,
  colorScheme = 'score',
  animated    = true,
}: PerformanceBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        className={cn('h-full rounded-full origin-left', barColor(clamped, colorScheme))}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: clamped / 100 }}
        transition={animated ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
      />
    </div>
  )
}
