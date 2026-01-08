import {
  Column,
  CreateDateColumn,
  DataSource,
  PrimaryColumn,
  UpdateDateColumn,
  ViewEntity,
} from 'typeorm'
import { TNestedBuilder } from '../types/nested.types'
import { OrdersDataEntity } from './data.entity'
import { OrdersProductsEntity } from './orders.entity'

@ViewEntity({
  name: 'orders_statistics',
  materialized: true,
  expression: (dataSource: DataSource) => {
    const nested: TNestedBuilder<OrdersProductsEntity> = (qb) => qb
      .select([
        'op.order_id AS order_id',
        'COUNT(op.product_id)::integer AS products',
        'SUM(op.quantity * op.price)::numeric(10, 2) AS revenue',
      ])
      .from(OrdersProductsEntity, 'op')
      .groupBy('order_id')

    return dataSource
      .createQueryBuilder()
      .select([
        'od.order_id AS order_id',
        'od.user_id AS user_id',
        'od.status AS status',
        'COALESCE(pa.products, 0) AS products',
        'COALESCE(pa.revenue, 0) AS revenue',
        'od.created_at AS created_at',
        'od.updated_at AS updated_at',
      ])
      .from(OrdersDataEntity, 'od')
      .leftJoin(nested, 'pa', 'pa.order_id = od.order_id')
  },
})
export class OrdersStatisticsEntity {
  @PrimaryColumn({ type: 'uuid' })
  public order_id: string

  @Column({ type: 'uuid' })
  public user_id: string

  @Column({ type: 'varchar', length: 100 })
  public status: string

  @Column({ type: 'int4' })
  public products: number

  @Column({ type: 'int4' })
  public revenue: number

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date
}
