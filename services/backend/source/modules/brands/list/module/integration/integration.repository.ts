import { ViewConfig } from '@config';
import { BrandsStatisticsEntity } from '@domain/database';
import { BrandsDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TBrandsListFilters } from '../../types/filters.types';

@Injectable()
export class BrandsListRepository {
    constructor(
        @InjectRepository(BrandsStatisticsEntity)
        private readonly repository: Repository<BrandsStatisticsEntity>,
        private readonly viewConfig: ViewConfig,
    ) {}

    public async count() {
        const result = await this.repository.count();
        return result;
    }

    public async getList(filters: TBrandsListFilters): Promise<BrandsDataModel[]> {
        const rows = await this.repository.find({
            select: [
                'brand_id',
                'name',
                'products',
                'categories',
                'feedbacks',
            ],
            order: {
                products: 'DESC',
                feedbacks: 'DESC',
                brand_id: 'ASC',
            },
            take: this.viewConfig.itemsPerPage,
            skip: this.viewConfig.itemsPerPage * (filters.page - 1),
        });

        const schemas = rows.map((row) => BrandsDataModel.fromStatistic(row));
        return schemas;
    }
}
