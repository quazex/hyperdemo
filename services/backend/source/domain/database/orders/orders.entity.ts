import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { ProductsDataEntity } from '../products/data.entity'

@Entity({
  name: 'orders_products',
})
export class OrdersProductsEntity {
  @PrimaryColumn({ type: 'uuid' })
  public order_id: string

  @PrimaryColumn({ type: 'uuid' })
  public product_id: string

  @Column({ type: 'int4' })
  public quantity: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public price: number

  @OneToOne(() => ProductsDataEntity, (e) => e.product_id)
  @JoinColumn({ name: 'product_id' })
  public product: ProductsDataEntity

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date
}
