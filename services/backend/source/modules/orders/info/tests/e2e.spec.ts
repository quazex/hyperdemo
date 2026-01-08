import { TOrdersDataSchema, TOrdersListSchema } from '@domain/schemas'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from '@jest/globals'

describe('Orders API (e2e)', () => {
  describe('GET /api/v1/orders/:order_id/info', () => {
    it('should return order info for valid order_id', async () => {
      const listResponse = await global.JEST_E2E.application.inject<TOrdersListSchema>({
        method: 'GET',
        url: '/api/v1/orders/list?page=1',
      })

      const randomOrder = faker.helpers.arrayElement(listResponse.body.rows)

      const response = await global.JEST_E2E.application.inject<TOrdersDataSchema>({
        method: 'GET',
        url: `/api/v1/orders/${randomOrder.order_id}/info`,
      })

      expect(response.statusCode).toBe(200)

      expect(response.body.order_id).toBe(randomOrder.order_id)
      expect(response.body.user_id).toBe(randomOrder.user_id)
      expect(response.body.status).toBe(randomOrder.status)
      expect(response.body.products).toBe(randomOrder.products)
      expect(response.body.revenue).toBe(randomOrder.revenue)
      expect(response.body.created_at).toBe(randomOrder.created_at)
      expect(response.body.updated_at).toBe(randomOrder.updated_at)
    })

    it('should return 404 for invalid order_id', async () => {
      const invalidOrderId = '00000000-0000-0000-0000-000000000000'

      const response = await global.JEST_E2E.application.inject<TOrdersDataSchema>({
        method: 'GET',
        url: `/api/v1/orders/${invalidOrderId}/info`,
      })

      expect(response.statusCode).toBe(404)
    })
  })
})
