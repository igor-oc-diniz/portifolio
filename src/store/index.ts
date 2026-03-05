import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slices/themeSlice'
import uiReducer from './slices/uiSlice'
import menuReducer from './slices/menuSlice'
import experienceReducer from './slices/experienceSlice'
import terminalReducer from './slices/terminalSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    menu: menuReducer,
    experience: experienceReducer,
    terminal: terminalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
