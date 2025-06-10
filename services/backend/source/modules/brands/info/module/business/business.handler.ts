import { Exception } from '@hyperdemo/core/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TBrandsDataSchema } from '../../../../../models/schemas';
import { TBrandsInfoFilters } from '../../types/filter.types';
import { BrandsInfoRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsInfoService {
    constructor(private readonly brandsRepository: BrandsInfoRepository) {}

    public async getInfo(filters: TBrandsInfoFilters): Promise<TBrandsDataSchema> {
        const doc = await this.brandsRepository.getInfo(filters);
        if (!doc) {
            throw new Exception({
                message: 'Cannot find brand',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }
        return doc;
    }
}
