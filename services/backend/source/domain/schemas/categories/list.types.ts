import { TPaginationRes } from '@domain/restapi'
import { TCategoriesDataSchema } from './data.types'

export type TCategoriesListSchema = TPaginationRes<TCategoriesDataSchema>
