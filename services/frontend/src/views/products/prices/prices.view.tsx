'use client'

import { Stack, Text } from '@mantine/core'
import { useFormatter } from 'next-intl'
import { useQueryStates } from 'nuqs'
import { FC } from 'react'
import { SearchSchema } from '@/core/url'
import { NumberUtilities, PercentUtilities } from '@/core/utilities'
import styles from './prices.module.css'
import { TProductsPrices } from './prices.types'

export const PricesView: FC<TProductsPrices> = (props) => {
  const formatter = useFormatter()
  const [query] = useQueryStates(SearchSchema)

  const sale = PercentUtilities.encode(props.discount)
  const price = NumberUtilities.float(props.price / (1 - sale), 2)

  const discountPrice = formatter.number(props.price, {
    style: 'currency',
    currency: query.currency,
  })
  const originalPrice = formatter.number(price, {
    style: 'currency',
    currency: query.currency,
  })

  return (
    <Stack gap={0}>
      <Text size="lg" className={styles.price_original}>{discountPrice}</Text>
      <Text size="sm" className={styles.price_discount}>{originalPrice}</Text>
    </Stack>
  )
}
