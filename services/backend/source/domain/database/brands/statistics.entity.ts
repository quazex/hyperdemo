import {
  Column,
  CreateDateColumn,
  DataSource,
  PrimaryColumn,
  UpdateDateColumn,
  ViewEntity,
} from 'typeorm'
import { ProductsDataEntity } from '../products/data.entity'
import { TNestedBuilder } from '../types/nested.types'
import { BrandsDataEntity } from './data.entity'

@ViewEntity({
  name: 'brands_statistics',
  materialized: true,
  expression: (dataSource: DataSource) => {
    const nested: TNestedBuilder<ProductsDataEntity> = (qb) => qb
      .select([
        'p.brand_id AS brand_id',
        'COUNT(p.product_id) AS products',
        'COUNT(DISTINCT p.category_id) AS categories',
        'sum(p.feedbacks) AS feedbacks',
      ])
      .from(ProductsDataEntity, 'p')
      .groupBy('brand_id')

    return dataSource
      .createQueryBuilder()
      .select([
        'b.brand_id AS brand_id',
        'b.name AS name',
        'COALESCE(pa.products, 0)::integer AS products',
        'COALESCE(pa.categories, 0)::integer AS categories',
        'COALESCE(pa.feedbacks, 0)::integer AS feedbacks',
        'b.created_at AS created_at',
        'b.updated_at AS updated_at',
      ])
      .from(BrandsDataEntity, 'b')
      .leftJoin(nested, 'pa', 'pa.brand_id = b.brand_id')
  },
})
export class BrandsStatisticsEntity {
  @PrimaryColumn({ type: 'uuid' })
  public brand_id: string

  @Column({ type: 'text' })
  public name: string

  @Column({ type: 'int4' })
  public products: number

  @Column({ type: 'int4' })
  public categories: number

  @Column({ type: 'int4' })
  public feedbacks: number

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date
}
