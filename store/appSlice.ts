import { StateCreator } from 'zustand'

export interface AppSlice {
  isEntered: boolean
  setIsEntered: (entered: boolean) => void
}

const initialState = {
  isEntered: false
}

export const createAppSlice: StateCreator<AppSlice> = (set) => ({
  ...initialState,
  setIsEntered: (entered) => set({ isEntered: entered })
})
