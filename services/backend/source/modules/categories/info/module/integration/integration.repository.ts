import { CategoriesStatisticsEntity } from '@domain/database'
import { CategoriesDataModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TCategoriesInfoFilters } from '../../types/filter.types'

@Injectable()
export class CategoriesInfoRepository {
  constructor(
    @InjectRepository(CategoriesStatisticsEntity)
    private readonly repository: Repository<CategoriesStatisticsEntity>,
  ) {}

  public async getInfo(filters: TCategoriesInfoFilters): Promise<CategoriesDataModel | null> {
    const row = await this.repository.findOne({
      select: [
        'category_id',
        'name',
        'brands',
        'products',
        'feedbacks',
      ],
      where: {
        category_id: filters.category_id,
      },
    })

    if (row) {
      return CategoriesDataModel.fromStatistic(row)
    }

    return null
  }
}
