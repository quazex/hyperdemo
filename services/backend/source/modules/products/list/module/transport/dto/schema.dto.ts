import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TProductsDataSchema } from '../../../../../../models/schemas';
import { ProductsBrandsDto } from './brands.dto';
import { ProductsCategoriesDto } from './categories.dto';
import { ProductsImagesDto } from './images.dto';

export class ProductsSchemaDto implements TProductsDataSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public product_id: string;

    @Expose()
    public name: string;

    @Expose()
    public description: string;

    @Expose()
    @Type(() => ProductsImagesDto)
    public images: ProductsImagesDto[];

    @Expose()
    @Type(() => ProductsBrandsDto)
    public brand: ProductsBrandsDto;

    @Expose()
    @Type(() => ProductsCategoriesDto)
    public category: ProductsCategoriesDto;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public price: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public feedbacks: number;
}
