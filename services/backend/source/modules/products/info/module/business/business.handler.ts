import { TProductsDataSchema } from '@domain/schemas';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TProductsInfoFilters } from '../../types/filter.types';
import { ProductsInfoRepository } from '../integration/integration.repository';

@Injectable()
export class ProductsInfoService {
    constructor(private readonly repository: ProductsInfoRepository) {}

    public async getInfo(filters: TProductsInfoFilters): Promise<TProductsDataSchema> {
        const doc = await this.repository.getInfo(filters);
        if (!doc) {
            throw new Exception({
                message: 'Cannot find product',
                status: HttpStatus.NOT_FOUND,
                context: filters,
            });
        }
        return doc;
    }
}
