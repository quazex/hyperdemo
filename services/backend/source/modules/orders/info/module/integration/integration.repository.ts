import { OrdersStatisticsEntity } from '@models/database';
import { TOrdersDataSchema } from '@models/schemas';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TOrdersInfoFilters } from '../../types/filters.types';

@Injectable()
export class OrdersInfoRepository {
    constructor(
        @InjectRepository(OrdersStatisticsEntity)
        private readonly repository: Repository<OrdersStatisticsEntity>,
    ) {}

    public async count() {
        const result = await this.repository.count();
        return result;
    }

    public async getOne(filters: TOrdersInfoFilters): Promise<TOrdersDataSchema | null> {
        const doc = await this.repository.findOne({
            select: [
                'order_id',
                'user_id',
                'status',
                'products',
                'revenue',
                'created_at',
                'updated_at',
            ],
            where: {
                order_id: filters.order_id,
            },
        });

        if (doc) {
            return {
                order_id: doc.order_id,
                user_id: doc.user_id,
                status: doc.status,
                products: doc.products,
                revenue: Number(doc.revenue),
                created_at: doc.created_at.toISOString(),
                updated_at: doc.updated_at.toISOString(),
            };
        }

        return null;
    }
}
