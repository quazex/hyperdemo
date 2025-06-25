import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database';
import { ReviewsDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsCreateRepository {
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

    public async create(model: ReviewsDataModel): Promise<void> {
        const entity = model.toEntity();
        await this.reviewsRepository.save(entity);
    }
}
