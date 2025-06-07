import { DateTime } from 'luxon';

export interface BrandsAnalyticsFilters {
    brand_id: string;
    date_from: DateTime;
    date_to: DateTime;
}
