import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server'
import { Currency } from '../entities'

export const SearchSchema = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  currency: parseAsStringEnum(Object.values(Currency)).withDefault(Currency.USD),
}

export const serialize = createSerializer(SearchSchema)

export const SearchUtilities = createSearchParamsCache(SearchSchema)
