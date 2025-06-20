import { ViewConfig } from '@config';
import { OrdersStatisticsEntity } from '@domain/database';
import { OrdersDataModel } from '@domain/models';
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

    public async getList(filters: TOrdersListFilters): Promise<OrdersDataModel[]> {
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

        const models = rows.map((row) => OrdersDataModel.fromStatistic(row));
        return models;
    }
}
