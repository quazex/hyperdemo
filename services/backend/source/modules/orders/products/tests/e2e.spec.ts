import { TOrdersDataSchema, TOrdersListSchema, TOrdersProductsListSchema } from '@domain/schemas';
import { faker } from '@faker-js/faker';
import { describe, expect, it } from '@jest/globals';

describe('Orders API (e2e)', () => {
    describe('GET /api/v1/orders/:order_id/products', () => {
        it('should return order info for valid order_id', async() => {
            const listResponse = await global.JEST_E2E.application.inject<TOrdersListSchema>({
                method: 'GET',
                url: '/api/v1/orders/list?page=1',
            });

            const randomOrder = faker.helpers.arrayElement(listResponse.body.rows);

            const response = await global.JEST_E2E.application.inject<TOrdersProductsListSchema>({
                method: 'GET',
                url: {
                    pathname: `/api/v1/orders/${randomOrder.order_id}/products`,
                    query: {
                        page: '1',
                    },
                },
            });

            expect(response.statusCode).toBe(200);

            const firstRow = response.body.rows.at(0);

            expect(firstRow?.product_id.length).toBeGreaterThan(0);
            expect(firstRow?.name.length).toBeGreaterThan(0);
            expect(firstRow?.description.length).toBeGreaterThan(0);
            expect(firstRow?.images.length).toBeGreaterThan(0);
            expect(firstRow?.brand.id.length).toBeGreaterThan(0);
            expect(firstRow?.brand.name.length).toBeGreaterThan(0);
            expect(firstRow?.category.id.length).toBeGreaterThan(0);
            expect(firstRow?.category.name.length).toBeGreaterThan(0);
            expect(firstRow?.quantity).toBeGreaterThan(0);
            expect(firstRow?.price).toBeGreaterThan(0);
        });

        it('should return 404 for invalid order_id', async() => {
            const invalidOrderId = '00000000-0000-0000-0000-000000000000';

            const response = await global.JEST_E2E.application.inject<TOrdersDataSchema>({
                method: 'GET',
                url: `/api/v1/orders/${invalidOrderId}/info`,
            });

            expect(response.statusCode).toBe(404);
        });
    });
});
