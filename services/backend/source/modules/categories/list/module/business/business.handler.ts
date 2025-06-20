import { ViewConfig } from '@config';
import { CategoriesListModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { TCategoriesListFilters } from '../../types/filters.types';
import { CategoriesListRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: CategoriesListRepository,
    ) {}

    public async getList(filters: TCategoriesListFilters): Promise<CategoriesListModel> {
        const model = CategoriesListModel.init();

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
