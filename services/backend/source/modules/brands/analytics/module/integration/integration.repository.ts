import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { BrandsAnalyticsEntity } from '../../../../../models/database';
import { TBrandsAnalyticsSchema } from '../../../../../models/schemas';
import { TBrandsAnalyticsFilters } from '../../types/filter.types';

@Injectable()
export class BrandsAnalyticsRepository {
    constructor(
        @InjectRepository(BrandsAnalyticsEntity) private readonly repository: Repository<BrandsAnalyticsEntity>,
    ) {}

    public async getList(filters: TBrandsAnalyticsFilters): Promise<TBrandsAnalyticsSchema[]> {
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

        const schemas = rows.map<TBrandsAnalyticsSchema>((row) => ({
            revenue: row.revenue,
            date: row.date,
        }));

        return schemas;
    }
}
