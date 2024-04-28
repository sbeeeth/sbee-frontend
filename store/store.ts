import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { mountStoreDevtool } from 'simple-zustand-devtools'

import { AppSlice, createAppSlice } from './appSlice'
import { ContractSlice, createContractSlice } from './contractSlice'
import { createUserSlice, UserSlice } from './userSlice'

type StoreState = AppSlice & UserSlice & ContractSlice

export const useStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createAppSlice(...a),
      ...createUserSlice(...a),
      ...createContractSlice(...a)
    }),
    {
      name: 'Sbee-App'
    }
  )
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
