import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TBrandsDataSchema } from '../../../../../../models/schemas';

export class BrandsSchemaDto implements TBrandsDataSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public brand_id: string;

    @Expose()
    public name: string;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public products: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public categories: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public feedbacks: number;
}
