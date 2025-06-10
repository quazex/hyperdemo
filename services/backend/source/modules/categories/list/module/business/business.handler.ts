import { Injectable } from '@nestjs/common';
import { ViewConfig } from '../../../../../config/view.config';
import { TCategoriesListFilters } from '../../types/filter.types';
import { TCategoriesListPagination } from '../../types/pagination.types';
import { CategoriesListRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly categoriesRepository: CategoriesListRepository,
    ) {}

    public async getList(filters: TCategoriesListFilters): Promise<TCategoriesListPagination> {
        const total = await this.categoriesRepository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TCategoriesListPagination = {
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
