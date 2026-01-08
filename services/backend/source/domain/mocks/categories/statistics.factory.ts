import { type CategoriesStatisticsEntity } from '@domain/database'
import { faker } from '@faker-js/faker'

export class CategoriesStatisticsFactory {
  public static getOne(): CategoriesStatisticsEntity {
    const date = faker.date.recent()
    return {
      category_id: faker.string.uuid(),
      name: faker.company.name(),
      products: faker.number.int({ min: 100, max: 200 }),
      brands: faker.number.int({ min: 10, max: 20 }),
      feedbacks: faker.number.int({ min: 40, max: 80 }),
      created_at: date,
      updated_at: date,
    }
  }

  public static getMany(count = 1): CategoriesStatisticsEntity[] {
    const list: CategoriesStatisticsEntity[] = []

    const length = count ?? faker.number.int({ min: 10, max: 40 })
    for (let index = 0; index < length; index += 1) {
      list[index] = this.getOne()
    }

    return list
  }
}
