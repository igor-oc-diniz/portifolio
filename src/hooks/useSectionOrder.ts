import { useMemo } from 'react'
import { useAppSelector } from '../store/hooks'
import { selectIsRecruiterActive, type SectionId } from '../store/slices/recruiterSlice'

// ─── Orders ───────────────────────────────────────────────────────────────────

const DEFAULT_ORDER: SectionId[] = [
  'hero', 'about', 'skills', 'experience', 'terminal', 'contact',
]

const RECRUITER_ORDER: SectionId[] = [
  'hero', 'experience', 'skills', 'about', 'contact', 'terminal',
]

// ─── useSectionOrder ──────────────────────────────────────────────────────────
// Returns the ordered list of section IDs for the active mode.
// Memoized — only recalculates when the recruiter mode flag changes.

export function useSectionOrder(): SectionId[] {
  const isActive = useAppSelector(selectIsRecruiterActive)
  return useMemo(() => (isActive ? RECRUITER_ORDER : DEFAULT_ORDER), [isActive])
}
