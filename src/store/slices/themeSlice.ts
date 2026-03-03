import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

type Theme = 'dark' | 'light'

interface ThemeState {
  current: Theme
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('portfolio-theme')
  if (stored === 'dark' || stored === 'light') return stored
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'dark'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('dark', 'light')
  root.classList.add(theme)
  localStorage.setItem('portfolio-theme', theme)
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: (): ThemeState => {
    const current = getInitialTheme()
    applyTheme(current)
    return { current }
  },
  reducers: {
    toggleTheme(state) {
      state.current = state.current === 'dark' ? 'light' : 'dark'
      applyTheme(state.current)
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.current = action.payload
      applyTheme(state.current)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectTheme = (state: RootState) => state.theme.current
export default themeSlice.reducer
