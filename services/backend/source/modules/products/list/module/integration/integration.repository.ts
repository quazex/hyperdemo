import { ViewConfig } from '@config';
import { ProductsDataEntity } from '@domain/database';
import { ProductsDataModel } from '@domain/models';
import { TProductsDataSchema } from '@domain/schemas';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TProductsListFilters } from '../../types/filters.types';

@Injectable()
export class ProductsListRepository {
    constructor(
        @InjectRepository(ProductsDataEntity)
        private readonly repository: Repository<ProductsDataEntity>,
        private readonly viewConfig: ViewConfig,
    ) {}

    public async count() {
        const result = await this.repository.count();
        return result;
    }

    public async getProducts(filters: TProductsListFilters): Promise<TProductsDataSchema[]> {
        const rows = await this.repository.find({
            select: [
                'product_id',
                'name',
                'description',
                'images',
                'brand',
                'category',
                'price',
                'feedbacks',
            ],
            where: {
                brand_id: filters.brand_id,
                category_id: filters.category_id,
            },
            order: {
                feedbacks: 'DESC',
                product_id: 'ASC',
            },
            relations: [
                'images',
                'brand',
                'category',
            ],
            take: this.viewConfig.itemsPerPage,
            skip: this.viewConfig.itemsPerPage * (filters.page - 1),
        });

        const schemas = rows.map<TProductsDataSchema>((row) => {
            const model = ProductsDataModel.fromEntity(row);
            return model.toSchema();
        });

        return schemas;
    }
}
