import { ViewConfig } from '@config';
import { OrdersListModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { TOrdersListFilters } from '../../types/filters.types';
import { OrdersListRepository } from '../integration/integration.repository';

@Injectable()
export class OrdersListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: OrdersListRepository,
    ) {}

    public async getList(filters: TOrdersListFilters): Promise<OrdersListModel> {
        const model = OrdersListModel.init();

        const total = await this.repository.count();
        const pages = Math.ceil(model.total / this.viewConfig.itemsPerPage);

        model.total = total;
        model.pages = pages;

        if (filters.page <= model.pages) {
            model.list = await this.repository.getList(filters);
        }

        return model;
    }
}
