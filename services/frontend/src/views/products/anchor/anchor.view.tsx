'use client'

import { Anchor } from '@mantine/core'
import { useQueryStates } from 'nuqs'
import { FC, Suspense } from 'react'
import { SearchSchema, serialize } from '@/core/url'
import { TProductLink } from './anchor.types'

export const AnchorCurrency: FC<TProductLink> = (props) => {
  const [queryState] = useQueryStates(SearchSchema)

  const searchParams = serialize({
    currency: queryState.currency,
  })

  const href = `${props.href}${searchParams}`
  return (
    <Anchor {...props} href={href} />
  )
}

export const ProductAnchor: FC<TProductLink> = (props) => (
  <Suspense fallback={<Anchor {...props} />}>
    <AnchorCurrency {...props} />
  </Suspense>
)
