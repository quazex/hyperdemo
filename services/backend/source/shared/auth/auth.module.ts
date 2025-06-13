import { ClerkOptions } from '@clerk/backend';
import { DynamicModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';
import { TAuthAsyncOptions } from './auth.interfaces';
import { AuthProviders } from './auth.providers';
import { AuthStrategy } from './auth.strategy';

export class AuthModule {
    public static forRoot(config: ClerkOptions): DynamicModule {
        const optionsProvider = AuthProviders.getOptions(config);
        const clientProvider = AuthProviders.getClient();

        const dynamicModule: DynamicModule = {
            global: true,
            module: AuthModule,
            imports: [
                PassportModule.register({}),
            ],
            providers: [
                optionsProvider,
                clientProvider,
                AuthStrategy,
                AuthGuard,
            ],
            exports: [
                AuthStrategy,
                AuthGuard,
            ],
        };
        return dynamicModule;
    }


    public static forRootAsync(asyncOptions: TAuthAsyncOptions): DynamicModule {
        const optionsProvider = AuthProviders.getAsyncOptions(asyncOptions);
        const clientProvider = AuthProviders.getClient();

        const dynamicModule: DynamicModule = {
            global: true,
            module: AuthModule,
            imports: [
                PassportModule.register({}),
            ],
            providers: [
                optionsProvider,
                clientProvider,
                AuthStrategy,
                AuthGuard,
            ],
            exports: [
                AuthStrategy,
                AuthGuard,
            ],
        };

        if (Array.isArray(asyncOptions.imports)) {
            dynamicModule.imports?.push(...asyncOptions.imports);
        }

        return dynamicModule;
    }
}
