import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// ─── Types ────────────────────────────────────────────────────────────────────

export type SectionId =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'terminal'
  | 'contact'

interface RecruiterState {
  isActive:            boolean
  activatedAt:         number | null
  highlightedSections: SectionId[]
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: RecruiterState = {
  isActive:            false,
  activatedAt:         null,
  highlightedSections: [],
}

const recruiterSlice = createSlice({
  name: 'recruiter',
  initialState,
  reducers: {
    activateRecruiterMode(state) {
      state.isActive            = true
      state.activatedAt         = Date.now()
      state.highlightedSections = ['experience', 'skills', 'contact']
    },
    deactivateRecruiterMode(state) {
      state.isActive            = false
      state.activatedAt         = null
      state.highlightedSections = []
    },
    toggleRecruiterMode(state) {
      if (state.isActive) {
        state.isActive            = false
        state.activatedAt         = null
        state.highlightedSections = []
      } else {
        state.isActive            = true
        state.activatedAt         = Date.now()
        state.highlightedSections = ['experience', 'skills', 'contact']
      }
    },
  },
})

// ─── Actions ──────────────────────────────────────────────────────────────────

export const {
  activateRecruiterMode,
  deactivateRecruiterMode,
  toggleRecruiterMode,
} = recruiterSlice.actions

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectIsRecruiterActive    = (state: RootState) => state.recruiter.isActive
export const selectHighlightedSections  = (state: RootState) => state.recruiter.highlightedSections

export default recruiterSlice.reducer
