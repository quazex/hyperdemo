import { TCategoriesDataSchema } from '@domain/schemas';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import { TestingUnitMock } from './unit.mock';

describe('Categories Info Unit', () => {
    const testingApp = new TestingUnitMock();

    beforeAll(testingApp.init.bind(testingApp));
    afterAll(testingApp.close.bind(testingApp));

    test('Success with correct query', async() => {
        const response = await testingApp.inject({
            method: 'GET',
            url: `/categories/${testingApp.entity.category_id}/info`,
        });
        const body = response.json() as TCategoriesDataSchema;

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(body.category_id).toBe(testingApp.entity.category_id);
    });
});
