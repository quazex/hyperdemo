import { TCategoriesAnalyticsSchema, TCategoriesListSchema } from '@domain/schemas'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from '@jest/globals'

describe('Categories API (e2e)', () => {
  describe('GET /api/v1/categories/:category_id/analytics', () => {
    it('should return category analytics for valid category_id', async () => {
      const listResponse = await global.JEST_E2E.application.inject<TCategoriesListSchema>({
        method: 'GET',
        url: '/api/v1/categories/list?page=1',
      })

      const randomCategory = faker.helpers.arrayElement(listResponse.body.rows)

      const response = await global.JEST_E2E.application.inject<TCategoriesAnalyticsSchema[]>({
        method: 'GET',
        url: {
          pathname: `/api/v1/categories/${randomCategory.category_id}/analytics`,
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
