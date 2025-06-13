import { CategoriesStatisticsEntity } from '@domain/database';
import { TCategoriesDataSchema } from '@domain/schemas';

export class CategoriesDataModel {
    #schema: TCategoriesDataSchema;

    private constructor(schema: TCategoriesDataSchema) {
        this.#schema = schema;
    }

    public static fromStatistic(entity: CategoriesStatisticsEntity) {
        return new CategoriesDataModel({
            category_id: entity.category_id,
            name: entity.name,
            products: entity.products,
            brands: entity.brands,
            feedbacks: entity.feedbacks,
        });
    }

    public toSchema(): TCategoriesDataSchema {
        return this.#schema;
    }
}
