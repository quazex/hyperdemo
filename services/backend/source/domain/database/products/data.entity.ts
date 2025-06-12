import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BrandsDataEntity } from '../brands/data.entity';
import { CategoriesDataEntity } from '../categories/data.entity';
import { ProductsImagesEntity } from './images.entity';

@Entity({
    name: 'products_data',
})
export class ProductsDataEntity {
    @PrimaryColumn({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => ProductsImagesEntity, (e) => e.product)
    images: ProductsImagesEntity[];

    @ManyToOne(() => BrandsDataEntity, (e) => e.brand_id, { nullable: false })
    @JoinColumn({ name: 'brand_id' })
    brand: BrandsDataEntity;

    @Column({ type: 'uuid', select: false })
    brand_id: string;

    @ManyToOne(() => CategoriesDataEntity, (e) => e.category_id, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: CategoriesDataEntity;

    @Column({ type: 'uuid', select: false })
    category_id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int4' })
    feedbacks: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
