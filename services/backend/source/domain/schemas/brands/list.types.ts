import { TPaginationRes } from '@domain/restapi'
import { TBrandsDataSchema } from './data.types'

export type TBrandsListSchema = TPaginationRes<TBrandsDataSchema>
