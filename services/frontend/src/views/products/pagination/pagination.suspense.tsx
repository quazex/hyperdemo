import { FC, Suspense } from 'react'
import { TProductsPagination } from './pagination.types'
import { PaginationView } from './pagination.view'

export const ProductsPagination: FC<TProductsPagination> = (props) => (
  <Suspense fallback="...">
    <PaginationView {...props} />
  </Suspense>
)
