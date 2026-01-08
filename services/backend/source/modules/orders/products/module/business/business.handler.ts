import { OrdersProductsListModel } from '@domain/models'
import { HttpStatus, Injectable } from '@nestjs/common'
import { AppError } from '@shared/errors'
import { Environment } from 'environment'
import { TOrdersProductsFilters } from '../../types/filters.types'
import { OrdersProductsRepository } from '../integration/integration.repository'

@Injectable()
export class OrdersProductsService {
  constructor(
    private readonly repository: OrdersProductsRepository,
  ) {}

  public async getList(filters: TOrdersProductsFilters): Promise<OrdersProductsListModel> {
    const isOrderExists = await this.repository.isOrderExists(filters.order_id)
    if (!isOrderExists) {
      throw new AppError({
        message: 'Cannot find order',
        status: HttpStatus.NOT_FOUND,
        context: filters,
      })
    }

    const model = OrdersProductsListModel.init()

    const total = await this.repository.count(filters.order_id)
    const pages = Math.ceil(total / Environment.View.Size)

    model.total = total
    model.pages = pages

    if (filters.page <= pages) {
      model.list = await this.repository.getList(filters)
    }

    return model
  }
}
