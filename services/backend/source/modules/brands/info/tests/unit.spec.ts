import { TBrandsDataSchema } from '@domain/schemas';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import { TestingUnitMock } from './unit.mock';

describe('Brands Info Unit', () => {
    const testingApp = new TestingUnitMock();

    beforeAll(testingApp.init.bind(testingApp));
    afterAll(testingApp.close.bind(testingApp));

    test('Success with correct query', async() => {
        const response = await testingApp.inject({
            method: 'GET',
            url: `/brands/${testingApp.entity.brand_id}/info`,
        });
        const body = response.json() as TBrandsDataSchema;

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(body.brand_id).toBe(testingApp.entity.brand_id);
    });
});
