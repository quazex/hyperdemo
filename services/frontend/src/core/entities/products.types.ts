export interface TProductQuery {
  q?: string
  limit: number
  skip: number
}

export interface TProductsItem {
  id: number
  title: string
  description: string
  category: string
  brand: string
  price: number
  discountPercentage: number
  rating: number
  thumbnail: string
  images: string[]
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  returnPolicy: string
}

export interface TProductsList {
  products: TProductsItem[]
  total: number
  skip: number
  limit: number
}
