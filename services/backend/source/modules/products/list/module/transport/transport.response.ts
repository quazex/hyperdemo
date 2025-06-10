import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { TProductsListPagination } from '../../../../../models/types';
import { ProductsSchemaDto } from '../../../shared/schema.dto';

export class ProductsListResponse implements TProductsListPagination {
    @Expose()
    @ApiProperty({ minimum: 0 })
    public total: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Expose()
    @Type(() => ProductsSchemaDto)
    public rows: ProductsSchemaDto[];

    public static init(data: TProductsListPagination): ProductsListResponse {
        return plainToInstance(ProductsListResponse, data);
    }
}
