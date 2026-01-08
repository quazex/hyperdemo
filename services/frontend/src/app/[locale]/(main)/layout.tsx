import { Stack } from '@mantine/core'
import { setRequestLocale } from 'next-intl/server'
import { JSX } from 'react'
import { MainHeader } from '@/views/main'
import { MainFooter } from '@/views/main'
import styles from './main.module.css'
import { TMainProps } from './types'

export default async function MainLayout(props: TMainProps): Promise<JSX.Element> {
  const params = await props.params

  if (params.locale) {
    setRequestLocale(params.locale)
  }

  return (
    <Stack gap={0}>
      <MainHeader
        classNames={{
          wrapper: styles.header_wrapper,
          content: styles.header_content,
        }}
      />
      <main className={styles.main}>
        {props.children}
      </main>
      <MainFooter
        classNames={{
          wrapper: styles.footer_wrapper,
          content: styles.footer_content,
        }}
      />
    </Stack>
  )
}
