import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './global.css';

import { JSX, PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { resolver, theme } from '@theme';
import { Nunito_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: 'Hyperdemo - Аналитика продаж',
    description: 'Сервис аналитики продаж: находите тренды и увеличивайте продажи',
    keywords: 'товары в тренде, аналитика продаж, успешные ниши',
    robots: 'noindex',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

const FontNunitoSans = Nunito_Sans({
    weight: ['400', '600', '700'],
    subsets: ['cyrillic'],
    display: 'swap',
});

export default function RootLayout(props: PropsWithChildren): JSX.Element {
    return (
        <html lang="ru" className={FontNunitoSans.className}>
            <body>
                <MantineProvider
                    defaultColorScheme="light"
                    cssVariablesResolver={resolver}
                    theme={theme}
                >
                    {props.children}
                </MantineProvider>
            </body>
        </html>
    );
}
