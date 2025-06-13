import { TProductsAnalyticsSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';

export class ProductsAnalyticsRes implements TProductsAnalyticsSchema {
    @Expose()
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @Expose()
    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(rows: TProductsAnalyticsSchema[]): ProductsAnalyticsRes[] {
        return plainToInstance(ProductsAnalyticsRes, rows);
    }
}
