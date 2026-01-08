import { ReactNode } from 'react'
import { TParams } from '@/core/entities'

export interface TAuthProps {
  params: Promise<TParams>
  children: ReactNode
};
