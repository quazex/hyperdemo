import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { EnvironmentModule } from '../environment.module';
import { TestingApplication } from './environment.application';

describe('Environment', () => {
    const testing = new TestingApplication();

    beforeAll(testing.init.bind(testing));
    afterAll(testing.close.bind(testing));

    it('module()', () => {
        expect(testing.module).toBeInstanceOf(EnvironmentModule);
    });

    it('forDotenv()', () => {
        const envPort = testing.service.get('PORT').required().asPortNumber();
        const envFlag = testing.service.get('IS_FLAG').required().asBoolStrict();
        const envHost = testing.service.get('HOST').required().asString();
        const envBrokers = testing.service.get('BROKERS').required().asJsonArray() as string[];

        expect(envPort).toBe(10);
        expect(envFlag).toBe(true);
        expect(envHost).toBe('https://external.host.com');
        expect(envBrokers.length).toBe(2);
    });
});
