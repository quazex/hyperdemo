import {
    Column,
    DataSource,
    PrimaryColumn,
    ViewEntity,
    UpdateDateColumn,
} from 'typeorm';
import { OrdersProductsEntity } from '../orders/orders.entity';
import { ProductsDataEntity } from '../products/data.entity';

@ViewEntity({
    name: 'brands_analytics',
    materialized: true,
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select([
            'p.brand_id AS brand_id',
            'COALESCE(SUM(op.quantity * op.price), 0)::numeric(10, 2) AS revenue',
            'op.created_at::DATE AS date',
        ])
        .from(ProductsDataEntity, 'p')
        .leftJoin(OrdersProductsEntity, 'op', 'op.product_id = p.product_id')
        .groupBy('brand_id')
        .addGroupBy('date'),
})
export class BrandsAnalyticsEntity {
    @PrimaryColumn({ type: 'uuid' })
    brand_id: string;

    @Column({ type: 'int4' })
    revenue: number;

    @UpdateDateColumn({ type: 'date' })
    date: string;
}
