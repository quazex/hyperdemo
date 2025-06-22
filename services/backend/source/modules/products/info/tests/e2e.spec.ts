import { TProductsDataSchema, TProductsListSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

describe('Products API (e2e)', () => {
    describe('GET /api/v1/products/:product_id/info', () => {
        it('should return product info for valid product_id', async() => {
            const listResponse = await global.JEST_E2E.application.inject<TProductsListSchema>({
                method: 'GET',
                url: '/api/v1/products/list?page=1',
            });

            const randomProduct = faker.helpers.arrayElement(listResponse.body.rows);

            const response = await global.JEST_E2E.application.inject<TProductsDataSchema>({
                method: 'GET',
                url: `/api/v1/products/${randomProduct.product_id}/info`,
            });

            expect(response.statusCode).toBe(200);

            expect(response.body.product_id).toBe(randomProduct.product_id);
            expect(response.body.name).toBe(randomProduct.name);
            expect(response.body.description).toBe(randomProduct.description);
            expect(response.body.images.length).toBe(randomProduct.images.length);
            expect(response.body.brand.id).toBe(randomProduct.brand.id);
            expect(response.body.brand.name).toBe(randomProduct.brand.name);
            expect(response.body.category.id).toBe(randomProduct.category.id);
            expect(response.body.category.name).toBe(randomProduct.category.name);
            expect(response.body.price).toBe(randomProduct.price);
            expect(response.body.feedbacks).toBe(randomProduct.feedbacks);
        });

        it('should return 404 for invalid product_id', async() => {
            const invalidProductId = '00000000-0000-0000-0000-000000000000';

            const response = await global.JEST_E2E.application.inject<TProductsDataSchema>({
                method: 'GET',
                url: `/api/v1/products/${invalidProductId}/info`,
            });

            expect(response.statusCode).toBe(404);
        });
    });
});
