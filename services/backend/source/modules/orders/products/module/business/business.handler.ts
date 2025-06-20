import { ViewConfig } from '@config';
import { OrdersProductsListModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { TOrdersProductsFilters } from '../../types/filters.types';
import { OrdersProductsRepository } from '../integration/integration.repository';

@Injectable()
export class OrdersProductsService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: OrdersProductsRepository,
    ) {}

    public async getList(filters: TOrdersProductsFilters): Promise<OrdersProductsListModel> {
        const model = OrdersProductsListModel.init();

        const total = await this.repository.count(filters.order_id);
        const pages = Math.ceil(model.total / this.viewConfig.itemsPerPage);

        model.total = total;
        model.pages = pages;

        if (filters.page <= model.pages) {
            model.list = await this.repository.getList(filters);
        }

        return model;
    }
}
