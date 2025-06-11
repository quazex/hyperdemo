import { TProductsDataSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { BrandsShortRes } from '../brands/short.response';
import { CategoriesShortRes } from '../categories/short.response';
import { ProductsImagesRes } from './images.response';

export class ProductsDataRes implements TProductsDataSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public product_id: string;

    @Expose()
    public name: string;

    @Expose()
    public description: string;

    @Expose()
    @Type(() => ProductsImagesRes)
    public images: ProductsImagesRes[];

    @Expose()
    @Type(() => BrandsShortRes)
    public brand: BrandsShortRes;

    @Expose()
    @Type(() => CategoriesShortRes)
    public category: CategoriesShortRes;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public price: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public feedbacks: number;

    public static init(data: TProductsDataSchema): ProductsDataRes {
        return plainToInstance(ProductsDataRes, data);
    }
}
