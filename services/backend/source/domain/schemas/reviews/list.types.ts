import { TPaginationRes } from '@domain/restapi'
import { TReviewsDataSchema } from './data.types'

export type TReviewsListSchema = TPaginationRes<TReviewsDataSchema>
