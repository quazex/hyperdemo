import { Injectable } from '@nestjs/common';
import { BrandsAnalyticsFilters } from '../../types/filter.types';
import { BrandsAnalyticsSchema } from '../../types/schema.types';
import { BrandsAnalyticsRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsAnalyticsService {
    constructor(private readonly brandsRepository: BrandsAnalyticsRepository) {}

    public async getList(filters: BrandsAnalyticsFilters): Promise<BrandsAnalyticsSchema[]> {
        const rows = await this.brandsRepository.getList({
            brand_id: filters.brand_id,
            date_from: filters.date_from.startOf('day'),
            date_to: filters.date_to.endOf('day'),
        });
        return rows;
    }
}
