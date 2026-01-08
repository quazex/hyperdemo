import { TBrandsShortSchema } from '../brands/short.types'
import { TCategoriesShortSchema } from '../categories/short.types'
import { TProductsImageSchema } from './images.types'

export interface TProductsDataSchema {
  product_id: string
  name: string
  description: string
  images: TProductsImageSchema[]
  brand: TBrandsShortSchema
  category: TCategoriesShortSchema
  price: number
  feedbacks: number
}
