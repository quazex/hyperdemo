import { TProductsAnalyticsSchema, TProductsListSchema } from '@domain/schemas'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from '@jest/globals'

describe('Products API (e2e)', () => {
  describe('GET /api/v1/products/:product_id/analytics', () => {
    it('should return product analytics for valid product_id', async () => {
      const listResponse = await global.JEST_E2E.application.inject<TProductsListSchema>({
        method: 'GET',
        url: '/api/v1/products/list?page=1',
      })

      const randomProduct = faker.helpers.arrayElement(listResponse.body.rows)

      const response = await global.JEST_E2E.application.inject<TProductsAnalyticsSchema[]>({
        method: 'GET',
        url: {
          pathname: `/api/v1/products/${randomProduct.product_id}/analytics`,
          query: {
            date_from: '2024-07-01',
            date_to: '2024-07-31',
          },
        },
      })

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body.length).toBeGreaterThan(0)

      const firstRow = response.body.at(0)

      expect(firstRow).toHaveProperty('revenue')
      expect(firstRow).toHaveProperty('date')
    })
  })
})
