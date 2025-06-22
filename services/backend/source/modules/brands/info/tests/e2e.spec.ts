import { TBrandsDataSchema, TBrandsListSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

describe('Brands API (e2e)', () => {
    describe('GET /api/v1/brands/:brand_id/info', () => {
        it('should return brand info for valid brand_id', async() => {
            const listResponse = await global.JEST_E2E.application.inject<TBrandsListSchema>({
                method: 'GET',
                url: '/api/v1/brands/list?page=1',
            });

            const randomBrand = faker.helpers.arrayElement(listResponse.body.rows);

            const response = await global.JEST_E2E.application.inject<TBrandsDataSchema>({
                method: 'GET',
                url: `/api/v1/brands/${randomBrand.brand_id}/info`,
            });

            expect(response.statusCode).toBe(200);

            expect(response.body.brand_id).toBe(randomBrand.brand_id);
            expect(response.body.name).toBe(randomBrand.name);
            expect(response.body.products).toBe(randomBrand.products);
            expect(response.body.categories).toBe(randomBrand.categories);
            expect(response.body.feedbacks).toBe(randomBrand.feedbacks);
        });

        it('should return 404 for invalid brand_id', async() => {
            const invalidBrandId = '00000000-0000-0000-0000-000000000000';

            const response = await global.JEST_E2E.application.inject<TBrandsDataSchema>({
                method: 'GET',
                url: `/api/v1/brands/${invalidBrandId}/info`,
            });

            expect(response.statusCode).toBe(404);
        });
    });
});
