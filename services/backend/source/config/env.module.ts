import { DynamicModule, Provider } from '@nestjs/common'
import { AppConfig } from './app.config'
import { ClerkConfig } from './clerk.config'
import { PostgresConfig } from './postgres.config'
import { SwaggerConfig } from './swagger.config'

export class EnvironmentModule {
  public static forRoot(): DynamicModule {
    const ConfigProviders: Provider[] = [
      AppConfig,
      ClerkConfig,
      PostgresConfig,
      SwaggerConfig,
    ]

    return {
      global: true,
      module: EnvironmentModule,
      providers: ConfigProviders,
      exports: ConfigProviders,
    }
  }
}
