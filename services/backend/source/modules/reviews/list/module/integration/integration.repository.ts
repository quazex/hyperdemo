import { ViewConfig } from '@config';
import { ReviewsDataEntity } from '@domain/database';
import { ReviewsDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TReviewsListFilters } from '../../types/filters.types';

@Injectable()
export class ReviewsListRepository {
    constructor(
        @InjectRepository(ReviewsDataEntity)
        private readonly repository: Repository<ReviewsDataEntity>,
        private readonly viewConfig: ViewConfig,
    ) {}

    public async count(): Promise<number> {
        const result = await this.repository.count();
        return result;
    }

    public async getList(filters: TReviewsListFilters): Promise<ReviewsDataModel[]> {
        const rows = await this.repository.find({
            where: {
                product_id: filters.product_id,
            },
            order: {
                created_at: 'DESC',
            },
            take: this.viewConfig.items_per_page,
            skip: this.viewConfig.items_per_page * (filters.page - 1),
        });

        return rows.map((row) => ReviewsDataModel.fromEntity(row));
    }
}
