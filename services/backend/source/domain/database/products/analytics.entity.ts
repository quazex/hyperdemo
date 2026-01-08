import {
  Column,
  DataSource,
  PrimaryColumn,
  ViewEntity,
  UpdateDateColumn,
} from 'typeorm'
import { OrdersProductsEntity } from '../orders/orders.entity'

@ViewEntity({
  name: 'products_analytics',
  materialized: true,
  expression: (dataSource: DataSource) => dataSource
    .createQueryBuilder()
    .select([
      'op.product_id AS product_id',
      'COALESCE(SUM(op.quantity * op.price), 0)::numeric(10, 2) AS revenue',
      'op.created_at::DATE AS date',
    ])
    .from(OrdersProductsEntity, 'op')
    .groupBy('product_id')
    .addGroupBy('date'),
})
export class ProductsAnalyticsEntity {
  @PrimaryColumn({ type: 'uuid' })
  public product_id: string

  @Column({ type: 'int4' })
  public revenue: number

  @UpdateDateColumn({ type: 'date' })
  public date: string
}
