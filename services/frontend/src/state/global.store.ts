import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TOverallStore } from './global.types'

export const overallPersist = persist<TOverallStore>(() => ({
  profile: undefined,
}), {
  name: 'overall-storage',
})

export const overallState = create(overallPersist)
