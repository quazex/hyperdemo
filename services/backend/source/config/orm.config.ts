import { join } from 'node:path'
import { EnvironmentModule } from '@hyperdemo/environment'
import { DataSource, DataSourceOptions } from 'typeorm'
import { PostgresConfig } from './postgres.config'

const environment = EnvironmentModule.parse({
  files: [
    '.env',
  ],
})

const factory = new PostgresConfig(environment)
const options = factory.createTypeOrmOptions() as DataSourceOptions

const root = process.cwd()
const migrations = join(root, 'source/database/migrations/*-migration.ts')

export default new DataSource({
  ...options,
  migrationsRun: true,
  migrations: [
    migrations,
  ],
})
