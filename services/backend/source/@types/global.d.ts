import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TestingApplication } from '../testing/application.e2e';

declare global {
    interface JestTesting {
        container: StartedPostgreSqlContainer,
        application: TestingApplication,
        env: string,
    }

    var JEST_E2E: JestTesting;
}
