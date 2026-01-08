import { OrdersProductsListModel } from '@domain/models'
import { TOrdersProductsListSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'
import { plainToInstance, Type } from 'class-transformer'
import { OrdersProductsDataRes } from './data.response'

export class OrdersProductsListRes implements TOrdersProductsListSchema {
  @ApiProperty({ minimum: 0 })
  public total: number

  @ApiProperty({ minimum: 0 })
  public pages: number

  @Type(() => OrdersProductsDataRes)
  public rows: OrdersProductsDataRes[]

  public static init(model: OrdersProductsListModel): OrdersProductsListRes {
    const schema = model.toSchema()
    return plainToInstance(OrdersProductsListRes, schema)
  }
}
