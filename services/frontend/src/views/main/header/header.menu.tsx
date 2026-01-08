'use client'

import {
  ActionIcon,
  Anchor,
  Group,
  Menu,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconWorld } from '@tabler/icons-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useQueryStates } from 'nuqs'
import { FC } from 'react'
import { Currency, TParams } from '@/core/entities'
import { SearchSchema } from '@/core/url'

export const HeaderMenu: FC = () => {
  const params = useParams<TParams>()
  const pathname = usePathname()

  const [isVisible, handlers] = useDisclosure(false)
  const [queryState, setQueryState] = useQueryStates(SearchSchema)

  const onCurrencyChange = (value: string): void => {
    const currency = currencies.find((c) => c === value)
    if (currency) {
      setQueryState({ currency })
      handlers.close()
    }
  }

  const currencies = Object.values(Currency)

  const locales = [{
    icon: '🇺🇸',
    label: 'English',
    value: 'en',
  }, {
    icon: '🇷🇺',
    label: 'Русский',
    value: 'ru',
  }]

  return (
    <Menu
      position="bottom-end"
      opened={isVisible}
      onChange={handlers.toggle}
      onDismiss={handlers.close}
      keepMounted={true}
    >
      <Menu.Target>
        <ActionIcon>
          <IconWorld />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Stack gap={0}>
          <SegmentedControl
            data={currencies}
            value={queryState.currency}
            onChange={onCurrencyChange}
          />
          <Stack gap="xs" p="xs">
            {locales.map((locale) => {
              const href = pathname.split('/').map((s, idx) => idx === 1 ? locale.value : s).join('/')
              const isCurrent = locale.value === params.locale

              if (isCurrent) {
                return (
                  <Group key={locale.value} gap="xs">
                    <Text component="span">{locale.icon}</Text>
                    <Text>{locale.label}</Text>
                  </Group>
                )
              }

              return (
                <Anchor key={locale.value} href={href} component={Link} underline="never">
                  <Group gap="xs">
                    <Text component="span">{locale.icon}</Text>
                    <Text>{locale.label}</Text>
                  </Group>
                </Anchor>
              )
            })}
          </Stack>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  )
}
