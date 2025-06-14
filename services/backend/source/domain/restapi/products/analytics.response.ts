import { TProductsAnalyticsSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export class ProductsAnalyticsRes implements TProductsAnalyticsSchema {
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(rows: TProductsAnalyticsSchema[]): ProductsAnalyticsRes[] {
        return plainToInstance(ProductsAnalyticsRes, rows);
    }
}
