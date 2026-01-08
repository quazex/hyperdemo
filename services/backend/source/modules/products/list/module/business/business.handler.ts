import { ProductsListModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { Environment } from 'environment'
import { TProductsListFilters } from '../../types/filters.types'
import { ProductsListRepository } from '../integration/integration.repository'

@Injectable()
export class ProductsListService {
  constructor(
    private readonly repository: ProductsListRepository,
  ) {}

  public async getList(filters: TProductsListFilters): Promise<ProductsListModel> {
    const model = ProductsListModel.init()

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
