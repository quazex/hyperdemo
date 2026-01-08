import { CategoriesAnalyticsEntity } from '@domain/database'
import { CategoriesAnalyticsModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, Repository } from 'typeorm'
import { TCategoriesAnalyticsFilters } from '../../types/filter.types'

@Injectable()
export class CategoriesAnalyticsRepository {
  constructor(
    @InjectRepository(CategoriesAnalyticsEntity)
    private readonly repository: Repository<CategoriesAnalyticsEntity>,
  ) {}

  public async getList(filters: TCategoriesAnalyticsFilters): Promise<CategoriesAnalyticsModel[]> {
    const dateFrom = filters.date_from.toSQL({ includeOffset: false })
    const dateTo = filters.date_to.toSQL({ includeOffset: false })

    const rows = await this.repository.find({
      select: [
        'revenue',
        'date',
      ],
      where: {
        category_id: filters.category_id,
        date: Between(dateFrom, dateTo),
      },
      order: {
        date: 'ASC',
      },
    })

    const models = rows.map((row) => CategoriesAnalyticsModel.fromEntity(row))
    return models
  }
}
