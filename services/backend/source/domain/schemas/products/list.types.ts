import { TPaginationRes } from '@domain/restapi'
import { TProductsDataSchema } from './data.types'

export type TProductsListSchema = TPaginationRes<TProductsDataSchema>
