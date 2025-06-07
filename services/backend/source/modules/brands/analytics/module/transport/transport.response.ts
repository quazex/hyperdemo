import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { BrandsAnalyticsSchema } from '../../types/schema.types';

export class BrandsAnalyticsRes implements BrandsAnalyticsSchema {
    @Expose()
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @Expose()
    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(rows: BrandsAnalyticsSchema[]): BrandsAnalyticsRes[] {
        return plainToInstance(BrandsAnalyticsRes, rows);
    }
}
