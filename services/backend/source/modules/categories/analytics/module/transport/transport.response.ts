import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { TCategoriesAnalyticsSchema } from '../../../../../models/schemas';

export class CategoriesAnalyticsRes implements TCategoriesAnalyticsSchema {
    @Expose()
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @Expose()
    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(rows: TCategoriesAnalyticsSchema[]): CategoriesAnalyticsRes[] {
        return plainToInstance(CategoriesAnalyticsRes, rows);
    }
}
