import { CategoriesAnalyticsModel } from '@domain/models';
import { TCategoriesAnalyticsSchema } from '@domain/schemas';
import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

export class CategoriesAnalyticsRes implements TCategoriesAnalyticsSchema {
    @ApiProperty({ minimum: 0, example: 200_000 })
    public revenue: number;

    @ApiProperty({ example: '2024-01-01' })
    public date: string;

    public static init(models: CategoriesAnalyticsModel[]): CategoriesAnalyticsRes[] {
        const schemas = models.map((m) => m.toSchema());
        return plainToInstance(CategoriesAnalyticsRes, schemas);
    }
}
