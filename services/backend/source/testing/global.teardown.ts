import 'tsconfig-paths/register';

import { rm } from 'fs/promises';

export default async function globalTeardown(): Promise<void> {
    await global.JEST_E2E.application.close();
    console.log('🛑 Application stopped successfully');

    await global.JEST_E2E.container.stop();
    console.log('🛑 PostgreSQL container stopped successfully');

    await rm(global.JEST_E2E.env);
    console.log('🛑 Clean application environment');
}
