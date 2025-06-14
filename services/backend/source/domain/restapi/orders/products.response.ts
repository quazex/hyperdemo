import { TOrdersProductsSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { BrandsShortRes } from '../brands/short.response';
import { CategoriesShortRes } from '../categories/short.response';
import { TPaginationRes } from '../pagination/pagination.response';
import { ProductsImagesRes } from '../products/images.response';

export type TOrdersProductsPagination = TPaginationRes<TOrdersProductsSchema>;

export class OrdersProductsSchema implements TOrdersProductsSchema {
    @ApiProperty({ description: 'UUID v4' })
    public product_id: string;

    public name: string;

    public description: string;

    @Type(() => ProductsImagesRes)
    public images: ProductsImagesRes[];

    @Type(() => BrandsShortRes)
    public brand: BrandsShortRes;

    @Type(() => CategoriesShortRes)
    public category: CategoriesShortRes;

    @ApiProperty({ minimum: 0 })
    public price: number;

    @ApiProperty({ minimum: 0 })
    public quantity: number;
}

export class OrdersProductsList implements TOrdersProductsPagination {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Type(() => OrdersProductsSchema)
    public rows: OrdersProductsSchema[];

    public static init(data: TOrdersProductsPagination) {
        return plainToInstance(OrdersProductsList, data);
    }
}
