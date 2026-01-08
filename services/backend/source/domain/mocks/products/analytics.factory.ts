import { type ProductsAnalyticsEntity } from '@domain/database'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export class ProductsAnalyticsFactory {
  public static getMany(): ProductsAnalyticsEntity[] {
    const list: ProductsAnalyticsEntity[] = []

    const DAYS_COUNT = 30
    const product = faker.string.uuid()
    const first = DateTime.utc()

    for (let index = 0; index < DAYS_COUNT; index += 1) {
      list.push({
        product_id: product,
        revenue: faker.number.float({ min: 100, max: 200, fractionDigits: 2 }),
        date: first.plus({ days: index }).toISODate(),
      })
    }

    return list
  }
}
