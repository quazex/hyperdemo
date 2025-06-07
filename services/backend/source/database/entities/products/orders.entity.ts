import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { OrdersDataEntity } from '../orders.entity';
import { ProductsDataEntity } from './data.entity';

@Entity({
    name: 'products_orders',
})
export class ProductsOrdersEntity {
    @PrimaryColumn({ type: 'uuid' })
    order_id: string;

    @PrimaryColumn({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'int4' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => OrdersDataEntity, (e) => e.order_id)
    @JoinColumn({ name: 'order_id' })
    order: OrdersDataEntity;

    @ManyToOne(() => ProductsDataEntity, (e) => e.product_id)
    @JoinColumn({ name: 'product_id' })
    product: ProductsDataEntity;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
