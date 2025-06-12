import { OrdersStatisticsEntity } from '@domain/database';
import { OrdersDataModel } from '@domain/models';
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

    public async getOne(filters: TOrdersInfoFilters) {
        const row = await this.repository.findOne({
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

        if (row) {
            const model = OrdersDataModel.fromStatistic(row);
            return model.toSchema();
        }

        return null;
    }
}
