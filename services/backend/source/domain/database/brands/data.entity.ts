import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'brands_data',
})
export class BrandsDataEntity {
  @PrimaryColumn({ type: 'uuid' })
  public brand_id: string

  @Column({ type: 'text' })
  public name: string

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date
}
