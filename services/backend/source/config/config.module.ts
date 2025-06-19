import { EnvironmentModule } from '@hyperdemo/nestjs/modules/environment';
import { Global, Module } from '@nestjs/common';
import { AppConfig } from './app.config';
import { ClerkConfig } from './auth.config';
import { DocsConfig } from './docs.config';
import { PostgresConfig } from './postgres.config';
import { SwaggerConfig } from './swagger.config';
import { ViewConfig } from './view.config';

@Global()
@Module({
    imports: [
        EnvironmentModule.forDotenv({
            files: [
                '.env',
                '.env.local',
            ],
        }),
    ],
    providers: [
        AppConfig,
        ClerkConfig,
        DocsConfig,
        PostgresConfig,
        SwaggerConfig,
        ViewConfig,
    ],
    exports: [
        AppConfig,
        ClerkConfig,
        DocsConfig,
        PostgresConfig,
        SwaggerConfig,
        ViewConfig,
    ],
})
export class ConfigModule {}
