import { ViewConfig } from '@config';
import { TOrdersPagination } from '@domain/restapi';
import { Injectable } from '@nestjs/common';
import { TOrdersListFilters } from '../../types/filters.types';
import { OrdersListRepository } from '../integration/integration.repository';

@Injectable()
export class OrdersListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: OrdersListRepository,
    ) {}

    public async getList(filters: TOrdersListFilters) {
        const total = await this.repository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TOrdersPagination = {
            rows: [],
            total,
            pages,
        };

        if (filters.page <= pages) {
            result.rows = await this.repository.getOrders(filters);
        }

        return result;
    }
}
