import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import type { NextRequest } from 'next/server'

/**
 * Список приватных префиксов для URL
 */
export const PrivateRoutes: string[] = [
  'profile',
]

/**
 * Proxy для управления локализацией
 */
export const intlProxy = createMiddleware(routing)

/**
 * Универсальный Middleware для запросов из конфига
 */
export default function proxy(req: NextRequest): NextResponse {
  const url = new URL(req.url)

  const isPrivate = PrivateRoutes.some((route) => req.nextUrl.pathname.includes(route))
  const refreshToken = req.cookies.get('refresh_token')

  if (isPrivate && !refreshToken) {
    const locale = url.pathname.split('/').at(1) ?? routing.defaultLocale
    const loginURL = new URL(`/${locale}/login`, req.url)

    return NextResponse.redirect(loginURL)
  }

  return intlProxy(req)
}

export const config = {
  matcher: [
    '/',
    '/(ru|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
