import { DateTime } from 'luxon';
import { IsBoolean } from '../decorators/is-boolean.decorator';
import { IsDateTime } from '../decorators/is-date-time.decorator';
import { IsNumber } from '../decorators/is-number.decorator';
import { IsString } from '../decorators/is-string.decorator';
import { IsUUID } from '../decorators/is-uuid.decorator';

export class TestsValidatorsDto {
    @IsUUID()
    public id: string;

    @IsString()
    public text: string;

    @IsNumber()
    public quantity: number;

    @IsBoolean()
    public is_flag: boolean;

    @IsDateTime()
    public timestamp: DateTime;
}
