import { EnvironmentModule } from '@hyperdemo/environment';
import { Global, Module } from '@nestjs/common';
import { AppConfig } from './app.config';
import { ClerkConfig } from './clerk.config';
import { DocsConfig } from './docs.config';
import { FeaturesConfig } from './features.config';
import { PostgresConfig } from './postgres.config';
import { SwaggerConfig } from './swagger.config';
import { ViewConfig } from './view.config';

@Global()
@Module({
    imports: [
        EnvironmentModule.forDotenv({
            files: [
                '.env.e2e',
                '.env.local',
                '.env',
            ],
        }),
    ],
    providers: [
        AppConfig,
        ClerkConfig,
        DocsConfig,
        FeaturesConfig,
        PostgresConfig,
        SwaggerConfig,
        ViewConfig,
    ],
    exports: [
        AppConfig,
        ClerkConfig,
        DocsConfig,
        FeaturesConfig,
        PostgresConfig,
        SwaggerConfig,
        ViewConfig,
    ],
})
export class ConfigModule {}
