import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity({
    name: 'categories_data',
})
export class CategoriesDataEntity {
    @PrimaryColumn({ type: 'uuid' })
    category_id: string;

    @Column({ type: 'text' })
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
