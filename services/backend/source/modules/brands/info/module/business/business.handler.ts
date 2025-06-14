import { TBrandsDataSchema } from '@domain/schemas';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TBrandsInfoFilters } from '../../types/filter.types';
import { BrandsInfoRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsInfoService {
    constructor(private readonly repository: BrandsInfoRepository) {}

    public async getInfo(filters: TBrandsInfoFilters): Promise<TBrandsDataSchema> {
        const doc = await this.repository.getInfo(filters);
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
