import { AxiosInstance } from 'axios';
import { TProfileUser } from './profile';

export interface TOverallStore {
    requests: AxiosInstance;
    profile: TProfileUser;
}
