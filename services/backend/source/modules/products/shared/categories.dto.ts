import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TCategoriesShortSchema } from '../../../models/schemas';

export class ProductsCategoriesDto implements TCategoriesShortSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public id: string;

    @Expose()
    public name: string;
}
