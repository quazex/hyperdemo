import { ProductsDataEntity } from '@domain/database';
import { TProductsDataSchema, TProductsImageSchema } from '@domain/schemas';

export class ProductsDataModel {
    #schema: TProductsDataSchema;

    private constructor(schema: TProductsDataSchema) {
        this.#schema = schema;
    }

    public static fromEntity(entity: ProductsDataEntity) {
        return new ProductsDataModel({
            product_id: entity.product_id,
            name: entity.name,
            description: entity.description,
            images: entity.images.map<TProductsImageSchema>((img) => ({
                id: img.image_id,
                small: img.small,
                regular: img.regular,
                large: img.large,
            })),
            brand: {
                id: entity.brand.brand_id,
                name: entity.brand.name,
            },
            category: {
                id: entity.category.category_id,
                name: entity.category.name,
            },
            price: Number(entity.price),
            feedbacks: entity.feedbacks,
        });
    }

    public toSchema(): TProductsDataSchema {
        return this.#schema;
    }
}
