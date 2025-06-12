import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
    name: 'brands_data',
})
export class BrandsDataEntity {
    @PrimaryColumn({ type: 'uuid' })
    brand_id: string;

    @Column({ type: 'text' })
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
