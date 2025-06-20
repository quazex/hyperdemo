import { Injectable } from '@nestjs/common';
import { TCategoriesAnalyticsFilters } from '../../types/filter.types';
import { CategoriesAnalyticsRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesAnalyticsService {
    constructor(private readonly repository: CategoriesAnalyticsRepository) {}

    public async getList(filters: TCategoriesAnalyticsFilters) {
        const models = await this.repository.getList({
            category_id: filters.category_id,
            date_from: filters.date_from.startOf('day'),
            date_to: filters.date_to.endOf('day'),
        });
        return models;
    }
}
