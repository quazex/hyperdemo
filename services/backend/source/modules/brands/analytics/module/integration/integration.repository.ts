import { BrandsAnalyticsEntity } from '@domain/database';
import { BrandsAnalyticsModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { TBrandsAnalyticsFilters } from '../../types/filters.types';

@Injectable()
export class BrandsAnalyticsRepository {
    constructor(
        @InjectRepository(BrandsAnalyticsEntity)
        private readonly repository: Repository<BrandsAnalyticsEntity>,
    ) {}

    public async getList(filters: TBrandsAnalyticsFilters) {
        const dateFrom = filters.date_from.toSQL({ includeOffset: false });
        const dateTo = filters.date_to.toSQL({ includeOffset: false });

        const rows = await this.repository.find({
            select: [
                'revenue',
                'date',
            ],
            where: {
                brand_id: filters.brand_id,
                date: Between(dateFrom, dateTo),
            },
            order: {
                date: 'ASC',
            },
        });

        const schemas = rows.map((row) => BrandsAnalyticsModel.fromEntity(row));
        return schemas;
    }
}
