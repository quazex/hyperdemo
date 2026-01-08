import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { ProductsDataEntity } from '../products/data.entity'

@Entity({
  name: 'reviews_data',
})
export class ReviewsDataEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id: string

  @Index('reviews_user_id_index')
  @Column({ type: 'uuid' })
  public user_id: string

  @Index('reviews_product_id_index')
  @Column({ type: 'uuid' })
  public product_id: string

  @ManyToOne(() => ProductsDataEntity, (e) => e.reviews)
  @Index('reviews_product_id_index')
  @JoinColumn({ name: 'product_id' })
  public product: ProductsDataEntity

  @Column({ type: 'text' })
  public text: string

  @Column({ type: 'int2' })
  public rating: number

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date
}
