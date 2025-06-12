import { CategoriesAnalyticsEntity } from '@domain/database';
import { TCategoriesAnalyticsSchema } from '@domain/schemas';

export class CategoriesAnalyticsModel {
    #schema: TCategoriesAnalyticsSchema;

    private constructor(schema: TCategoriesAnalyticsSchema) {
        this.#schema = schema;
    }

    public static fromEntity(entity: CategoriesAnalyticsEntity) {
        return new CategoriesAnalyticsModel({
            revenue: entity.revenue,
            date: entity.date,
        });
    }

    public toSchema(): TCategoriesAnalyticsSchema {
        return this.#schema;
    }
}
