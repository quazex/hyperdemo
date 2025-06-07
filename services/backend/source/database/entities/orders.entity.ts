import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { ProductsDataEntity } from './products/data.entity';
import { ProductsOrdersEntity } from './products/orders.entity';

@Entity({
    name: 'orders_data',
})
export class OrdersDataEntity {
    @PrimaryColumn({ type: 'uuid' })
    order_id: string;

    @Column({ type: 'uuid' })
    user_id: string;

    @Column({ type: 'varchar', length: 100 })
    status: string;

    @OneToMany(() => ProductsOrdersEntity, (e) => e.order_id)
    products: ProductsDataEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
