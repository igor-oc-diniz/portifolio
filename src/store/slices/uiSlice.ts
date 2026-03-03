import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface Notification {
  message: string
  type: 'success' | 'error' | 'info'
}

interface UIState {
  isLoading: boolean
  error: string | null
  notification: Notification | null
}

const initialState: UIState = {
  isLoading: false,
  error: null,
  notification: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setNotification(state, action: PayloadAction<Notification>) {
      state.notification = action.payload
    },
    clearNotification(state) {
      state.notification = null
    },
  },
})

export const { setLoading, setError, setNotification, clearNotification } = uiSlice.actions

export const selectIsLoading = (state: RootState) => state.ui.isLoading
export const selectError = (state: RootState) => state.ui.error
export const selectNotification = (state: RootState) => state.ui.notification

export default uiSlice.reducer
