import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { TestingApplicationE2E } from '@shared/testing';

declare global {
    interface JestTesting {
        container: StartedPostgreSqlContainer,
        application: TestingApplicationE2E,
        env: string,
    }

    var JEST_E2E: JestTesting;
}
