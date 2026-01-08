import { ReviewsListModel } from '@domain/models'
import { HttpStatus, Injectable } from '@nestjs/common'
import { AppError } from '@shared/errors'
import { Environment } from 'environment'
import { TReviewsListFilters } from '../../types/filters.types'
import { ReviewsListRepository } from '../integration/integration.repository'

@Injectable()
export class ReviewsListService {
  constructor(
    private readonly repository: ReviewsListRepository,
  ) {}

  public async getList(filters: TReviewsListFilters): Promise<ReviewsListModel> {
    const isProductExists = await this.repository.isProductExists(filters.product_id)
    if (!isProductExists) {
      throw new AppError({
        status: HttpStatus.NOT_FOUND,
        message: 'Cannot find product',
        context: filters,
      })
    }

    const model = ReviewsListModel.init()

    const total = await this.repository.count()
    const pages = Math.ceil(total / Environment.View.Size)

    model.total = total
    model.pages = pages

    if (filters.page <= pages) {
      model.list = await this.repository.getList(filters)
    }

    return model
  }
}
