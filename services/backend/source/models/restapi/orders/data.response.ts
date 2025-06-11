import { TOrdersDataSchema } from '@models/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class OrdersDataRes implements TOrdersDataSchema {
    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public order_id: string;

    @Expose()
    @ApiProperty({ description: 'UUID v4' })
    public user_id: string;

    @Expose()
    public status: string;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public products: number;

    @Expose()
    @ApiProperty({ minimum: 0 })
    public revenue: number;

    @Expose()
    @ApiProperty({ example: '2024-07-01T12:34:56Z' })
    public created_at: string;

    @Expose()
    @ApiProperty({ example: '2024-07-01T12:34:56Z' })
    public updated_at: string;

    public static init(data: TOrdersDataSchema): OrdersDataRes {
        return plainToInstance(OrdersDataRes, data);
    }
}
