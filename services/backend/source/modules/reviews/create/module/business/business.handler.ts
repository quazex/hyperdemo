import { ContextProvider } from '@context';
import { ReviewsDataModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { TReviewsCreateFilters } from '../../types/filters.types';
import { ReviewsCreateRepository } from '../integration/integration.repository';

@Injectable()
export class ReviewsCreateService {
    constructor(
        private readonly contextProvider: ContextProvider,
        private readonly repository: ReviewsCreateRepository,
    ) {}

    public async create(params: TReviewsCreateFilters): Promise<ReviewsDataModel> {
        const context = this.contextProvider.getStore();
        const model = ReviewsDataModel.init({
            user_id: context.user.sub,
            product_id: params.product_id,
            text: params.text,
            rating: params.rating,
        });
        await this.repository.create(model);
        return model;
    }
}
