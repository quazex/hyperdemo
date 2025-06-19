import { ClassProvider, Provider, ValueProvider } from '@nestjs/common';
import { GoogleClient } from './google.client';
import { TGoogleAsyncOptions, TGoogleOptionsFactory } from './google.interfaces';
import { GoogleTokens } from './google.tokens';
import { TGoogleOptions } from './google.types';

export class GoogleProviders {
    public static getOptions(options: TGoogleOptions): ValueProvider<TGoogleOptions> {
        const optionsToken = GoogleTokens.getOptions();
        return {
            provide: optionsToken,
            useValue: options,
        };
    }

    public static getAsyncOptions(options: TGoogleAsyncOptions): Provider<TGoogleOptions> {
        const optionsToken = GoogleTokens.getOptions();
        if (options.useFactory) {
            return {
                provide: optionsToken,
                useFactory: options.useFactory,
                inject: options.inject,
            };
        }
        if (options.useExisting) {
            return {
                provide: optionsToken,
                useFactory: async(factory: TGoogleOptionsFactory): Promise<TGoogleOptions> => {
                    const client = await factory.createGoogleOptions();
                    return client;
                },
                inject: [options.useExisting],
            };
        }
        throw new Error('Must provide useFactory or useClass');
    }

    public static getClient(): ClassProvider<GoogleClient> {
        const clientToken = GoogleTokens.getClient();
        return {
            provide: clientToken,
            useClass: GoogleClient,
        };
    }
}
