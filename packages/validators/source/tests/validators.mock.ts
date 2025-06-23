import { DateTime } from 'luxon';
import { IsBoolean } from '../is-boolean.decorator';
import { IsDateTime } from '../is-date-time.decorator';
import { IsNumber } from '../is-number.decorator';
import { IsString } from '../is-string.decorator';
import { IsUUID } from '../is-uuid.decorator';

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
