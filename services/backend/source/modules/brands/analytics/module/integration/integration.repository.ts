import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { BrandsAnalyticsEntity } from '../../../../../database/entities/brands/analytics.entity';
import { BrandsAnalyticsFilters } from '../../types/filter.types';
import { BrandsAnalyticsSchema } from '../../types/schema.types';

@Injectable()
export class BrandsAnalyticsRepository {
    constructor(
        @InjectRepository(BrandsAnalyticsEntity) private readonly repository: Repository<BrandsAnalyticsEntity>,
    ) {}

    public async getList(filters: BrandsAnalyticsFilters): Promise<BrandsAnalyticsSchema[]> {
        const dateFrom = filters.date_from.toSQL({ includeOffset: false });
        const dateTo = filters.date_to.toSQL({ includeOffset: false });

        const rows = await this.repository.find({
            select: [
                'revenue',
                'date',
            ],
            where: {
                brand_id: filters.brand_id,
                date: Between(dateFrom, dateTo),
            },
            order: {
                date: 'ASC',
            },
        });

        const schemas = rows.map<BrandsAnalyticsSchema>((row) => ({
            revenue: row.revenue,
            date: row.date,
        }));

        return schemas;
    }
}
