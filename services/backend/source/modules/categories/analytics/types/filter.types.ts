import { DateTime } from 'luxon';

export interface TCategoriesAnalyticsFilters {
    category_id: string;
    date_from: DateTime;
    date_to: DateTime;
}
