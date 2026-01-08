import { TReviewsListSchema } from '@domain/schemas'
import { faker } from '@faker-js/faker'
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { HttpStatus } from '@nestjs/common'
import { TestingUnitMock } from './unit.mock'

describe('Reviews List Unit', () => {
  const testingApp = new TestingUnitMock()

  beforeAll(testingApp.init.bind(testingApp))
  afterAll(testingApp.close.bind(testingApp))

  test('Success with correct query', async () => {
    const random = faker.helpers.arrayElement(testingApp.entities)

    const response = await testingApp.inject({
      method: 'GET',
      url: `/reviews/${random.product_id}/list`,
      query: {
        page: '1',
      },
    })

    const body = response.json() as TReviewsListSchema

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(body.rows).toHaveLength(testingApp.entities.length)
  })
})
