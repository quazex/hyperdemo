import { TProductsAnalyticsSchema } from '@domain/schemas';
import { Injectable } from '@nestjs/common';
import { TProductsAnalyticsFilters } from '../../types/filter.types';
import { ProductsAnalyticsRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsAnalyticsService {
    constructor(private readonly repository: ProductsAnalyticsRepository) {}

    public async getList(filters: TProductsAnalyticsFilters): Promise<TProductsAnalyticsSchema[]> {
        const rows = await this.repository.getList({
            product_id: filters.product_id,
            date_from: filters.date_from.startOf('day'),
            date_to: filters.date_to.endOf('day'),
        });
        return rows;
    }
}
