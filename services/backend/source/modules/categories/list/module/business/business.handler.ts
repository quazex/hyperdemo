import { ViewConfig } from '@config';
import { TCategoriesPagination } from '@domain/restapi';
import { Injectable } from '@nestjs/common';
import { TCategoriesListFilters } from '../../types/filters.types';
import { CategoriesListRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: CategoriesListRepository,
    ) {}

    public async getList(filters: TCategoriesListFilters) {
        const total = await this.repository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TCategoriesPagination = {
            rows: [],
            total,
            pages,
        };

        if (filters.page <= pages) {
            result.rows = await this.repository.getList(filters);
        }

        return result;
    }
}
