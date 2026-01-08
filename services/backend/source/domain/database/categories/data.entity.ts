import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'categories_data',
})
export class CategoriesDataEntity {
  @PrimaryColumn({ type: 'uuid' })
  public category_id: string

  @Column({ type: 'text' })
  public name: string

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date
}
