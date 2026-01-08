import { OrdersDataModel } from '@domain/models'
import { HttpStatus, Injectable } from '@nestjs/common'
import { AppError } from '@shared/errors'
import { TOrdersInfoFilters } from '../../types/filters.types'
import { OrdersInfoRepository } from '../integration/integration.repository'

@Injectable()
export class OrdersInfoService {
  constructor(private readonly repository: OrdersInfoRepository) {}

  public async getInfo(filters: TOrdersInfoFilters): Promise<OrdersDataModel> {
    const model = await this.repository.getOne(filters)
    if (!model) {
      throw new AppError({
        message: 'Cannot find order',
        status: HttpStatus.NOT_FOUND,
        context: filters,
      })
    }
    return model
  }
}
