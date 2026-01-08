'use client'

import { Anchor, Pagination } from '@mantine/core'
import { useQueryStates } from 'nuqs'
import { FC } from 'react'
import { SearchSchema, serialize } from '@/core/url'
import { TProductsPagination } from './pagination.types'

export const PaginationView: FC<TProductsPagination> = (props) => {
  const [params] = useQueryStates(SearchSchema)

  return (
    <Pagination
      size="xl"
      radius="50%"
      value={props.page}
      total={props.total}
      siblings={2}
      styles={{
        control: {
          fontSize: '1rem',
        },
      }}
      getItemProps={(page) => {
        if (props.page !== page) {
          const query = serialize({
            currency: params.currency,
            search: params.search,
            page,
          })
          return {
            component: Anchor,
            href: `${props.href}${query}`,
            prefetch: true,
          }
        }
        return {}
      }}
      getControlProps={(control) => {
        let page = 1

        if (control === 'last') {
          page = props.total
        }

        if (control === 'previous') {
          page = props.page - 1
        }

        if (control === 'next') {
          page = props.page + 1
        }

        if (page <= props.total && page >= 1) {
          const query = serialize({
            currency: params.currency,
            search: params.search,
            page,
          })
          return {
            component: Anchor,
            href: `${props.href}${query}`,
            prefetch: true,
          }
        }

        return {}
      }}
    />
  )
}
