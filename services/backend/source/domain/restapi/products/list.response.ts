import { TProductsDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { TPaginationRes } from '../pagination/pagination.response';
import { ProductsDataRes } from './data.response';

export type TProductsPagination = TPaginationRes<TProductsDataSchema>;

export class ProductsListRes implements TProductsPagination {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Type(() => ProductsDataRes)
    public rows: ProductsDataRes[];

    public static init(data: TProductsPagination): ProductsListRes {
        return plainToInstance(ProductsListRes, data);
    }
}
