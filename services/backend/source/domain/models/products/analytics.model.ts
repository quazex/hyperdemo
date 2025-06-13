import { ProductsAnalyticsEntity } from '@domain/database';
import { TProductsAnalyticsSchema } from '@domain/schemas';

export class ProductsAnalyticsModel {
    #schema: TProductsAnalyticsSchema;

    private constructor(schema: TProductsAnalyticsSchema) {
        this.#schema = schema;
    }

    public static fromEntity(entity: ProductsAnalyticsEntity) {
        return new ProductsAnalyticsModel({
            revenue: entity.revenue,
            date: entity.date,
        });
    }

    public toSchema(): TProductsAnalyticsSchema {
        return this.#schema;
    }
}
