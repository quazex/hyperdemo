import { AxiosInstance } from 'axios';
import { useStore } from 'zustand';
import { overallState } from '../overall.store';

export const useRequestsStore = (): AxiosInstance => {
    const requests = useStore(overallState, (state) => state.requests);
    return requests;
};
