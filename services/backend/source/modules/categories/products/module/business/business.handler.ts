import { Inject, Injectable } from '@nestjs/common';
import { TProductsListHandler } from '../../../../../models/types';
import { ProductsListService } from '../../../../products/list';
import { TCategoriesProductsFilters } from '../../types/filters.types';

@Injectable()
export class CategoriesProductsService {
    constructor(@Inject(ProductsListService) private readonly productsService: TProductsListHandler) {}

    public async getProducts(filters: TCategoriesProductsFilters) {
        const response = await this.productsService.getList({
            category_id: filters.category_id,
            page: filters.page,
        });
        return response;
    }
}
