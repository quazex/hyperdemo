import { Group, Stack, Text } from '@mantine/core'
import { FC } from 'react'
import { TProductsFeaturesProps } from './features.types'

export const ProductsFeatures: FC<TProductsFeaturesProps> = (props) => (
  <Stack gap="xs">
    {props.features.map((f) => (
      <Group key={f.id} grow={true}>
        <Text size="sm" c="gray">{f.label}</Text>
        <Text size="sm" c="black">{f.value}</Text>
      </Group>
    ))}
  </Stack>
)
