import {
    Column,
    DataSource,
    PrimaryColumn,
    ViewEntity,
    UpdateDateColumn,
} from 'typeorm';
import { ProductsDataEntity } from '../products/data.entity';
import { ProductsOrdersEntity } from '../products/orders.entity';

@ViewEntity({
    name: 'categories_analytics',
    materialized: true,
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select([
            'p.category_id AS category_id',
            'COALESCE(SUM(po.quantity * po.price), 0)::numeric(10, 2) AS revenue',
            'po.created_at::DATE AS date',
        ])
        .from(ProductsDataEntity, 'p')
        .leftJoin(ProductsOrdersEntity, 'po', 'po.product_id = p.product_id')
        .groupBy('category_id')
        .addGroupBy('date'),
})
export class CategoriesAnalyticsEntity {
    @PrimaryColumn({ type: 'uuid' })
    category_id: string;

    @Column({ type: 'int4' })
    revenue: number;

    @UpdateDateColumn({ type: 'date' })
    date: string;
}
