import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface MenuState {
  isOpen: boolean
}

const initialState: MenuState = { isOpen: false }

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu(state) {
      state.isOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeMenu(state) {
      state.isOpen = false
      document.body.style.overflow = ''
    },
    toggleMenu(state) {
      state.isOpen = !state.isOpen
      document.body.style.overflow = state.isOpen ? 'hidden' : ''
    },
  },
})

export const { openMenu, closeMenu, toggleMenu } = menuSlice.actions
export const selectMenuIsOpen = (state: RootState) => state.menu.isOpen
export default menuSlice.reducer
