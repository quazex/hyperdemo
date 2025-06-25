import { TProductsListSchema, TReviewsDataSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';

describe('Reviews Create API (e2e)', () => {
    describe('POST /api/v1/reviews/:product_id/create', () => {
        it('should create a new review for valid product_id', async() => {
            const productsResponse = await global.JEST_E2E.application.inject<TProductsListSchema>({
                method: 'GET',
                url: '/api/v1/products/list?page=1',
            });

            const reviewProduct = faker.helpers.arrayElement(productsResponse.body.rows);
            const reviewData = {
                text: faker.lorem.sentence(),
                rating: faker.number.int({ min: 1, max: 5 }),
            };

            const response = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${reviewProduct.product_id}/create`,
                payload: reviewData,
            });

            expect(response.statusCode).toBe(HttpStatus.CREATED);
        });

        it('should return 400 for invalid rating', async() => {
            const productId = faker.string.uuid();

            const reviewData = {
                text: faker.lorem.sentence(),
                rating: faker.number.int({ min: 10, max: 20 }),
            };

            const response = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${productId}/create`,
                payload: reviewData,
            });

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        });

        it('should return 400 for empty text', async() => {
            const productId = faker.string.uuid();

            const reviewData = {
                text: '',
                rating: faker.number.int({ min: 1, max: 5 }),
            };

            const response = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${productId}/create`,
                payload: reviewData,
            });

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
        });
    });
});
