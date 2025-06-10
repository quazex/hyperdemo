import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewConfig } from '../../../../../config/view.config';
import { ProductsDataEntity } from '../../../../../models/database';
import { TProductsDataSchema, TProductsImageSchema } from '../../../../../models/schemas';
import { TProductsListFilters } from '../../../../../models/types';

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

        const schemas = rows.map<TProductsDataSchema>((row) => ({
            product_id: row.product_id,
            name: row.name,
            description: row.description,
            images: row.images.map<TProductsImageSchema>((img) => ({
                id: img.image_id,
                small: img.small,
                regular: img.regular,
                large: img.large,
            })),
            brand: {
                id: row.brand.brand_id,
                name: row.brand.name,
            },
            category: {
                id: row.category.category_id,
                name: row.category.name,
            },
            price: Number(row.price),
            feedbacks: row.feedbacks,
            created_at: row.created_at,
            updated_at: row.updated_at,
        }));

        return schemas;
    }
}
