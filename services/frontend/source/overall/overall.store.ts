import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TOverallStore } from './overall.types';

export const overallPersist = persist<TOverallStore>(() => ({
    requests: axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TESTING_TOKEN}`,
        },
    }),
    profile: {
        avatar: '/avatars/29.jpg',
        name: 'Вика Хохлома',
    },
}), {
    name: 'overall-storage',
});

export const overallState = create(overallPersist);
