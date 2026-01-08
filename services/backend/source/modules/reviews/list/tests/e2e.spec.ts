import { TProductsListSchema, TReviewsDataSchema, TReviewsListSchema } from '@domain/schemas'
import { faker } from '@faker-js/faker'
import { describe, expect, it } from '@jest/globals'
import { HttpStatus } from '@nestjs/common'

describe('Reviews List API (e2e)', () => {
  describe('GET /api/v1/reviews/:product_id/list', () => {
    it('should return reviews list for product_id', async () => {
      //
      // Получаем список товаров для случайного выбора
      //
      const productsResponse = await global.JEST_E2E.application.inject<TProductsListSchema>({
        method: 'GET',
        url: '/api/v1/products/list?page=1',
      })

      expect(productsResponse.statusCode).toBe(HttpStatus.OK)
      expect(productsResponse.body.rows.length).toBeGreaterThan(0)

      const reviewProduct = faker.helpers.arrayElement(productsResponse.body.rows)

      //
      // Создаем первый комментарий
      //
      const firstResponse = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
        method: 'POST',
        url: `/api/v1/reviews/${reviewProduct.product_id}/create`,
        payload: {
          text: faker.lorem.sentences(1),
          rating: faker.number.int({ min: 1, max: 5 }),
        },
      })

      expect(firstResponse.statusCode).toBe(HttpStatus.CREATED)

      //
      // Создаем второй комментарий
      //
      const secondResponse = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
        method: 'POST',
        url: `/api/v1/reviews/${reviewProduct.product_id}/create`,
        payload: {
          text: faker.lorem.sentences(1),
          rating: faker.number.int({ min: 1, max: 5 }),
        },
      })

      expect(secondResponse.statusCode).toBe(HttpStatus.CREATED)

      //
      // Получаем список комментариев
      //
      const reviewsResponse = await global.JEST_E2E.application.inject<TReviewsListSchema>({
        method: 'GET',
        url: `/api/v1/reviews/${reviewProduct.product_id}/list`,
        query: {
          page: '1',
        },
      })

      expect(reviewsResponse.statusCode).toBe(HttpStatus.OK)
      expect(reviewsResponse.body.rows.length).toBeGreaterThan(0)
    })

    it('should return 404 list for fake product', async () => {
      const productId = faker.string.uuid()

      const response = await global.JEST_E2E.application.inject<TReviewsListSchema>({
        method: 'GET',
        url: `/api/v1/reviews/${productId}/list`,
        query: {
          page: '1',
        },
      })

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND)
    })
  })
})
