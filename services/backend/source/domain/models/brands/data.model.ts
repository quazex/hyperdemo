import { BrandsStatisticsEntity } from '@domain/database';
import { TBrandsDataSchema } from '@domain/schemas';

export class BrandsDataModel {
    #schema: TBrandsDataSchema;

    private constructor(schema: TBrandsDataSchema) {
        this.#schema = schema;
    }

    public static fromStatistic(entity: BrandsStatisticsEntity): BrandsDataModel {
        return new BrandsDataModel({
            brand_id: entity.brand_id,
            name: entity.name,
            products: entity.products,
            categories: entity.categories,
            feedbacks: entity.feedbacks,
        });
    }

    public toSchema(): TBrandsDataSchema {
        return this.#schema;
    }
}
