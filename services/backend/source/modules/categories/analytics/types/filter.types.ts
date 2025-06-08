import { DateTime } from 'luxon';

export interface CategoriesAnalyticsFilters {
    category_id: string;
    date_from: DateTime;
    date_to: DateTime;
}
