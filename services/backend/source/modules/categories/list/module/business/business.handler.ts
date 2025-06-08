import { Injectable } from '@nestjs/common';
import { ViewConfig } from '../../../../../config/view.config';
import { CategoriesListFilters } from '../../types/filter.types';
import { CategoriesListPagination } from '../../types/pagination.types';
import { CategoriesListRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly categoriesRepository: CategoriesListRepository,
    ) {}

    public async getList(filters: CategoriesListFilters): Promise<CategoriesListPagination> {
        const total = await this.categoriesRepository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: CategoriesListPagination = {
            rows: [],
            total,
            pages,
        };

        if (filters.page <= pages) {
            result.rows = await this.categoriesRepository.getList(filters);
        }

        return result;
    }
}
