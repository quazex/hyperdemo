import { OrdersStatisticsEntity } from '@domain/database'
import { OrdersDataModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Environment } from 'environment'
import { Repository } from 'typeorm'
import { TOrdersListFilters } from '../../types/filters.types'

@Injectable()
export class OrdersListRepository {
  constructor(
    @InjectRepository(OrdersStatisticsEntity)
    private readonly repository: Repository<OrdersStatisticsEntity>,
  ) {}

  public async count(): Promise<number> {
    const result = await this.repository.count()
    return result
  }

  public async getList(filters: TOrdersListFilters): Promise<OrdersDataModel[]> {
    const rows = await this.repository.find({
      select: [
        'order_id',
        'user_id',
        'status',
        'products',
        'revenue',
        'created_at',
        'updated_at',
      ],
      order: {
        created_at: 'DESC',
      },
      take: Environment.View.Size,
      skip: Environment.View.Size * (filters.page - 1),
    })

    const models = rows.map((row) => OrdersDataModel.fromStatistic(row))
    return models
  }
}
