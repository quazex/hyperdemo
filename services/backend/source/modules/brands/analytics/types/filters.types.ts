import { DateTime } from 'luxon'

export interface TBrandsAnalyticsFilters {
  brand_id: string
  date_from: DateTime
  date_to: DateTime
}
