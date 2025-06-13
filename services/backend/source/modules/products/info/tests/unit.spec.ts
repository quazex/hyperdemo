import { TProductsDataSchema } from '@domain/schemas';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import { TestingUnitMock } from './unit.mock';

describe('Products Info Unit', () => {
    const testingApp = new TestingUnitMock();

    beforeAll(testingApp.init.bind(testingApp));
    afterAll(testingApp.close.bind(testingApp));

    test('Success with correct query', async() => {
        const response = await testingApp.inject({
            method: 'GET',
            url: `/products/${testingApp.entity.product_id}/info`,
        });
        const body = response.json() as TProductsDataSchema;

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(body.product_id).toBe(testingApp.entity.product_id);
    });
});
