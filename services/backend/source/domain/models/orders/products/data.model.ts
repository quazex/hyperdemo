import { OrdersProductsEntity } from '@domain/database'
import { TOrdersProductsDataSchema, TProductsImageSchema } from '@domain/schemas'

export class OrdersProductsDataModel {
  #schema: TOrdersProductsDataSchema

  constructor(schema: TOrdersProductsDataSchema) {
    this.#schema = schema
  }

  public static fromEntity(entity: OrdersProductsEntity): OrdersProductsDataModel {
    return new OrdersProductsDataModel({
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
    })
  }

  public toSchema(): TOrdersProductsDataSchema {
    return this.#schema
  }
}
