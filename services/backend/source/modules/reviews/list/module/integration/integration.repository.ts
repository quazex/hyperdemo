import { ViewConfig } from '@config';
import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database';
import { ReviewsDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TReviewsListFilters } from '../../types/filters.types';

@Injectable()
export class ReviewsListRepository {
    constructor(
        private readonly viewConfig: ViewConfig,
        @InjectRepository(ProductsDataEntity) private readonly productsRepository: Repository<ProductsDataEntity>,
        @InjectRepository(ReviewsDataEntity) private readonly reviewsRepository: Repository<ReviewsDataEntity>,
    ) {}

    public async isProductExists(productId: string): Promise<boolean> {
        const count = await this.productsRepository.countBy({
            product_id: productId,
        });
        return count > 0;
    }

    public async count(): Promise<number> {
        const result = await this.reviewsRepository.count();
        return result;
    }

    public async getList(filters: TReviewsListFilters): Promise<ReviewsDataModel[]> {
        const rows = await this.reviewsRepository.find({
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
