import { TProductsListSchema, TReviewsDataSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

describe('Reviews Create API (e2e)', () => {
    describe('POST /api/v1/reviews/:product_id/create', () => {
        it('should create a new review for valid product_id', async() => {
            const listResponse = await global.JEST_E2E.application.inject<TProductsListSchema>({
                method: 'GET',
                url: '/api/v1/products/list?page=1',
            });

            const reviewProduct = faker.helpers.arrayElement(listResponse.body.rows);
            const reviewData = {
                text: faker.lorem.sentences(2),
                rating: faker.number.int({ min: 1, max: 5 }),
            };

            const response = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${reviewProduct.product_id}/create`,
                payload: reviewData,
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.text).toBe(reviewData.text);
            expect(response.body.rating).toBe(reviewData.rating);
            expect(response.body.id).toBeDefined();
            expect(response.body.user_id).toBeDefined();
            expect(response.body.created_at).toBeDefined();
        });

        it('should return 400 for invalid rating', async() => {
            const productId = faker.string.uuid();

            const reviewData = {
                text: faker.lorem.sentences(2),
                rating: 6,
            };

            const response = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${productId}/create`,
                payload: reviewData,
            });

            expect(response.statusCode).toBe(400);
        });

        it('should return 400 for empty text', async() => {
            const productId = faker.string.uuid();

            const reviewData = {
                text: '',
                rating: 5,
            };

            const response = await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${productId}/create`,
                payload: reviewData,
            });

            expect(response.statusCode).toBe(400);
        });
    });
});
