import { ViewConfig } from '@config';
import { CategoriesStatisticsEntity } from '@domain/database';
import { CategoriesDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TCategoriesListFilters } from '../../types/filters.types';

@Injectable()
export class CategoriesListRepository {
    constructor(
        @InjectRepository(CategoriesStatisticsEntity)
        private readonly repository: Repository<CategoriesStatisticsEntity>,
        private readonly viewConfig: ViewConfig,
    ) {}

    public async count(): Promise<number> {
        const result = await this.repository.count();
        return result;
    }

    public async getList(filters: TCategoriesListFilters): Promise<CategoriesDataModel[]> {
        const rows = await this.repository.find({
            select: [
                'category_id',
                'name',
                'brands',
                'products',
                'feedbacks',
            ],
            order: {
                products: 'DESC',
                feedbacks: 'DESC',
                category_id: 'ASC',
            },
            take: this.viewConfig.items_per_page,
            skip: this.viewConfig.items_per_page * (filters.page - 1),
        });

        const models = rows.map((row) => CategoriesDataModel.fromStatistic(row));
        return models;
    }
}
