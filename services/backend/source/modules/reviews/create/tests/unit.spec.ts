import { faker } from '@faker-js/faker'
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { HttpStatus } from '@nestjs/common'
import { TestingUnitMock } from './unit.mock'

describe('Reviews Create Unit', () => {
  const testingApp = new TestingUnitMock()

  beforeAll(testingApp.init.bind(testingApp))
  afterAll(testingApp.close.bind(testingApp))

  test('Success with correct body', async () => {
    const productId = faker.string.uuid()

    const response = await testingApp.inject({
      method: 'POST',
      url: `/reviews/${productId}/create`,
      payload: {
        text: faker.lorem.sentence(),
        rating: faker.number.int({ min: 1, max: 5 }),
      },
    })

    expect(response.statusCode).toBe(HttpStatus.CREATED)
  })
})
