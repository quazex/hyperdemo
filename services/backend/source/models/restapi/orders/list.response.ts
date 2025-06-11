import { TOrdersDataSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';
import { TPaginationRes } from '../pagination/pagination.response';
import { OrdersDataRes } from './data.response';

export type TOrdersPagination = TPaginationRes<TOrdersDataSchema>;

export class OrdersListRes implements TOrdersPagination {
    @Expose()
    @ApiProperty({ minimum: 0 })
    public total: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Expose()
    @Type(() => OrdersDataRes)
    public rows: OrdersDataRes[];

    public static init(data: TOrdersPagination): OrdersListRes {
        return plainToInstance(OrdersListRes, data);
    }
}
