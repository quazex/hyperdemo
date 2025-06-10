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
    name: 'brands_analytics',
    materialized: true,
    expression: (dataSource: DataSource) => dataSource
        .createQueryBuilder()
        .select([
            'p.brand_id AS brand_id',
            'COALESCE(sum(po.quantity * po.price), 0) AS revenue',
            'po.created_at::DATE AS date',
        ])
        .from(ProductsDataEntity, 'p')
        .leftJoin(ProductsOrdersEntity, 'po', 'po.product_id = p.product_id')
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
