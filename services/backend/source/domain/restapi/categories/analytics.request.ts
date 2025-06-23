import { IsDateTime } from '@hyperdemo/validators';
import { DateTime } from 'luxon';

export class CategoriesAnalyticsReq {
    @IsDateTime({ example: '2024-07-01T00:00:00Z' })
    public date_from: DateTime;

    @IsDateTime({ example: '2024-07-31T23:59:59Z' })
    public date_to: DateTime;
}
