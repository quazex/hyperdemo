import { BackgroundImage, Flex, Paper } from '@mantine/core'
import { setRequestLocale } from 'next-intl/server'
import { JSX } from 'react'
import { TAuthProps } from './types'

export default async function AuthLayout(props: TAuthProps): Promise<JSX.Element> {
  const params = await props.params

  if (params.locale) {
    setRequestLocale(params.locale)
  }

  return (
    <BackgroundImage src="/bg.jpg">
      <Flex
        align="center"
        justify="center"
        mih="100vh"
      >
        <Paper maw={360} w="100%" p="md" radius="md" shadow="md">
          {props.children}
        </Paper>
      </Flex>
    </BackgroundImage>
  )
}
