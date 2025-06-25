import { TReviewsDataSchema, TReviewsListSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

describe('Reviews List API (e2e)', () => {
    describe('GET /api/v1/reviews/:product_id/list', () => {
        it('should return reviews list for product_id', async() => {
            const productId = faker.string.uuid();

            await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${productId}/create`,
                payload: {
                    text: faker.lorem.sentences(2),
                    rating: faker.number.int({ min: 1, max: 5 }),
                },
            });

            await global.JEST_E2E.application.inject<TReviewsDataSchema>({
                method: 'POST',
                url: `/api/v1/reviews/${productId}/create`,
                payload: {
                    text: faker.lorem.sentences(2),
                    rating: faker.number.int({ min: 1, max: 5 }),
                },
            });

            const response = await global.JEST_E2E.application.inject<TReviewsListSchema>({
                method: 'GET',
                url: `/api/v1/reviews/${productId}/list`,
            });

            expect(response.statusCode).toBe(200);

            const firstRow = response.body.rows.at(0);

            expect(response.body.rows).toHaveLength(2);
            expect(firstRow?.text).toBeDefined();
            expect(firstRow?.rating).toBeDefined();
            expect(firstRow?.id).toBeDefined();
            expect(firstRow?.user_id).toBeDefined();
            expect(firstRow?.created_at).toBeDefined();
        });

        it('should return empty list for product with no reviews', async() => {
            const productId = faker.string.uuid();

            const response = await global.JEST_E2E.application.inject<TReviewsListSchema>({
                method: 'GET',
                url: `/api/v1/reviews/${productId}/list`,
            });

            expect(response.statusCode).toBe(200);
            expect(response.body.rows).toHaveLength(0);
        });
    });
});
