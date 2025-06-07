import { DateTime } from 'luxon';
import { IsDateTime } from '../../../../../shared/requests/decorators/is-date-time.decorator';

export class BrandsAnalyticsQuery {
    @IsDateTime()
    public date_from: DateTime;

    @IsDateTime()
    public date_to: DateTime;
}
