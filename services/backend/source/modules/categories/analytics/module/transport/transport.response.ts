import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { CategoriesAnalyticsSchema } from '../../types/schema.types';

export class CategoriesAnalyticsRes implements CategoriesAnalyticsSchema {
    @Expose()
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @Expose()
    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(rows: CategoriesAnalyticsSchema[]): CategoriesAnalyticsRes[] {
        return plainToInstance(CategoriesAnalyticsRes, rows);
    }
}
