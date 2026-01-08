import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async (params) => {
  const requested = await params.requestLocale

  const isLocaleExisted = hasLocale(routing.locales, requested)
  const locale = isLocaleExisted ? requested : routing.defaultLocale

  const messages = await import(`../../locales/${locale}.json`)

  return {
    locale,
    messages: messages.default,
  }
})
