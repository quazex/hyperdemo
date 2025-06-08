import { Injectable } from '@nestjs/common';
import { CategoriesAnalyticsFilters } from '../../types/filter.types';
import { CategoriesAnalyticsSchema } from '../../types/schema.types';
import { CategoriesAnalyticsRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesAnalyticsService {
    constructor(private readonly categoriesRepository: CategoriesAnalyticsRepository) {}

    public async getList(filters: CategoriesAnalyticsFilters): Promise<CategoriesAnalyticsSchema[]> {
        const rows = await this.categoriesRepository.getList({
            category_id: filters.category_id,
            date_from: filters.date_from.startOf('day'),
            date_to: filters.date_to.endOf('day'),
        });
        return rows;
    }
}
