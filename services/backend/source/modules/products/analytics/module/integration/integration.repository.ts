import { ProductsAnalyticsEntity } from '@domain/database'
import { ProductsAnalyticsModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm'
import { TProductsAnalyticsFilters } from '../../types/filter.types'

@Injectable()
export class ProductsAnalyticsRepository {
  constructor(
    @InjectRepository(ProductsAnalyticsEntity)
    private readonly repository: Repository<ProductsAnalyticsEntity>,
  ) {}

  public async getList(filters: TProductsAnalyticsFilters): Promise<ProductsAnalyticsModel[]> {
    const dateFrom = filters.date_from.toSQL({ includeOffset: false })
    const dateTo = filters.date_to.toSQL({ includeOffset: false })

    const rows = await this.repository.find({
      select: [
        'revenue',
        'date',
      ],
      where: {
        product_id: filters.product_id,
        date: Between(dateFrom, dateTo),
      },
      order: {
        date: 'ASC',
      },
    })

    const models = rows.map((row) => ProductsAnalyticsModel.fromEntity(row))
    return models
  }
}
