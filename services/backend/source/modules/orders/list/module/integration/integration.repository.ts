import { ViewConfig } from '@config';
import { OrdersStatisticsEntity } from '@models/database';
import { TOrdersDataSchema } from '@models/schemas';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TOrdersListFilters } from '../../types/filters.types';

@Injectable()
export class OrdersListRepository {
    constructor(
        @InjectRepository(OrdersStatisticsEntity)
        private readonly repository: Repository<OrdersStatisticsEntity>,
        private readonly viewConfig: ViewConfig,
    ) {}

    public async count() {
        const result = await this.repository.count();
        return result;
    }

    public async getOrders(filters: TOrdersListFilters): Promise<TOrdersDataSchema[]> {
        const rows = await this.repository.find({
            select: [
                'order_id',
                'user_id',
                'status',
                'products',
                'revenue',
                'created_at',
                'updated_at',
            ],
            order: {
                created_at: 'DESC',
            },
            take: this.viewConfig.itemsPerPage,
            skip: this.viewConfig.itemsPerPage * (filters.page - 1),
        });

        const schemas = rows.map<TOrdersDataSchema>((row) => ({
            order_id: row.order_id,
            user_id: row.user_id,
            status: row.status,
            products: row.products,
            revenue: Number(row.revenue),
            created_at: row.created_at.toISOString(),
            updated_at: row.updated_at.toISOString(),
        }));

        return schemas;
    }
}
