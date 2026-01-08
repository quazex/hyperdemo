import { OrdersListModel } from '@domain/models'
import { TOrdersListSchema } from '@domain/schemas'
import { ApiProperty } from '@nestjs/swagger'
import { plainToInstance, Type } from 'class-transformer'
import { OrdersDataRes } from './data.response'

export class OrdersListRes implements TOrdersListSchema {
  @ApiProperty({ minimum: 0 })
  public total: number

  @ApiProperty({ minimum: 0 })
  public pages: number

  @Type(() => OrdersDataRes)
  public rows: OrdersDataRes[]

  public static init(model: OrdersListModel): OrdersListRes {
    const schema = model.toSchema()
    return plainToInstance(OrdersListRes, schema)
  }
}
