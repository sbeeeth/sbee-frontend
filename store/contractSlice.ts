import { StateCreator } from 'zustand'

type ContractState = {
  chainId: number
}

type ContractActions = {
  setChainId: (chainId: number) => void
}

export type ContractSlice = ContractState & ContractActions

const initialState: ContractState = {
  chainId: 238
}

export const createContractSlice: StateCreator<ContractSlice> = (set) => ({
  ...initialState,
  setChainId: (chainId: number) => set({ chainId })
})
