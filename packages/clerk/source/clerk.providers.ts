import { createClerkClient, ClerkClient, ClerkOptions } from '@clerk/backend';
import { FactoryProvider, Provider, ValueProvider } from '@nestjs/common';
import { ClerkInjections } from './clerk.injections';
import { TClerkAsyncOptions, TClerkOptionsFactory } from './clerk.interfaces';

export class ClerkProviders {
    public static getOptions(options: ClerkOptions): ValueProvider<ClerkOptions> {
        const optionsToken = ClerkInjections.getOptions();
        return {
            provide: optionsToken,
            useValue: options,
        };
    }

    public static getAsyncOptions(options: TClerkAsyncOptions): Provider<ClerkOptions> {
        const optionsToken = ClerkInjections.getOptions();
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
        const optionsToken = ClerkInjections.getOptions();
        const clientToken = ClerkInjections.getClient();
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
