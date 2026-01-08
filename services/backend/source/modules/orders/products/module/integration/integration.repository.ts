import { OrdersProductsEntity } from '@domain/database'
import { OrdersProductsDataModel } from '@domain/models'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Environment } from 'environment'
import { Repository } from 'typeorm'
import { TOrdersProductsFilters } from '../../types/filters.types'

@Injectable()
export class OrdersProductsRepository {
  constructor(
    @InjectRepository(OrdersProductsEntity) private readonly productsRepository: Repository<OrdersProductsEntity>,
    @InjectRepository(OrdersProductsEntity) private readonly ordersRepository: Repository<OrdersProductsEntity>,
  ) {}

  public async isOrderExists(orderId: string): Promise<boolean> {
    const count = await this.ordersRepository.countBy({
      order_id: orderId,
    })
    return count > 0
  }

  public async count(orderId: string): Promise<number> {
    const result = await this.productsRepository.countBy({
      order_id: orderId,
    })
    return result
  }

  public async getList(filters: TOrdersProductsFilters): Promise<OrdersProductsDataModel[]> {
    const rows = await this.productsRepository.find({
      where: {
        order_id: filters.order_id,
      },
      order: {
        order_id: 'ASC',
        product_id: 'ASC',
      },
      relations: [
        'product',
        'product.brand',
        'product.category',
        'product.images',
      ],
      take: Environment.View.Size,
      skip: Environment.View.Size * (filters.page - 1),
    })

    const models = rows.map((row) => OrdersProductsDataModel.fromEntity(row))
    return models
  }
}
