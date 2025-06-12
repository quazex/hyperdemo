import { ViewConfig } from '@config';
import { OrdersProductsEntity } from '@domain/database';
import { OrdersProductsModel } from '@domain/models';
import { TOrdersProductsSchema } from '@domain/schemas';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TOrdersProductsFilters } from '../../types/filters.types';

@Injectable()
export class OrdersProductsRepository {
    constructor(
        @InjectRepository(OrdersProductsEntity)
        private readonly repository: Repository<OrdersProductsEntity>,
        private readonly viewConfig: ViewConfig,
    ) {}

    public async count(filters: TOrdersProductsFilters) {
        const result = await this.repository.count({
            where: {
                order_id: filters.order_id,
            },
        });
        return result;
    }

    public async getProducts(filters: TOrdersProductsFilters) {
        const rows = await this.repository.find({
            where: {
                order_id: filters.order_id,
            },
            order: {
                order_id: 'ASC',
                product_id: 'ASC',
            },
            relations: [
                'product',
                'product.brand',
                'product.category',
                'product.images',
            ],
            take: this.viewConfig.itemsPerPage,
            skip: this.viewConfig.itemsPerPage * (filters.page - 1),
        });

        const schemas = rows.map<TOrdersProductsSchema>((row) => {
            const model = OrdersProductsModel.fromEntity(row);
            return model.toSchema();
        });

        return schemas;
    }
}
