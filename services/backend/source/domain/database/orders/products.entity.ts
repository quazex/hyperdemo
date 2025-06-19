import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ProductsDataEntity } from '../products/data.entity';

@Entity({
    name: 'orders_products',
})
export class OrdersProductsEntity {
    @PrimaryColumn({ type: 'uuid' })
    order_id: string;

    @PrimaryColumn({ type: 'uuid', select: false })
    product_id: string;

    @Column({ type: 'int4' })
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @OneToOne(() => ProductsDataEntity, (e) => e.product_id)
    @JoinColumn({ name: 'product_id' })
    product: ProductsDataEntity;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
