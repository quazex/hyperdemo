import { DynamicModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TGoogleAsyncOptions } from './google.interfaces';
import { GoogleProviders } from './google.providers';
import { GoogleState } from './google.state';
import { TGoogleOptions } from './google.types';

export class ClerkModule {
    public static forRoot(options: TGoogleOptions): DynamicModule {
        const optionsProvider = GoogleProviders.getOptions(options);
        const clientProvider = GoogleProviders.getClient();

        const dynamicModule: DynamicModule = {
            global: true,
            module: ClerkModule,
            imports: [
                PassportModule.register({}),
            ],
            providers: [
                optionsProvider,
                clientProvider,
                GoogleState,
            ],
            exports: [
                clientProvider,
            ],
        };
        return dynamicModule;
    }


    public static forRootAsync(asyncOptions: TGoogleAsyncOptions): DynamicModule {
        const optionsProvider = GoogleProviders.getAsyncOptions(asyncOptions);
        const clientProvider = GoogleProviders.getClient();

        const dynamicModule: DynamicModule = {
            global: true,
            module: ClerkModule,
            imports: [
                PassportModule.register({}),
            ],
            providers: [
                optionsProvider,
                clientProvider,
                GoogleState,
            ],
            exports: [
                clientProvider,
            ],
        };

        if (Array.isArray(asyncOptions.imports)) {
            dynamicModule.imports?.push(...asyncOptions.imports);
        }

        return dynamicModule;
    }
}
