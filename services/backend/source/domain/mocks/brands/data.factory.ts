import { type BrandsDataEntity } from '@domain/database'
import { faker } from '@faker-js/faker'

export class BrandsDataFactory {
  public static getOne(): BrandsDataEntity {
    const date = faker.date.recent()
    return {
      brand_id: faker.string.uuid(),
      name: faker.company.name(),
      created_at: date,
      updated_at: date,
    }
  }

  public static getMany(count = 1): BrandsDataEntity[] {
    const list: BrandsDataEntity[] = []

    const length = count ?? faker.number.int({ min: 10, max: 40 })
    for (let index = 0; index < length; index += 1) {
      list[index] = this.getOne()
    }

    return list
  }
}
