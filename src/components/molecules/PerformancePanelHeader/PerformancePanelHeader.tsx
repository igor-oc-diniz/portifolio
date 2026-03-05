import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { minimizePanel, restorePanel, selectIsPanelMinimized } from '../../../store/slices/performanceSlice'
import { selectMetrics } from '../../../store/slices/performanceSlice'
import { Icon } from '../../atoms/Icon/Icon'
import type { PerformanceMetrics } from '../../../store/slices/performanceSlice'

// ─── Status badge ─────────────────────────────────────────────────────────────

type Status = 'good' | 'warn' | 'bad'

function overallStatus(m: PerformanceMetrics): Status {
  const issues: Status[] = []
  if (m.fps !== null) {
    if (m.fps < 30)   issues.push('bad')
    else if (m.fps < 55) issues.push('warn')
  }
  if (m.fcp !== null) {
    if (m.fcp > 3000)      issues.push('bad')
    else if (m.fcp > 1800) issues.push('warn')
  }
  if (m.lcp !== null) {
    if (m.lcp > 4000)      issues.push('bad')
    else if (m.lcp > 2500) issues.push('warn')
  }
  if (issues.includes('bad'))  return 'bad'
  if (issues.includes('warn')) return 'warn'
  return 'good'
}

const STATUS_DOT: Record<Status, string> = {
  good: 'bg-green-400',
  warn: 'bg-yellow-400',
  bad:  'bg-red-400',
}

// ─── PerformancePanelHeader ───────────────────────────────────────────────────

export function PerformancePanelHeader() {
  const dispatch    = useAppDispatch()
  const isMinimized = useAppSelector(selectIsPanelMinimized)
  const metrics     = useAppSelector(selectMetrics)
  const status      = overallStatus(metrics)

  return (
    <div className="flex items-center justify-between px-4 py-3 cursor-default">
      <div className="flex items-center gap-2">
        <Icon name="Gauge" size={15} className="text-accent-primary" />
        <span className="text-sm font-semibold text-text-primary">Performance</span>
        <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[status]}`} />
      </div>

      <button
        onClick={() => dispatch(isMinimized ? restorePanel() : minimizePanel())}
        className="text-text-secondary hover:text-text-primary transition-colors p-0.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-primary"
        aria-label={isMinimized ? 'Expand performance panel' : 'Minimize performance panel'}
      >
        <Icon name={isMinimized ? 'ChevronUp' : 'ChevronDown'} size={15} />
      </button>
    </div>
  )
}
