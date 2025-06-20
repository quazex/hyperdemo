import { ViewConfig } from '@config';
import { OrdersProductsEntity } from '@domain/database';
import { OrdersProductsDataModel } from '@domain/models';
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

    public async count(orderId: string): Promise<number> {
        const result = await this.repository.count({
            where: {
                order_id: orderId,
            },
        });
        return result;
    }

    public async getList(filters: TOrdersProductsFilters): Promise<OrdersProductsDataModel[]> {
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
            take: this.viewConfig.items_per_page,
            skip: this.viewConfig.items_per_page * (filters.page - 1),
        });

        const models = rows.map((row) => OrdersProductsDataModel.fromEntity(row));
        return models;
    }
}
