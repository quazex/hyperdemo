import { OrdersListModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { Environment } from 'environment'
import { TOrdersListFilters } from '../../types/filters.types'
import { OrdersListRepository } from '../integration/integration.repository'

@Injectable()
export class OrdersListService {
  constructor(
    private readonly repository: OrdersListRepository,
  ) {}

  public async getList(filters: TOrdersListFilters): Promise<OrdersListModel> {
    const model = OrdersListModel.init()

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
