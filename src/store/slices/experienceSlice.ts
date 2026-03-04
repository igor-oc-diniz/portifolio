import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface ExperienceState {
  activeId: string | null
}

const initialState: ExperienceState = {
  activeId: null,
}

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {
    setActiveExperience(state, action: PayloadAction<string | null>) {
      state.activeId = action.payload
    },
    toggleExperience(state, action: PayloadAction<string>) {
      state.activeId = state.activeId === action.payload ? null : action.payload
    },
  },
})

export const { setActiveExperience, toggleExperience } = experienceSlice.actions
export const selectActiveExperienceId = (state: RootState) => state.experience.activeId
export default experienceSlice.reducer
