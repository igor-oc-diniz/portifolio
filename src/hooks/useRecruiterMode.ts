import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  activateRecruiterMode,
  deactivateRecruiterMode,
  toggleRecruiterMode,
  selectIsRecruiterActive,
} from '../store/slices/recruiterSlice'
import { setActiveExperience } from '../store/slices/experienceSlice'

// ─── Constants ────────────────────────────────────────────────────────────────

/** ID of the most recent experience entry — expanded automatically on activation. */
const MOST_RECENT_EXP_ID = 'cit-senior'

// ─── useRecruiterMode ─────────────────────────────────────────────────────────
// Provides activate / deactivate / toggle helpers with all side-effects wired in.
//
// Side-effects on activate:
//   1. Smooth scroll to top
//   2. After 300 ms — dispatch activateRecruiterMode() + expand latest exp. card
//
// Side-effects on deactivate:
//   1. Immediately revert mode + collapse experience card
//   2. Smooth scroll to top

export function useRecruiterMode() {
  const dispatch = useAppDispatch()
  const isActive = useAppSelector(selectIsRecruiterActive)

  const activate = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      dispatch(activateRecruiterMode())
      dispatch(setActiveExperience(MOST_RECENT_EXP_ID))
    }, 300)
  }, [dispatch])

  const deactivate = useCallback(() => {
    dispatch(deactivateRecruiterMode())
    dispatch(setActiveExperience(null))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [dispatch])

  const toggle = useCallback(() => {
    if (isActive) {
      deactivate()
    } else {
      activate()
    }
  }, [isActive, activate, deactivate])

  // Exported also for use in terminal command (via store.dispatch)
  return { isActive, toggle, activate, deactivate }
}

// Re-export the raw action so commands.tsx can call it via store.dispatch
export { toggleRecruiterMode }
