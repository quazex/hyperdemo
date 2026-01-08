import { AnchorProps } from '@mantine/core'
import { ReactNode } from 'react'

export interface TProductLink extends AnchorProps {
  children: ReactNode
  href: string
}
