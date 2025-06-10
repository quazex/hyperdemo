import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TBrandsShortSchema } from '../../../../../../models/schemas';

export class ProductsBrandsDto implements TBrandsShortSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public id: string;

    @Expose()
    public name: string;
}
