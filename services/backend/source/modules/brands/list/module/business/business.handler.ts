import { ViewConfig } from '@config'
import { BrandsListModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { TBrandsListFilters } from '../../types/filters.types'
import { BrandsListRepository } from '../integration/integration.repository'

@Injectable()
export class BrandsListService {
  constructor(
    private readonly viewConfig: ViewConfig,
    private readonly repository: BrandsListRepository,
  ) {}

  public async getList(filters: TBrandsListFilters): Promise<BrandsListModel> {
    const model = BrandsListModel.init()

    const total = await this.repository.count()
    const pages = Math.ceil(total / this.viewConfig.items_per_page)

    model.total = total
    model.pages = pages

    if (filters.page <= pages) {
      model.list = await this.repository.getList(filters)
    }

    return model
  }
}
