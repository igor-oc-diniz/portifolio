import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import { updateMetrics } from '../store/slices/performanceSlice'

// ─── usePerformanceMetrics ────────────────────────────────────────────────────
// Collects real runtime performance metrics and pushes them to the Redux store.
// Runs once on mount.  Cleaned up on unmount.
//
// Metrics collected:
//   - fps       via requestAnimationFrame (average over last 60 frames, 1-s updates)
//   - fcp       via PerformanceObserver  'paint'
//   - lcp       via PerformanceObserver  'largest-contentful-paint'
//   - cls       via PerformanceObserver  'layout-shift'
//   - loadTime  via performance.timing

export function usePerformanceMetrics(): void {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // ── Load time ──────────────────────────────────────────────────────────

    const collectLoadTime = () => {
      const t = window.performance?.timing
      if (t && t.loadEventEnd > 0) {
        dispatch(updateMetrics({ loadTime: t.loadEventEnd - t.navigationStart }))
      } else {
        const onLoad = () => {
          setTimeout(() => {
            const t2 = window.performance?.timing
            if (t2) dispatch(updateMetrics({ loadTime: t2.loadEventEnd - t2.navigationStart }))
          }, 0)
        }
        window.addEventListener('load', onLoad, { once: true })
      }
    }
    collectLoadTime()

    // ── PerformanceObserver metrics ────────────────────────────────────────

    const observers: PerformanceObserver[] = []

    if (typeof PerformanceObserver !== 'undefined') {
      // FCP
      try {
        const fcpObs = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              dispatch(updateMetrics({ fcp: Math.round(entry.startTime) }))
            }
          }
        })
        fcpObs.observe({ type: 'paint', buffered: true })
        observers.push(fcpObs)
      } catch {
        // browser doesn't support this entry type
      }

      // LCP
      try {
        const lcpObs = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const last = entries[entries.length - 1]
          if (last) dispatch(updateMetrics({ lcp: Math.round(last.startTime) }))
        })
        lcpObs.observe({ type: 'largest-contentful-paint', buffered: true })
        observers.push(lcpObs)
      } catch {
        // not supported
      }

      // CLS
      try {
        let clsTotal = 0
        const clsObs = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const ls = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
            if (!ls.hadRecentInput) clsTotal += ls.value
          }
          dispatch(updateMetrics({ cls: Math.round(clsTotal * 1000) / 1000 }))
        })
        clsObs.observe({ type: 'layout-shift', buffered: true })
        observers.push(clsObs)
      } catch {
        // not supported
      }
    }

    // ── FPS via requestAnimationFrame ──────────────────────────────────────

    const frameTimes: number[] = []
    let lastDispatch = 0
    let rafId: number

    const measureFPS = (timestamp: number) => {
      frameTimes.push(timestamp)
      if (frameTimes.length > 60) frameTimes.shift()

      if (timestamp - lastDispatch >= 1000 && frameTimes.length > 1) {
        const elapsed = frameTimes[frameTimes.length - 1] - frameTimes[0]
        const fps     = Math.round(((frameTimes.length - 1) / elapsed) * 1000)
        dispatch(updateMetrics({ fps }))
        lastDispatch = timestamp
      }

      rafId = requestAnimationFrame(measureFPS)
    }

    rafId = requestAnimationFrame(measureFPS)

    // ── Cleanup ────────────────────────────────────────────────────────────

    return () => {
      cancelAnimationFrame(rafId)
      observers.forEach((obs) => obs.disconnect())
    }
  }, [dispatch])
}
