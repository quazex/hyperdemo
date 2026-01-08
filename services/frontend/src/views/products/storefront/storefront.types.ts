import { TProductsItem } from '@/core/entities'

export interface TProductsStorefront {
  locale: string
  items: TProductsItem[]
  href: string
}
