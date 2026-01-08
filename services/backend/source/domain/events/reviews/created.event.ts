export interface TReviewsCreatedEvent {
  product_id: string
}

export class ReviewsCreatedEvent {
  public static event = 'reviews.created.event'

  public readonly product_id: string

  constructor(params: TReviewsCreatedEvent) {
    this.product_id = params.product_id
  }
}
