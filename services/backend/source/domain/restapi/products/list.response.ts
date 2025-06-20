import { ProductsListModel } from '@domain/models';
import { TProductsListSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { ProductsDataRes } from './data.response';

export class ProductsListRes implements TProductsListSchema {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Type(() => ProductsDataRes)
    public rows: ProductsDataRes[];

    public static init(model: ProductsListModel): ProductsListRes {
        const schema = model.toSchema();
        return plainToInstance(ProductsListRes, schema);
    }
}
