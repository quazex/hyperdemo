import { Exception } from '@hyperdemo/core/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CategoriesInfoFilters } from '../../types/filter.types';
import { CategoriesInfoSchema } from '../../types/schema.types';
import { CategoriesInfoRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesInfoService {
    constructor(private readonly categoriesRepository: CategoriesInfoRepository) {}

    public async getInfo(filters: CategoriesInfoFilters): Promise<CategoriesInfoSchema> {
        const doc = await this.categoriesRepository.getInfo(filters);
        if (!doc) {
            throw new Exception({
                message: 'Cannot find categorie',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }
        return doc;
    }
}
