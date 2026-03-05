import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OutputLine } from '../../data/commands'
import type { RootState } from '../index'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TerminalEntry {
  id: string
  command: string       // what the user typed (empty string for auto-executed banner)
  output: OutputLine[]  // the terminal's response
  timestamp: number
}

interface TerminalState {
  history: TerminalEntry[]   // full session history (persists while on page)
  isOpen: boolean            // terminal visible or minimised
  isAnimating: boolean       // true while output is being typed
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: TerminalState = {
  history: [],
  isOpen: true,
  isAnimating: false,
}

const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    addHistoryEntry: (state, action: PayloadAction<TerminalEntry>) => {
      state.history.push(action.payload)
    },
    clearTerminal: (state) => {
      state.history = []
    },
    toggleTerminal: (state) => {
      state.isOpen = !state.isOpen
    },
    setAnimating: (state, action: PayloadAction<boolean>) => {
      state.isAnimating = action.payload
    },
  },
})

// ─── Actions ──────────────────────────────────────────────────────────────────

export const {
  addHistoryEntry,
  clearTerminal,
  toggleTerminal,
  setAnimating,
} = terminalSlice.actions

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectTerminalHistory  = (state: RootState) => state.terminal.history
export const selectIsAnimating       = (state: RootState) => state.terminal.isAnimating
export const selectIsOpen            = (state: RootState) => state.terminal.isOpen

export default terminalSlice.reducer
