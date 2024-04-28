import { StateCreator } from 'zustand'

import { ApiAirdrop } from '@type/api'

type UserState = {
  airdrop?: ApiAirdrop
}

type UserActions = {
  setAirdrop: (data?: ApiAirdrop) => void
}

export type UserSlice = UserState & UserActions

const initialState: UserState = {
  airdrop: undefined
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  ...initialState,
  setAirdrop: (data) => set({ airdrop: data })
})
