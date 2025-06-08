import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesStatisticsEntity } from '../../../../../database/entities/categories/statistics.entity';
import { CategoriesInfoFilters } from '../../types/filter.types';
import { CategoriesInfoSchema } from '../../types/schema.types';

@Injectable()
export class CategoriesInfoRepository {
    constructor(
        @InjectRepository(CategoriesStatisticsEntity)
        private readonly repository: Repository<CategoriesStatisticsEntity>,
    ) {}

    public async getInfo(filters: CategoriesInfoFilters): Promise<CategoriesInfoSchema | null> {
        const row = await this.repository.findOne({
            select: [
                'category_id',
                'name',
                'brands',
                'products',
                'feedbacks',
            ],
            where: {
                category_id: filters.category_id,
            },
        });

        if (row) {
            return {
                category_id: row.category_id,
                name: row.name,
                products: row.products,
                brands: row.brands,
                feedbacks: row.feedbacks,
            };
        }

        return null;
    }
}
