import { createClerkClient, ClerkClient, ClerkOptions } from '@clerk/backend';
import { FactoryProvider, Provider, ValueProvider } from '@nestjs/common';
import { TAuthAsyncOptions, TAuthOptionsFactory } from './auth.interfaces';
import { AuthTokens } from './auth.tokens';

export class AuthProviders {
    public static getOptions(options: ClerkOptions): ValueProvider<ClerkOptions> {
        const optionsToken = AuthTokens.getOptions();
        return {
            provide: optionsToken,
            useValue: options,
        };
    }

    public static getAsyncOptions(options: TAuthAsyncOptions): Provider<ClerkOptions> {
        const optionsToken = AuthTokens.getOptions();
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
                useFactory: async(factory: TAuthOptionsFactory): Promise<ClerkOptions> => {
                    const client = await factory.createAuthOptions();
                    return client;
                },
                inject: [options.useExisting],
            };
        }
        throw new Error('Must provide useFactory or useClass');
    }

    public static getClient(): FactoryProvider<ClerkClient> {
        const optionsToken = AuthTokens.getOptions();
        const clientToken = AuthTokens.getClient();
        return {
            provide: clientToken,
            useFactory: (config: ClerkOptions): ClerkClient => {
                const client = createClerkClient(config);
                return client;
            },
            inject: [optionsToken],
        };
    }
}
