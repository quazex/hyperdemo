import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CategoriesListSchema } from '../../../types/schema.types';

export class CategoriesSchemaDto implements CategoriesListSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public category_id: string;

    @Expose()
    public name: string;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public products: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public brands: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public feedbacks: number;
}
