import { TOrdersDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance, Type } from 'class-transformer';
import { TPaginationRes } from '../pagination/pagination.response';
import { OrdersDataRes } from './data.response';

export type TOrdersPagination = TPaginationRes<TOrdersDataSchema>;

export class OrdersListRes implements TOrdersPagination {
    @ApiProperty({ minimum: 0 })
    public total: number;

    @ApiProperty({ minimum: 0 })
    public pages: number;

    @Type(() => OrdersDataRes)
    public rows: OrdersDataRes[];

    public static init(data: TOrdersPagination): OrdersListRes {
        return plainToInstance(OrdersListRes, data);
    }
}
