import { ReviewsCreatedEvent } from '@domain/events';
import { faker } from '@faker-js/faker';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { TestingUnitMock } from './unit.mock';

describe('Products Reviews Unit', () => {
    const testingApp = new TestingUnitMock();

    beforeAll(testingApp.init.bind(testingApp));
    afterAll(testingApp.close.bind(testingApp));

    test('Success with correct query', async() => {
        const event = new ReviewsCreatedEvent({
            product_id: faker.string.uuid(),
        });

        const result = await testingApp.emitter.emitAsync(
            ReviewsCreatedEvent.event,
            event,
        );

        expect(result).toBeDefined();
    });
});
