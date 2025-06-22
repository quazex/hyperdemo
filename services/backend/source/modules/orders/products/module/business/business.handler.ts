import { ViewConfig } from '@config';
import { OrdersProductsListModel } from '@domain/models';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TOrdersProductsFilters } from '../../types/filters.types';
import { OrdersProductsRepository } from '../integration/integration.repository';

@Injectable()
export class OrdersProductsService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: OrdersProductsRepository,
    ) {}

    public async getList(filters: TOrdersProductsFilters): Promise<OrdersProductsListModel> {
        const isOrderExists = await this.repository.isOrderExists(filters.order_id);
        if (!isOrderExists) {
            throw new Exception({
                message: 'Cannot find order',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }

        const model = OrdersProductsListModel.init();

        const total = await this.repository.count(filters.order_id);
        const pages = Math.ceil(total / this.viewConfig.items_per_page);

        model.total = total;
        model.pages = pages;

        if (filters.page <= pages) {
            model.list = await this.repository.getList(filters);
        }

        return model;
    }
}
