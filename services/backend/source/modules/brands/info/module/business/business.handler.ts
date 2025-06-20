import { BrandsDataModel } from '@domain/models';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TBrandsInfoFilters } from '../../types/filter.types';
import { BrandsInfoRepository } from '../integration/integration.repository';

@Injectable()
export class BrandsInfoService {
    constructor(private readonly repository: BrandsInfoRepository) {}

    public async getInfo(filters: TBrandsInfoFilters): Promise<BrandsDataModel> {
        const model = await this.repository.getInfo(filters);
        if (!model) {
            throw new Exception({
                message: 'Cannot find brand',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }
        return model;
    }
}
