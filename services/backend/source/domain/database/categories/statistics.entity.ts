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
import { CategoriesDataEntity } from './data.entity'

@ViewEntity({
  name: 'categories_statistics',
  materialized: true,
  expression: (dataSource: DataSource) => {
    const nested: TNestedBuilder<ProductsDataEntity> = (qb) => qb
      .select([
        'p.category_id AS category_id',
        'COUNT(p.product_id)::integer AS products',
        'COUNT(DISTINCT p.brand_id)::integer AS brands',
        'SUM(p.feedbacks)::integer AS feedbacks',
      ])
      .from(ProductsDataEntity, 'p')
      .groupBy('category_id')

    return dataSource
      .createQueryBuilder()
      .select([
        'b.category_id AS category_id',
        'b.name AS name',
        'COALESCE(pa.products, 0) AS products',
        'COALESCE(pa.brands, 0) AS brands',
        'COALESCE(pa.feedbacks, 0) AS feedbacks',
        'b.created_at AS created_at',
        'b.updated_at AS updated_at',
      ])
      .from(CategoriesDataEntity, 'b')
      .leftJoin(nested, 'pa', 'pa.category_id = b.category_id')
  },
})
export class CategoriesStatisticsEntity {
  @PrimaryColumn({ type: 'uuid' })
  public category_id: string

  @Column({ type: 'text' })
  public name: string

  @Column({ type: 'int4' })
  public products: number

  @Column({ type: 'int4' })
  public brands: number

  @Column({ type: 'int4' })
  public feedbacks: number

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date
}
