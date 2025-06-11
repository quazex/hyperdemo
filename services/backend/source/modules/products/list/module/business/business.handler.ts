import { ViewConfig } from '@config';
import { TProductsPagination } from '@models/restapi';
import { Injectable } from '@nestjs/common';
import { TProductsListFilters } from '../../types/filters.types';
import { ProductsListRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: ProductsListRepository,
    ) {}

    public async getList(filters: TProductsListFilters) {
        const total = await this.repository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TProductsPagination = {
            rows: [],
            total,
            pages,
        };

        if (filters.page <= pages) {
            result.rows = await this.repository.getProducts(filters);
        }

        return result;
    }
}
