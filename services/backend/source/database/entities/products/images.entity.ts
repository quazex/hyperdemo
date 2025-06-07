import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
    name: 'products_images',
})
export class ProductsImagesEntity {
    @PrimaryColumn({ type: 'uuid' })
    image_id: string;

    @Index('products_images_product_index')
    @Column({ type: 'uuid' })
    product_id: string;

    @Column({ type: 'text' })
    small: string;

    @Column({ type: 'text' })
    regular: string;

    @Column({ type: 'text' })
    large: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
