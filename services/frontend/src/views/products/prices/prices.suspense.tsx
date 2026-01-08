import { FC, Suspense } from 'react'
import { TProductsPrices } from './prices.types'
import { PricesView } from './prices.view'

export const ProductsPrices: FC<TProductsPrices> = (props) => (
  <Suspense fallback="00.00">
    <PricesView {...props} />
  </Suspense>
)
