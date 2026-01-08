import { Stack } from '@mantine/core'
import axios from 'axios'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JSX } from 'react'
import type { TProductQuery, TProductsList, TProps } from '@/core/entities'
import { SearchUtilities } from '@/core/url'
import { routing } from '@/i18n/routing'
import {
  ProductsPagination,
  ProductsHeader,
  ProductsStorefront,
  TProductsPagination,
} from '@/views/products'

/**
 * Настройка регулярности повторной генерации страницы (в секундах)
 */
export const revalidate = 60

/**
 * Функция для генерации статической страницы
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

/**
 * Компонент главной страницы с витриной товаров
 */
export default async function MainPage(props: TProps): Promise<JSX.Element> {
  const params = await props.params
  const qs = await SearchUtilities.parse(props.searchParams)

  if (params.locale) {
    setRequestLocale(params.locale)
  }

  const pagination: TProductsPagination = {
    href: '/',
    page: 1,
    total: 0,
  }

  const query: TProductQuery = {
    q: qs.search ?? '',
    limit: 24,
    skip: 0,
  }

  if (qs.page > 1) {
    query.skip = query.limit * (qs.page - 1)
    pagination.page = qs.page
  }

  const productsList = await axios.request<TProductsList>({
    method: 'GET',
    baseURL: process.env.QUAZEX_PRIVATE_BACKEND_URL,
    url: 'products/search',
    timeout: 2_000,
    params: query,
  })

  if (productsList.data.total >= 0) {
    pagination.total = Math.ceil(productsList.data.total / query.limit)
  }

  const productsI18n = await getTranslations('Products')

  const title = productsI18n('title')
  const total = productsI18n('total', {
    count: productsList.data.total,
  })

  return (
    <Stack gap="xl">
      <ProductsHeader
        title={title}
        total={total}
      />

      <ProductsStorefront
        locale={params.locale}
        items={productsList.data.products}
        href="/product"
      />

      <ProductsPagination
        href={pagination.href}
        page={pagination.page}
        total={pagination.total}
      />
    </Stack>
  )
}
