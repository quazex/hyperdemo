import { Injectable } from '@nestjs/common';
import { TBrandsAnalyticsSchema } from '../../../../../models/schemas';
import { TBrandsAnalyticsFilters } from '../../types/filter.types';
import { BrandsAnalyticsRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsAnalyticsService {
    constructor(private readonly brandsRepository: BrandsAnalyticsRepository) {}

    public async getList(filters: TBrandsAnalyticsFilters): Promise<TBrandsAnalyticsSchema[]> {
        const rows = await this.brandsRepository.getList({
            brand_id: filters.brand_id,
            date_from: filters.date_from.startOf('day'),
            date_to: filters.date_to.endOf('day'),
        });
        return rows;
    }
}
