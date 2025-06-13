import { TProductsPagination } from '@domain/restapi';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import { TestingUnitMock } from './unit.mock';

describe('Products List Unit', () => {
    const testingApp = new TestingUnitMock();

    beforeAll(testingApp.init.bind(testingApp));
    afterAll(testingApp.close.bind(testingApp));

    test('Bad request with empty query', async() => {
        const response = await testingApp.inject({
            method: 'GET',
            url: '/products/list',
        });

        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    test('Success with correct query', async() => {
        const response = await testingApp.inject({
            method: 'GET',
            url: '/products/list',
            query: {
                page: '1',
            },
        });
        const body = response.json() as TProductsPagination;

        expect(response.statusCode).toBe(HttpStatus.OK);
        expect(body.total).toBe(testingApp.entities.length);
    });
});
