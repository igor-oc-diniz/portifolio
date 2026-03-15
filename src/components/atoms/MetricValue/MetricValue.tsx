import { useState, useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { cn } from '../../../lib/utils'

// ─── MetricValue ──────────────────────────────────────────────────────────────
// Animated numeric display for a performance metric.
// Counts from the previous value to the new one using a Framer Motion spring.
// Shows "—" when value is null.

interface MetricValueProps {
  value: number | null
  unit?:  string    // e.g. "ms", "fps"
  good?:  number    // threshold: green if value ≤ good
  warn?:  number    // threshold: yellow if value ≤ warn, red above
}

function getColorClass(value: number, good?: number, warn?: number): string {
  if (good === undefined || warn === undefined) return 'text-text-primary'
  // For CLS and similar: lower is better (green if ≤ good)
  if (value <= good) return 'text-green-400'
  if (value <= warn) return 'text-yellow-400'
  return 'text-red-400'
}

function formatDisplay(val: number, unit?: string): string {
  if (unit === 'fps' || val >= 10) return Math.round(val).toString()
  if (val < 1)                     return val.toFixed(3)
  return val.toFixed(1)
}

export function MetricValue({ value, unit, good, warn }: MetricValueProps) {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)

  useEffect(() => {
    if (value === null) return
    const from = prevRef.current
    prevRef.current = value
    const controls = animate(from, value, {
      duration: 0.7,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    })
    return controls.stop
  }, [value])

  if (value === null) {
    return (
      <span className="font-mono text-base font-semibold text-text-secondary">—</span>
    )
  }

  const colorClass = getColorClass(value, good, warn)

  return (
    <span className={cn('font-mono text-base font-semibold leading-none', colorClass)}>
      {formatDisplay(display, unit)}
      {unit && (
        <span className="text-xs font-normal ml-0.5 text-text-secondary">{unit}</span>
      )}
    </span>
  )
}
