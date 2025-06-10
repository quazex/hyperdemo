import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CategoriesAnalyticsEntity } from '../../../../../models/database/categories/analytics.entity';
import { TCategoriesAnalyticsSchema } from '../../../../../models/schemas';
import { TCategoriesAnalyticsFilters } from '../../types/filter.types';

@Injectable()
export class CategoriesAnalyticsRepository {
    constructor(
        @InjectRepository(CategoriesAnalyticsEntity) private readonly repository: Repository<CategoriesAnalyticsEntity>,
    ) {}

    public async getList(filters: TCategoriesAnalyticsFilters): Promise<TCategoriesAnalyticsSchema[]> {
        const dateFrom = filters.date_from.toSQL({ includeOffset: false });
        const dateTo = filters.date_to.toSQL({ includeOffset: false });

        const rows = await this.repository.find({
            select: [
                'revenue',
                'date',
            ],
            where: {
                category_id: filters.category_id,
                date: Between(dateFrom, dateTo),
            },
            order: {
                date: 'ASC',
            },
        });

        const schemas = rows.map<TCategoriesAnalyticsSchema>((row) => ({
            revenue: row.revenue,
            date: row.date,
        }));

        return schemas;
    }
}
