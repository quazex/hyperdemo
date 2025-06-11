import { Exception } from '@hyperdemo/core/modules/exception';
import { TCategoriesDataSchema } from '@models/schemas';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TCategoriesInfoFilters } from '../../types/filter.types';
import { CategoriesInfoRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesInfoService {
    constructor(private readonly categoriesRepository: CategoriesInfoRepository) {}

    public async getInfo(filters: TCategoriesInfoFilters): Promise<TCategoriesDataSchema> {
        const doc = await this.categoriesRepository.getInfo(filters);
        if (!doc) {
            throw new Exception({
                message: 'Cannot find category',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }
        return doc;
    }
}
