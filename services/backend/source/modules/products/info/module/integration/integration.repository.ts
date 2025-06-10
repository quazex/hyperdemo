import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDataEntity } from '../../../../../models/database';
import { TProductsImageSchema } from '../../../../../models/schemas';
import { TProductsInfoFilters } from '../../types/filter.types';

@Injectable()
export class ProductsInfoRepository {
    constructor(
        @InjectRepository(ProductsDataEntity)
        private readonly repository: Repository<ProductsDataEntity>,
    ) {}

    public async getInfo(filters: TProductsInfoFilters) {
        const row = await this.repository.findOne({
            where: {
                product_id: filters.product_id,
            },
            relations: [
                'images',
                'brand',
                'category',
            ],
        });

        if (row) {
            return {
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
            };
        }

        return null;
    }
}
