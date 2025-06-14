import { TBrandsAnalyticsSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export class BrandsAnalyticsRes implements TBrandsAnalyticsSchema {
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(rows: TBrandsAnalyticsSchema[]): BrandsAnalyticsRes[] {
        return plainToInstance(BrandsAnalyticsRes, rows);
    }
}
