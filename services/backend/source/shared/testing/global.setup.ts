import 'tsconfig-paths/register'

import { writeFile } from 'fs/promises'
import { join } from 'path'
import { PostgreSqlContainer } from '@testcontainers/postgresql'
import { TestingApplicationE2E } from './application.e2e'

export default async function globalSetup(): Promise<void> {
  console.log('\n')
  console.log('🚀 Starting PostgreSQL test container...')

  const applicationRoot = process.cwd()
  const monorepoRoot = join(applicationRoot, '../../')

  //
  // Postgresql container
  //
  const postgresContainer = await new PostgreSqlContainer('postgres:16.1')
    .withCopyFilesToContainer([
      {
        source: join(monorepoRoot, '.docker/postgres.schema.sql'),
        target: '/docker-entrypoint-initdb.d/01-schema.sql',
      },
      {
        source: join(monorepoRoot, '.docker/postgres.seeds.sql.gz'),
        target: '/docker-entrypoint-initdb.d/02-seeds.sql.gz',
      },
    ])
    .withExposedPorts({
      container: 5432,
      host: 8832,
    })
    .withReuse()
    .start()

  console.log('✅ PostgreSQL container started')

  //
  // Environments
  //
  const env: Record<string, string> = {
    PORT: '10000',
    NODE_ENV: 'production',
    APP_TIMEZONE: 'UTC',
    DOCS_ENABLED: 'false',
    POSTGRES_URI: postgresContainer.getConnectionUri(),
  }

  const envContent = Object.entries(env).map((row) => row.join('=')).join('\n')
  const envPath = join(applicationRoot, '.env.e2e')

  await writeFile(envPath, envContent)

  //
  // Application
  //
  const application = new TestingApplicationE2E()
  await application.init()

  console.log('✅ Application container started')

  //
  // Global
  //
  global.JEST_E2E = {
    container: postgresContainer,
    application,
    env: envPath,
  }
}
