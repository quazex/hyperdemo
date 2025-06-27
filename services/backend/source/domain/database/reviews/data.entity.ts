import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { ProductsDataEntity } from '../products/data.entity';

@Entity({
    name: 'reviews_data',
})
export class ReviewsDataEntity {
    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Index('reviews_user_id_index')
    @Column({ type: 'uuid' })
    user_id: string;

    @Index('reviews_product_id_index')
    @Column({ type: 'uuid' })
    product_id: string;

    @ManyToOne(() => ProductsDataEntity, (e) => e.reviews)
    @Index('reviews_product_id_index')
    @JoinColumn({ name: 'product_id' })
    product: ProductsDataEntity;

    @Column({ type: 'text' })
    text: string;

    @Column({ type: 'int2' })
    rating: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
