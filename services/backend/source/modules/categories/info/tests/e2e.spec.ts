import { TCategoriesDataSchema, TCategoriesListSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

describe('Categories API (e2e)', () => {
    describe('GET /api/v1/categories/:category_id/info', () => {
        it('should return categorie info for valid category_id', async() => {
            const listResponse = await global.JEST_E2E.application.inject<TCategoriesListSchema>({
                method: 'GET',
                url: '/api/v1/categories/list?page=1',
            });

            const randomCategory = faker.helpers.arrayElement(listResponse.body.rows);

            const response = await global.JEST_E2E.application.inject<TCategoriesDataSchema>({
                method: 'GET',
                url: `/api/v1/categories/${randomCategory.category_id}/info`,
            });

            expect(response.statusCode).toBe(200);

            expect(response.body.category_id).toBe(randomCategory.category_id);
            expect(response.body.name).toBe(randomCategory.name);
            expect(response.body.products).toBe(randomCategory.products);
            expect(response.body.brands).toBe(randomCategory.brands);
            expect(response.body.feedbacks).toBe(randomCategory.feedbacks);
        });

        it('should return 404 for invalid category_id', async() => {
            const invalidCategoryId = '00000000-0000-0000-0000-000000000000';

            const response = await global.JEST_E2E.application.inject<TCategoriesDataSchema>({
                method: 'GET',
                url: `/api/v1/categories/${invalidCategoryId}/info`,
            });

            expect(response.statusCode).toBe(404);
        });
    });
});
