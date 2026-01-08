import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'
import { BrandsDataEntity } from '../brands/data.entity'
import { CategoriesDataEntity } from '../categories/data.entity'
import { ReviewsDataEntity } from '../reviews/data.entity'
import { ProductsImagesEntity } from './images.entity'

@Entity({
  name: 'products_data',
})
export class ProductsDataEntity {
  @PrimaryColumn({ type: 'uuid' })
  public product_id: string

  @Column({ type: 'text' })
  public name: string

  @Column({ type: 'text' })
  public description: string

  @OneToMany(() => ProductsImagesEntity, (e) => e.product)
  public images: ProductsImagesEntity[]

  @ManyToOne(() => BrandsDataEntity, (e) => e.brand_id, { nullable: false })
  @JoinColumn({ name: 'brand_id' })
  public brand: BrandsDataEntity

  @ManyToOne(() => CategoriesDataEntity, (e) => e.category_id, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  public category: CategoriesDataEntity

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public price: number

  @OneToMany(() => ReviewsDataEntity, (e) => e.product)
  public reviews: ReviewsDataEntity[]

  @Column({ type: 'int4' })
  public feedbacks: number

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date
}
