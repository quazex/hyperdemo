import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TProductsImageSchema } from '../../../../../../models/schemas';

export class ProductsImagesDto implements TProductsImageSchema {
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
