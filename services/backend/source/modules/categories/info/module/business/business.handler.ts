import { TCategoriesDataSchema } from '@domain/schemas';
import { Exception } from '@hyperdemo/core/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TCategoriesInfoFilters } from '../../types/filter.types';
import { CategoriesInfoRepository } from '../integration/integration.repository';

@Injectable()
export class CategoriesInfoService {
    constructor(private readonly repository: CategoriesInfoRepository) {}

    public async getInfo(filters: TCategoriesInfoFilters): Promise<TCategoriesDataSchema> {
        const doc = await this.repository.getInfo(filters);
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
