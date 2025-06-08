import { DateTime } from 'luxon';
import { IsDateTime } from '../../../../../shared/requests/decorators/is-date-time.decorator';

export class CategoriesInfoQuery {
    @IsDateTime()
    public page: DateTime;
}
