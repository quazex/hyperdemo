import { TCategoriesAnalyticsSchema } from '@domain/schemas'
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals'
import { HttpStatus } from '@nestjs/common'
import { DateTime } from 'luxon'
import { TestingUnitMock } from './unit.mock'

describe('Categories Analytics Unit', () => {
  const testingApp = new TestingUnitMock()

  beforeAll(testingApp.init.bind(testingApp))
  afterAll(testingApp.close.bind(testingApp))

  test('Bad request with empty query', async () => {
    const response = await testingApp.inject({
      method: 'GET',
      url: `/categories/${testingApp.category.category_id}/analytics`,
    })

    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST)
  })

  test('Success with correct query', async () => {
    const now = DateTime.utc()

    const response = await testingApp.inject({
      method: 'GET',
      url: `/categories/${testingApp.category.category_id}/analytics`,
      query: {
        date_from: now.startOf('month').toISO(),
        date_to: now.endOf('month').toISO(),
      },
    })
    const body = response.json() as TCategoriesAnalyticsSchema[]

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(body.length).toBe(testingApp.rows.length)
  })
})
