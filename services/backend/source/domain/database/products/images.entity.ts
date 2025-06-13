import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductsDataEntity } from './data.entity';

@Entity({
    name: 'products_images',
})
export class ProductsImagesEntity {
    @PrimaryColumn({ type: 'uuid' })
    image_id: string;

    @ManyToOne(() => ProductsDataEntity, (e) => e.images)
    @Index('products_images_product_index')
    @JoinColumn({ name: 'product_id' })
    product: ProductsImagesEntity[];

    @Column({ type: 'text' })
    small: string;

    @Column({ type: 'text' })
    regular: string;

    @Column({ type: 'text' })
    large: string;

    @CreateDateColumn({ type: 'timestamp', select: false })
    created_at: Date;
}
