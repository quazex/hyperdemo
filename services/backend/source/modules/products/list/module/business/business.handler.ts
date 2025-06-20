import { ViewConfig } from '@config';
import { ProductsListModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { TProductsListFilters } from '../../types/filters.types';
import { ProductsListRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: ProductsListRepository,
    ) {}

    public async getList(filters: TProductsListFilters): Promise<ProductsListModel> {
        const model = ProductsListModel.init();

        const total = await this.repository.count();
        const pages = Math.ceil(model.total / this.viewConfig.items_per_page);

        model.total = total;
        model.pages = pages;

        if (filters.page <= model.pages) {
            model.list = await this.repository.getList(filters);
        }

        return model;
    }
}
