import { faker } from '@faker-js/faker'
import { TGroupsRecord } from './groups.types'

export class GroupsFactory {
  public static createOne(): TGroupsRecord {
    return {
      id: faker.string.ulid(),
      name: faker.person.fullName(),
      timestamp: faker.date.recent().getTime(),
    }
  }

  public static createMany(count?: number): TGroupsRecord[] {
    const records: TGroupsRecord[] = []

    const total = count ?? faker.number.int({ min: 10, max: 20 })
    for (let i = 0; i < total; i += 1) {
      const name = faker.person.fullName()

      const multiply = faker.number.int({ min: 2, max: 4 })
      for (let j = 0; j < multiply; j += 1) {
        records.push({
          id: faker.string.ulid(),
          name,
          timestamp: faker.date.recent().getTime(),
        })
      }
    }

    return records
  }
}
