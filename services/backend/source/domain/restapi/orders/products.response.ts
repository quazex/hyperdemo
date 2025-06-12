import { TOrdersProductsSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { BrandsShortRes } from '../brands/short.response';
import { CategoriesShortRes } from '../categories/short.response';
import { TPaginationRes } from '../pagination/pagination.response';
import { ProductsImagesRes } from '../products/images.response';

export type TOrdersProductsPagination = TPaginationRes<TOrdersProductsSchema>;

export class OrdersProductsSchema implements TOrdersProductsSchema {
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
    public quantity: number;
}

export class OrdersProductsList implements TOrdersProductsPagination {
    @Expose()
    @ApiProperty({ minimum: 0 })
    public total: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Expose()
    @Type(() => OrdersProductsSchema)
    public rows: OrdersProductsSchema[];

    public static init(data: TOrdersProductsPagination) {
        return plainToInstance(OrdersProductsList, data);
    }
}
