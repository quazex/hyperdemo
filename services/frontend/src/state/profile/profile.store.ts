import { useStore } from 'zustand'
import { TProfileUser } from '@/core/entities'
import { overallState } from '../global.store'

export const useProfileStore = (): TProfileUser | undefined => {
  const profilesState = useStore(overallState, (state) => state.profile)
  return profilesState
}
