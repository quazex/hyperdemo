'use client';

import { JSX, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { styles } from './styles.css';

export default function DashboardLayout(props: PropsWithChildren): JSX.Element {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <main className={styles.Main}>
                {props.children}
            </main>
            <footer>
                footer
            </footer>
        </QueryClientProvider>
    );
}
