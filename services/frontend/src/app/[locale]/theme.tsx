'use client'

import { MantineProvider } from '@mantine/core'
import { FC, PropsWithChildren } from 'react'
import { resolver, theme } from '@/core/theme'

export const ThemeProvider: FC<PropsWithChildren> = (props) => (
  <MantineProvider
    defaultColorScheme="light"
    cssVariablesResolver={resolver}
    theme={theme}
  >
    {props.children}
  </MantineProvider>
)
