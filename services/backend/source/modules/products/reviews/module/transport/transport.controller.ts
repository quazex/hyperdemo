import { ReviewsCreatedEvent } from '@domain/events'
import { Injectable } from '@nestjs/common'
import { ProductsReviewsHandler } from '../business/business.handler'

@Injectable()
export class ProductsReviewsController {
  constructor(private readonly service: ProductsReviewsHandler) {}

  public async getReviews(payload: ReviewsCreatedEvent): Promise<void> {
    await this.service.getReviews({
      product_id: payload.product_id,
    })
  }
}
