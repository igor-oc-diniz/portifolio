import { useAppDispatch, useAppSelector } from '../store/hooks'
import { selectActiveExperienceId, toggleExperience } from '../store/slices/experienceSlice'

interface ExpandableResult {
  isOpen: boolean
  toggle: () => void
}

export function useExpandable(id: string): ExpandableResult {
  const dispatch = useAppDispatch()
  const activeId = useAppSelector(selectActiveExperienceId)

  return {
    isOpen: activeId === id,
    toggle: () => dispatch(toggleExperience(id)),
  }
}
