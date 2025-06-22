import { TProductsListSchema } from '@domain/schemas';
import { describe, expect, it } from '@jest/globals';

describe('Products API (e2e)', () => {
    describe('GET /api/v1/products/list', () => {
        it('should return products list with pagination', async() => {
            const response = await global.JEST_E2E.application.inject<TProductsListSchema>({
                method: 'GET',
                url: '/api/v1/products/list?page=1',
            });

            expect(response.statusCode).toBe(200);

            expect(response.body).toHaveProperty('rows');
            expect(response.body).toHaveProperty('pages');
            expect(response.body).toHaveProperty('total');

            expect(Array.isArray(response.body.rows)).toBe(true);
            expect(response.body.rows.length).toBeGreaterThan(0);
            expect(response.body.pages).toBeGreaterThan(0);
            expect(response.body.total).toBeGreaterThan(0);
        });
    });
});
