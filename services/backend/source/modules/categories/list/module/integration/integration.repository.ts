import { CategoriesStatisticsEntity } from '@domain/database'
import { CategoriesDataModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Environment } from 'environment'
import { Repository } from 'typeorm'
import { TCategoriesListFilters } from '../../types/filters.types'

@Injectable()
export class CategoriesListRepository {
  constructor(
    @InjectRepository(CategoriesStatisticsEntity)
    private readonly repository: Repository<CategoriesStatisticsEntity>,
  ) {}

  public async count(): Promise<number> {
    const result = await this.repository.count()
    return result
  }

  public async getList(filters: TCategoriesListFilters): Promise<CategoriesDataModel[]> {
    const rows = await this.repository.find({
      select: [
        'category_id',
        'name',
        'brands',
        'products',
        'feedbacks',
      ],
      order: {
        products: 'DESC',
        feedbacks: 'DESC',
        category_id: 'ASC',
      },
      take: Environment.View.Size,
      skip: Environment.View.Size * (filters.page - 1),
    })

    const models = rows.map((row) => CategoriesDataModel.fromStatistic(row))
    return models
  }
}
