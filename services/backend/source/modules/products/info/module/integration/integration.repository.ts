import { ProductsDataEntity } from '@domain/database';
import { ProductsDataModel } from '@domain/models';
import { TProductsDataSchema } from '@domain/schemas';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TProductsInfoFilters } from '../../types/filter.types';

@Injectable()
export class ProductsInfoRepository {
    constructor(
        @InjectRepository(ProductsDataEntity)
        private readonly repository: Repository<ProductsDataEntity>,
    ) {}

    public async getInfo(filters: TProductsInfoFilters): Promise<TProductsDataSchema | null> {
        const row = await this.repository.findOne({
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
                product_id: filters.product_id,
            },
            relations: [
                'images',
                'brand',
                'category',
            ],
        });

        if (row) {
            const model = ProductsDataModel.fromEntity(row);
            return model.toSchema();
        }

        return null;
    }
}
