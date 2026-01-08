import { ReactNode } from 'react'
import { TParams } from '@/core/entities'

export interface TMainProps {
  params: Promise<TParams>
  children: ReactNode
};
