import { type OrdersStatisticsEntity } from '@domain/database'
import { faker } from '@faker-js/faker'

export class OrdersStatisticsFactory {
  public static getOne(): OrdersStatisticsEntity {
    const date = faker.date.recent()
    return {
      order_id: faker.string.uuid(),
      user_id: faker.string.uuid(),
      status: 'completed',
      products: faker.number.int({ min: 2, max: 10 }),
      revenue: faker.number.float({ min: 100, max: 200, fractionDigits: 2 }),
      created_at: date,
      updated_at: date,
    }
  }

  public static getMany(count = 1): OrdersStatisticsEntity[] {
    const list: OrdersStatisticsEntity[] = []

    const length = count ?? faker.number.int({ min: 10, max: 40 })
    for (let index = 0; index < length; index += 1) {
      list[index] = this.getOne()
    }

    return list
  }
}
