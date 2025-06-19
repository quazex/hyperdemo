import { createClerkClient, ClerkClient, ClerkOptions } from '@clerk/backend';
import { FactoryProvider, Provider, ValueProvider } from '@nestjs/common';
import { TClerkAsyncOptions, TClerkOptionsFactory } from './clerk.interfaces';
import { ClerkTokens } from './clerk.tokens';

export class ClerkProviders {
    public static getOptions(options: ClerkOptions): ValueProvider<ClerkOptions> {
        const optionsToken = ClerkTokens.getOptions();
        return {
            provide: optionsToken,
            useValue: options,
        };
    }

    public static getAsyncOptions(options: TClerkAsyncOptions): Provider<ClerkOptions> {
        const optionsToken = ClerkTokens.getOptions();
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
                useFactory: async(factory: TClerkOptionsFactory): Promise<ClerkOptions> => {
                    const client = await factory.createClerkOptions();
                    return client;
                },
                inject: [options.useExisting],
            };
        }
        throw new Error('Must provide useFactory or useClass');
    }

    public static getClient(): FactoryProvider<ClerkClient> {
        const optionsToken = ClerkTokens.getOptions();
        const clientToken = ClerkTokens.getClient();
        return {
            provide: clientToken,
            useFactory: (config: ClerkOptions) => {
                const client = createClerkClient(config);
                return client;
            },
            inject: [optionsToken],
        };
    }
}
