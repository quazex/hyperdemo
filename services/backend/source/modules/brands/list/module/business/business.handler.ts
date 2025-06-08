import { Injectable } from '@nestjs/common';
import { ViewConfig } from '../../../../../config/view.config';
import { BrandsListFilters } from '../../types/filter.types';
import { BrandsListPagination } from '../../types/pagination.types';
import { BrandsListRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly brandsRepository: BrandsListRepository,
    ) {}

    public async getList(filters: BrandsListFilters): Promise<BrandsListPagination> {
        const total = await this.brandsRepository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: BrandsListPagination = {
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
