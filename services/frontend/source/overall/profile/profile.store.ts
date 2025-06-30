import { useStore } from 'zustand';
import { overallState } from '../overall.store';
import { TProfileUser } from './profile.types';

export const useProfileStore = (): TProfileUser => {
    const profilesState = useStore(overallState, (state) => state.profile);
    return profilesState;
};
