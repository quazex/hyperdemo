import { ProductsDataModel } from '@domain/models';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TProductsInfoFilters } from '../../types/filter.types';
import { ProductsInfoRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsInfoService {
    constructor(private readonly repository: ProductsInfoRepository) {}

    public async getInfo(filters: TProductsInfoFilters): Promise<ProductsDataModel> {
        const model = await this.repository.getInfo(filters);
        if (!model) {
            throw new Exception({
                message: 'Cannot find product',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }
        return model;
    }
}
