import { OrdersProductsEntity } from '@domain/database';
import { TOrdersProductsSchema, TProductsImageSchema } from '@domain/schemas';

export class OrdersProductsModel {
    #schema: TOrdersProductsSchema;

    private constructor(schema: TOrdersProductsSchema) {
        this.#schema = schema;
    }

    public static fromEntity(entity: OrdersProductsEntity) {
        return new OrdersProductsModel({
            product_id: entity.product_id,
            name: entity.product.name,
            description: entity.product.description,
            images: entity.product.images.map<TProductsImageSchema>((img) => ({
                id: img.image_id,
                small: img.small,
                regular: img.regular,
                large: img.large,
            })),
            brand: {
                id: entity.product.brand.brand_id,
                name: entity.product.brand.name,
            },
            category: {
                id: entity.product.category.category_id,
                name: entity.product.category.name,
            },
            price: Number(entity.price),
            quantity: entity.quantity,
        });
    }

    public toSchema(): TOrdersProductsSchema {
        return this.#schema;
    }
}
