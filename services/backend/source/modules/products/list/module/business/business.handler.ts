import { Injectable } from '@nestjs/common';
import { ViewConfig } from '../../../../../config/view.config';
import { TProductsListFilters, TProductsListHandler, TProductsListPagination } from '../../../../../models/types';
import { ProductsListRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsListService implements TProductsListHandler {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly brandsRepository: ProductsListRepository,
    ) {}

    public async getList(filters: TProductsListFilters): Promise<TProductsListPagination> {
        const total = await this.brandsRepository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TProductsListPagination = {
            rows: [],
            total,
            pages,
        };

        if (filters.page <= pages) {
            result.rows = await this.brandsRepository.getProducts(filters);
        }

        return result;
    }
}
