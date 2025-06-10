import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { TBrandsAnalyticsSchema } from '../../../../../models/schemas/brands/analytics.types';

export class BrandsAnalyticsRes implements TBrandsAnalyticsSchema {
    @Expose()
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @Expose()
    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(rows: TBrandsAnalyticsSchema[]): BrandsAnalyticsRes[] {
        return plainToInstance(BrandsAnalyticsRes, rows);
    }
}
