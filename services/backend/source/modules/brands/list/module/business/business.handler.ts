import { Injectable } from '@nestjs/common';
import { ViewConfig } from '../../../../../config/view.config';
import { TBrandsListFilters } from '../../types/filter.types';
import { TBrandsListPagination } from '../../types/pagination.types';
import { BrandsListRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly brandsRepository: BrandsListRepository,
    ) {}

    public async getList(filters: TBrandsListFilters): Promise<TBrandsListPagination> {
        const total = await this.brandsRepository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TBrandsListPagination = {
            rows: [],
            total,
            pages,
        };

        if (filters.page <= pages) {
            result.rows = await this.brandsRepository.getList(filters);
        }

        return result;
    }
}
