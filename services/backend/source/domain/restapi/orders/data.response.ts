import { OrdersDataModel } from '@domain/models';
import { TOrdersDataSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export class OrdersDataRes implements TOrdersDataSchema {
    @ApiProperty({ description: 'UUID v4' })
    public order_id: string;

    @ApiProperty({ description: 'UUID v4' })
    public user_id: string;

    public status: string;

    @ApiProperty({ minimum: 0 })
    public products: number;

    @ApiProperty({ minimum: 0 })
    public revenue: number;

    @ApiProperty({ example: '2024-07-01T12:34:56Z' })
    public created_at: string;

    @ApiProperty({ example: '2024-07-01T12:34:56Z' })
    public updated_at: string;

    public static init(model: OrdersDataModel): OrdersDataRes {
        const schema = model.toSchema();
        return plainToInstance(OrdersDataRes, schema);
    }
}
