import { ViewConfig } from '@config';
import { ProductsDataEntity } from '@domain/database';
import { ProductsDataModel } from '@domain/models';
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

    public async getList(filters: TProductsListFilters): Promise<ProductsDataModel[]> {
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

        const models = rows.map((row) => ProductsDataModel.fromEntity(row));
        return models;
    }
}
