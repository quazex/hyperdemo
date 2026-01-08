import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './global.css'

import { Nunito_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { JSX, PropsWithChildren } from 'react'
import { routing } from '@/i18n/routing'
import { ThemeProvider } from './theme'
import { TRootProps } from './types'
import type { Viewport } from 'next'

/**
 * Базовые настройки адаптивного дизайна
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

/**
 * Настройки шрифтов
 */
export const FontNunitoSans = Nunito_Sans({
  weight: ['400', '600', '700'],
  subsets: ['cyrillic'],
  display: 'swap',
})

/**
 * Функция для генерации статической страницы
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Формирует Metadata всего сайта с учетом текущей локали
 */
export async function generateMetadata(props: TRootProps) {
  const { locale } = await props.params

  const i18n = await getTranslations({
    locale: locale as Locale,
    namespace: 'Metadata',
  })

  return {
    title: i18n('title'),
  }
}

/**
 * Корневой компонент разметки.
 * Отвечает за:
 * - Обработку локали;
 * - Корневых HTML компонентов;
 * - Библиотеку UI;
 * - Шрифты сайта.
 */
export default async function RootLayout(props: PropsWithChildren<TRootProps>): Promise<JSX.Element> {
  const { locale } = await props.params

  const isLocaleExists = hasLocale(routing.locales, locale)
  if (!isLocaleExists) {
    notFound()
  }

  if (locale) {
    setRequestLocale(locale)
  }

  return (
    <html className={FontNunitoSans.className}>
      <body>
        <NextIntlClientProvider>
          <NuqsAdapter>
            <ThemeProvider>
              {props.children}
            </ThemeProvider>
          </NuqsAdapter>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
