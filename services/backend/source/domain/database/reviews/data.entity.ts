import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
} from 'typeorm';

@Entity({
    name: 'reviews_data',
})
export class ReviewsDataEntity {
    @PrimaryColumn({ type: 'uuid' })
    public id: string;

    @Column({ type: 'uuid' })
    public user_id: string;

    @Column({ type: 'uuid' })
    public product_id: string;

    @Column({ type: 'text' })
    public text: string;

    @Column({ type: 'int2' })
    public rating: number;

    @CreateDateColumn({ type: 'timestamp' })
    public created_at: Date;
}
