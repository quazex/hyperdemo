import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { ProductsDataEntity } from './data.entity'

@Entity({
  name: 'products_images',
})
export class ProductsImagesEntity {
  @PrimaryColumn({ type: 'uuid' })
  public image_id: string

  @ManyToOne(() => ProductsDataEntity, (e) => e.images)
  @Index('products_images_product_index')
  @JoinColumn({ name: 'product_id' })
  public product: ProductsImagesEntity

  @Column({ type: 'text' })
  public small: string

  @Column({ type: 'text' })
  public regular: string

  @Column({ type: 'text' })
  public large: string

  @CreateDateColumn({ type: 'timestamptz', select: false })
  public created_at: Date
}
