import { BrandsStatisticsEntity } from '@domain/database';
import { BrandsDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TBrandsInfoFilters } from '../../types/filter.types';

@Injectable()
export class BrandsInfoRepository {
    constructor(
        @InjectRepository(BrandsStatisticsEntity)
        private readonly repository: Repository<BrandsStatisticsEntity>,
    ) {}

    public async getInfo(filters: TBrandsInfoFilters) {
        const row = await this.repository.findOne({
            select: [
                'brand_id',
                'name',
                'products',
                'categories',
                'feedbacks',
            ],
            where: {
                brand_id: filters.brand_id,
            },
        });

        if (row) {
            return BrandsDataModel.fromStatistic(row);
        }

        return null;
    }
}
