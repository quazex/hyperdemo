import { TProductsAnalyticsSchema } from '@models/schemas';
import { Injectable } from '@nestjs/common';
import { TProductsAnalyticsFilters } from '../../types/filter.types';
import { ProductsAnalyticsRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsAnalyticsService {
    constructor(private readonly productsRepository: ProductsAnalyticsRepository) {}

    public async getList(filters: TProductsAnalyticsFilters): Promise<TProductsAnalyticsSchema[]> {
        const rows = await this.productsRepository.getList({
            product_id: filters.product_id,
            date_from: filters.date_from.startOf('day'),
            date_to: filters.date_to.endOf('day'),
        });
        return rows;
    }
}
