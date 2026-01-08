import { TParams } from '@/core/entities'

export interface TProductParams extends TParams {
  id: string
}

export interface TProductProps {
  params: Promise<TProductParams>
}
