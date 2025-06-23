import { faker } from '@faker-js/faker';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import { TestingApplication } from './application.mock';

describe('Validators', () => {
    const testingApp = new TestingApplication();

    beforeAll(testingApp.init.bind(testingApp));
    afterAll(testingApp.close.bind(testingApp));

    test('Bad request with empty body', async() => {
        const response = await testingApp.inject({
            method: 'POST',
            url: '/',
        });

        expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    test('Success with correct body', async() => {
        const response = await testingApp.inject({
            method: 'POST',
            url: '/',
            body: {
                id: faker.string.uuid(),
                text: faker.lorem.sentence(),
                quantity: faker.number.int({ min: -10, max: 10 }),
                is_flag: faker.datatype.boolean(),
                timestamp: faker.date.anytime().toISOString(),
            },
        });

        expect(response.statusCode).toBe(HttpStatus.OK);
    });
});
