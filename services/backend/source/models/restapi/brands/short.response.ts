import { TBrandsShortSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BrandsShortRes implements TBrandsShortSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public id: string;

    @Expose()
    public name: string;
}
