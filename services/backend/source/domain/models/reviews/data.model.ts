import { randomUUID } from 'crypto'
import { ReviewsDataEntity } from '@domain/database'
import { TReviewsDataSchema } from '@domain/schemas'

export interface TReviewDataInit {
  user_id: string
  product_id: string
  text: string
  rating: number
}

export interface TReviewDataParams {
  id: string
  user_id: string
  product_id: string
  text: string
  rating: number
  created_at: Date
}

export class ReviewsDataModel {
  #id: string
  #user_id: string
  #product_id: string
  #text: string
  #rating: number
  #created_at: Date

  constructor(params: TReviewDataParams) {
    this.#id = params.id
    this.#user_id = params.user_id
    this.#product_id = params.product_id
    this.#text = params.text
    this.#rating = params.rating
    this.#created_at = params.created_at
  }

  public static init(fields: TReviewDataInit): ReviewsDataModel {
    return new ReviewsDataModel({
      id: randomUUID(),
      user_id: fields.user_id,
      product_id: fields.product_id,
      text: fields.text,
      rating: fields.rating,
      created_at: new Date(),
    })
  }

  public static fromEntity(entity: ReviewsDataEntity): ReviewsDataModel {
    return new ReviewsDataModel({
      id: entity.id,
      user_id: entity.user_id,
      product_id: entity.product_id,
      text: entity.text,
      rating: entity.rating,
      created_at: entity.created_at,
    })
  }

  public toEntity(): ReviewsDataEntity {
    const entity = new ReviewsDataEntity()

    entity.id = this.#id
    entity.user_id = this.#user_id
    entity.product_id = this.#product_id
    entity.text = this.#text
    entity.rating = this.#rating
    entity.created_at = this.#created_at

    return entity
  }

  public toSchema(): TReviewsDataSchema {
    return {
      id: this.#id,
      user_id: this.#user_id,
      text: this.#text,
      rating: this.#rating,
      created_at: this.#created_at.toISOString(),
    }
  }
}
