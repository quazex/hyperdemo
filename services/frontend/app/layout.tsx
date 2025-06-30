import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './global.css';

import { JSX, PropsWithChildren } from 'react';
import { MantineProvider } from '@mantine/core';
import { LocaleMessages, LocaleProvider } from '@overall/locale';
import { resolver, theme } from '@theme';
import { Nunito_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
    title: LocaleMessages.meta_title,
    description: LocaleMessages.meta_description,
    keywords: LocaleMessages.meta_keywords,
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
        <html className={FontNunitoSans.className}>
            <body>
                <LocaleProvider>
                    <MantineProvider
                        defaultColorScheme="light"
                        cssVariablesResolver={resolver}
                        theme={theme}
                    >
                        {props.children}
                    </MantineProvider>
                </LocaleProvider>
            </body>
        </html>
    );
}
