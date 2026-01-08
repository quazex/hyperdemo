import { type OrdersProductsEntity } from '@domain/database'
import { faker } from '@faker-js/faker'
import { ProductsDataFactory } from '../products/data.factory'

export class OrdersProductsFactory {
  public static getOne(): OrdersProductsEntity {
    const product = ProductsDataFactory.getOne()

    return {
      order_id: faker.string.uuid(),
      product_id: product.product_id,
      quantity: faker.number.int({ min: 2, max: 10 }),
      price: faker.number.float({ min: 10, max: 20, fractionDigits: 2 }),
      product,
      created_at: faker.date.recent(),
    }
  }

  public static getMany(count = 1): OrdersProductsEntity[] {
    const list: OrdersProductsEntity[] = []

    const length = count ?? faker.number.int({ min: 10, max: 40 })
    for (let index = 0; index < length; index += 1) {
      list[index] = this.getOne()
    }

    return list
  }
}
