import { TProductsDataSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { TPaginationRes } from '../pagination/pagination.response';
import { ProductsDataRes } from './data.response';

export type TProductsPagination = TPaginationRes<TProductsDataSchema>;

export class ProductsListRes implements TProductsPagination {
    @Expose()
    @ApiProperty({ minimum: 0 })
    public total: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Expose()
    @Type(() => ProductsDataRes)
    public rows: ProductsDataRes[];

    public static init(data: TProductsPagination): ProductsListRes {
        return plainToInstance(ProductsListRes, data);
    }
}
