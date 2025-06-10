import { Injectable } from '@nestjs/common';
import { TCategoriesAnalyticsSchema } from '../../../../../models/schemas';
import { TCategoriesAnalyticsFilters } from '../../types/filter.types';
import { CategoriesAnalyticsRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesAnalyticsService {
    constructor(private readonly categoriesRepository: CategoriesAnalyticsRepository) {}

    public async getList(filters: TCategoriesAnalyticsFilters): Promise<TCategoriesAnalyticsSchema[]> {
        const rows = await this.categoriesRepository.getList({
            category_id: filters.category_id,
            date_from: filters.date_from.startOf('day'),
            date_to: filters.date_to.endOf('day'),
        });
        return rows;
    }
}
