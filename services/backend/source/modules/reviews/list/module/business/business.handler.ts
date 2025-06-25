import { ViewConfig } from '@config';
import { ReviewsListModel } from '@domain/models';
import { Injectable } from '@nestjs/common';
import { TReviewsListFilters } from '../../types/filters.types';
import { ReviewsListRepository } from '../integration/integration.repository';

@Injectable()
export class ReviewsListService {
    constructor(
        private readonly viewConfig: ViewConfig,
        private readonly repository: ReviewsListRepository,
    ) {}

    public async getList(filters: TReviewsListFilters): Promise<ReviewsListModel> {
        const model = ReviewsListModel.init();

        const total = await this.repository.count();
        const pages = Math.ceil(total / this.viewConfig.items_per_page);

        model.total = total;
        model.pages = pages;

        if (filters.page <= pages) {
            model.list = await this.repository.getList(filters);
        }

        return model;
    }
}
