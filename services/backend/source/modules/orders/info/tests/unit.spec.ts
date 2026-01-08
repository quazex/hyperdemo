import { TOrdersDataSchema } from '@domain/schemas'
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { HttpStatus } from '@nestjs/common'
import { TestingUnitMock } from './unit.mock'

describe('Orders Info Unit', () => {
  const testingApp = new TestingUnitMock()

  beforeAll(testingApp.init.bind(testingApp))
  afterAll(testingApp.close.bind(testingApp))

  test('Success with correct query', async () => {
    const response = await testingApp.inject({
      method: 'GET',
      url: `/orders/${testingApp.entity.order_id}/info`,
    })
    const body = response.json() as TOrdersDataSchema

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(body.order_id).toBe(testingApp.entity.order_id)
  })
})
