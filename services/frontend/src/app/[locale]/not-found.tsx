'use client'

import { Anchor, Button, Flex, Group, Stack, Text, Title } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import styles from './root.module.css'

export default function NotFound() {
  const router = useRouter()
  const i18n = useTranslations('NotFound')

  const title = i18n('title')
  const text = i18n('text')

  const mainLink = i18n('links.main')
  const backLink = i18n('links.back')

  const goBack = () => router.back()

  return (
    <Flex align="center" justify="center" className={styles.not_found}>
      <Stack>
        <Title order={1}>{title}</Title>
        <Text>{text}</Text>
        <Group>
          <Anchor href="/">{mainLink}</Anchor>
          <Button variant="light" onClick={goBack}>{backLink}</Button>
        </Group>
      </Stack>
    </Flex>
  )
}
