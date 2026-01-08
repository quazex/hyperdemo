import { Group, Text, Title } from '@mantine/core'
import { FC } from 'react'
import { TProductsHeader } from './header.types'

export const ProductsHeader: FC<TProductsHeader> = (props) => (
  <Group align="end">
    <Title order={1}>{props.title}</Title>
    <Text mb={4} c="gray">{props.total}</Text>
  </Group>
)
