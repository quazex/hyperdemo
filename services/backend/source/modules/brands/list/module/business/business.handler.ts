import { ViewConfig } from '@config';
import { TBrandsPagination } from '@domain/restapi';
import { Injectable } from '@nestjs/common';
import { TBrandsListFilters } from '../../types/filters.types';
import { BrandsListRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly brandsRepository: BrandsListRepository,
    ) {}

    public async getList(filters: TBrandsListFilters): Promise<TBrandsPagination> {
        const total = await this.brandsRepository.count();
        const pages = Math.ceil(total / this.viewConfig.itemsPerPage);

        const result: TBrandsPagination = {
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
