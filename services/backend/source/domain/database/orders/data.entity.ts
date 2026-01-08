import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity({
  name: 'orders_data',
})
export class OrdersDataEntity {
  @PrimaryColumn({ type: 'uuid' })
  public order_id: string

  @Column({ type: 'uuid' })
  public user_id: string

  @Column({ type: 'varchar', length: 100 })
  public status: string

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date
}
