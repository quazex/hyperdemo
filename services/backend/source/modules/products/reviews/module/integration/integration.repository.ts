import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TProductsReviewsUpdate } from '../../types/update.types';

@Injectable()
export class ProductsReviewsRepository {
    constructor(
        @InjectRepository(ProductsDataEntity) private readonly productsRepository: Repository<ProductsDataEntity>,
        @InjectRepository(ReviewsDataEntity) private readonly reviewsRepository: Repository<ReviewsDataEntity>,
    ) {}

    public async isProductExists(productId: string): Promise<boolean> {
        const count = await this.productsRepository.countBy({
            product_id: productId,
        });
        return count > 0;
    }

    public async countReviews(productId: string): Promise<number> {
        const count = await this.reviewsRepository.countBy({
            product: {
                product_id: productId,
            },
        });
        return count;
    }

    public async updateProduct(params: TProductsReviewsUpdate): Promise<number> {
        const result = await this.productsRepository.update({
            product_id: params.product_id,
        }, {
            feedbacks: params.feedbacks,
        });
        return result.affected ?? 0;
    }
}
