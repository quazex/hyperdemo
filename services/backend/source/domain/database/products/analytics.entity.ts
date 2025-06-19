import {
    Column,
    DataSource,
    PrimaryColumn,
    ViewEntity,
    UpdateDateColumn,
} from 'typeorm';
import { OrdersProductsEntity } from '../orders/products.entity';

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
    product_id: string;

    @Column({ type: 'int4' })
    revenue: number;

    @UpdateDateColumn({ type: 'date' })
    date: string;
}
