import { OrdersStatisticsEntity } from '@domain/database'
import { TOrdersDataSchema } from '@domain/schemas'

export class OrdersDataModel {
  #schema: TOrdersDataSchema

  constructor(schema: TOrdersDataSchema) {
    this.#schema = schema
  }

  public static fromStatistic(entity: OrdersStatisticsEntity): OrdersDataModel {
    return new OrdersDataModel({
      order_id: entity.order_id,
      user_id: entity.user_id,
      status: entity.status,
      products: entity.products,
      revenue: Number(entity.revenue),
      created_at: entity.created_at.toISOString(),
      updated_at: entity.updated_at.toISOString(),
    })
  }

  public toSchema(): TOrdersDataSchema {
    return this.#schema
  }
}
