import { DateTime } from 'luxon';

export interface TProductsAnalyticsFilters {
    product_id: string;
    date_from: DateTime;
    date_to: DateTime;
}
