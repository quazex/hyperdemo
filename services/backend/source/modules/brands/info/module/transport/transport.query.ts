import { DateTime } from 'luxon';
import { IsDateTime } from '../../../../../shared/requests/decorators/is-date-time.decorator';

export class BrandsInfoQuery {
    @IsDateTime()
    public page: DateTime;
}
