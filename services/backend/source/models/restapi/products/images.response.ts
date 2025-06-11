import { TProductsImageSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductsImagesRes implements TProductsImageSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public id: string;

    @Expose()
    public small: string;

    @Expose()
    public regular: string;

    @Expose()
    public large: string;
}
