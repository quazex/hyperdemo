import {
    Column,
    CreateDateColumn,
    DataSource,
    PrimaryColumn,
    SelectQueryBuilder,
    UpdateDateColumn,
    ViewEntity,
} from 'typeorm';
import { ProductsDataEntity } from '../products/data.entity';
import { CategoriesDataEntity } from './data.entity';

@ViewEntity({
    name: 'categories_statistics',
    materialized: true,
    expression: (dataSource: DataSource) => {
        const nested = (qb: SelectQueryBuilder<ProductsDataEntity>) => qb
            .select([
                'p.category_id AS category_id',
                'COUNT(p.product_id)::integer AS products',
                'COUNT(DISTINCT p.brand_id)::integer AS brands',
                'SUM(p.feedbacks)::integer AS feedbacks',
            ])
            .from(ProductsDataEntity, 'p')
            .groupBy('category_id');

        return dataSource
            .createQueryBuilder()
            .select([
                'b.category_id AS category_id',
                'b.name AS name',
                'COALESCE(pa.products, 0) AS products',
                'COALESCE(pa.brands, 0) AS brands',
                'COALESCE(pa.feedbacks, 0) AS feedbacks',
                'b.created_at AS created_at',
                'b.updated_at AS updated_at',
            ])
            .from(CategoriesDataEntity, 'b')
            .leftJoin(nested, 'pa', 'pa.category_id = b.category_id');
    },
})
export class CategoriesStatisticsEntity {
    @PrimaryColumn({ type: 'uuid' })
    category_id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'int4' })
    products: number;

    @Column({ type: 'int4' })
    brands: number;

    @Column({ type: 'int4' })
    feedbacks: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
