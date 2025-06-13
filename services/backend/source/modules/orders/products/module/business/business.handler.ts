import { ViewConfig } from '@config';
import { TOrdersProductsPagination } from '@domain/restapi';
import { Injectable } from '@nestjs/common';
import { TOrdersProductsFilters } from '../../types/filters.types';
import { OrdersProductsRepository } from '../integration/integration.repository';

@Injectable()
export class OrdersProductsService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: OrdersProductsRepository,
    ) {}

    public async getList(filters: TOrdersProductsFilters) {
        const total = await this.repository.count(filters);
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TOrdersProductsPagination = {
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
