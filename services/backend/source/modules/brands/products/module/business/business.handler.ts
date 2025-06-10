import { Inject, Injectable } from '@nestjs/common';
import { TProductsListHandler } from '../../../../../models/types';
import { ProductsListService } from '../../../../products/list';
import { TBrandsProductsFilters } from '../../types/filters.types';

@Injectable()
export class BrandsProductsService {
    constructor(@Inject(ProductsListService) private readonly productsService: TProductsListHandler) {}

    public async getProducts(filters: TBrandsProductsFilters) {
        const response = await this.productsService.getList({
            brand_id: filters.brand_id,
            page: filters.page,
        });
        return response;
    }
}
