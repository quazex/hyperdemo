import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TCategoriesDataSchema } from '../../../../../../models/schemas';

export class CategoriesSchemaDto implements TCategoriesDataSchema {
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
