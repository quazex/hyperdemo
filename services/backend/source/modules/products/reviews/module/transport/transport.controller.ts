import { ReviewsCreatedEvent } from '@domain/events';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductsReviewsHandler } from '../business/business.handler';

@Injectable()
export class ProductsReviewsController {
    constructor(private readonly service: ProductsReviewsHandler) {}

    @OnEvent(ReviewsCreatedEvent.event, { async: true })
    public async getReviews(payload: ReviewsCreatedEvent): Promise<void> {
        await this.service.getReviews({
            product_id: payload.product_id,
        });
    }
}
