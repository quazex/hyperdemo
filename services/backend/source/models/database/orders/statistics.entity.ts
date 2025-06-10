import {
    Column,
    CreateDateColumn,
    DataSource,
    PrimaryColumn,
    SelectQueryBuilder,
    UpdateDateColumn,
    ViewEntity,
} from 'typeorm';
import { ProductsOrdersEntity } from '../products/orders.entity';
import { OrdersDataEntity } from './data.entity';

@ViewEntity({
    name: 'orders_statistics',
    materialized: true,
    expression: (dataSource: DataSource) => {
        const nested = (qb: SelectQueryBuilder<ProductsOrdersEntity>) => qb
            .select([
                'po.order_id AS order_id',
                'COUNT(po.product_id)::INT AS products',
                'SUM(po.quantity * po.price)::INT AS revenue',
            ])
            .from(ProductsOrdersEntity, 'po')
            .groupBy('order_id');

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
            .leftJoin(nested, 'pa', 'pa.order_id = od.order_id');
    },
})
export class OrdersStatisticsEntity {
    @PrimaryColumn({ type: 'uuid' })
    order_id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'varchar', length: 100 })
    status: string;

    @Column({ type: 'int4' })
    products: number;

    @Column({ type: 'int4' })
    revenue: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
