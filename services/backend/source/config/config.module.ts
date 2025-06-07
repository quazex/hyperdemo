import { EnvironmentModule } from '@hyperdemo/core/modules/environment';
import { Global, Module } from '@nestjs/common';
import { AppConfig } from './app.config';
import { DocsConfig } from './docs.config';
import { PostgresConfig } from './postgres.config';
import { SwaggerConfig } from './swagger.config';
import { ViewConfig } from './view.config';

@Global()
@Module({
    imports: [
        EnvironmentModule.forDotenv(),
    ],
    providers: [
        AppConfig,
        DocsConfig,
        PostgresConfig,
        SwaggerConfig,
        ViewConfig,
    ],
    exports: [
        AppConfig,
        DocsConfig,
        PostgresConfig,
        SwaggerConfig,
        ViewConfig,
    ],
})
export class ConfigModule {}
