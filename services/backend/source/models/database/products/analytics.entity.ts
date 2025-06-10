import {
    Column,
    DataSource,
    PrimaryColumn,
    ViewEntity,
    UpdateDateColumn,
} from 'typeorm';
import { ProductsOrdersEntity } from './orders.entity';

@ViewEntity({
    name: 'products_analytics',
    materialized: true,
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select([
            'po.product_id AS product_id',
            'COALESCE(SUM(po.quantity * po.price), 0)::INT AS revenue',
            'po.created_at::DATE AS date',
        ])
        .from(ProductsOrdersEntity, 'po')
        .groupBy('product_id')
        .addGroupBy('date'),
})
export class ProductsAnalyticsEntity {
    @PrimaryColumn({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'int4' })
    revenue: number;

    @UpdateDateColumn({ type: 'date' })
    date: string;
}
