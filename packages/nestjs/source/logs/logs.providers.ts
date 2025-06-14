import { FactoryProvider, LoggerService, Provider, ValueProvider } from '@nestjs/common';
import { LogsDevelopment } from './logs.development';
import { TLogsAsyncOptions, TLogsOptionsFactory } from './logs.interfaces';
import { LogsProduction } from './logs.production';
import { LogsToken } from './logs.tokens';
import { TLogsOptions } from './logs.types';

export class LogsProviders {
    public static getOptions(options: TLogsOptions): ValueProvider<TLogsOptions> {
        return {
            provide: LogsToken.options,
            useValue: options,
        };
    }

    public static getAsyncOptions(options: TLogsAsyncOptions): Provider<TLogsOptions> {
        if (options.useFactory) {
            return {
                provide: LogsToken.options,
                useFactory: options.useFactory,
                inject: options.inject,
            };
        }
        if (options.useExisting) {
            return {
                provide: LogsToken.options,
                useFactory: async(factory: TLogsOptionsFactory): Promise<TLogsOptions> => {
                    const client = await factory.createLogsOptions();
                    return client;
                },
                inject: [options.useExisting],
            };
        }
        throw new Error('Must provide useFactory or useClass');
    }

    public static getClient(): FactoryProvider<LoggerService> {
        return {
            provide: LogsToken.client,
            useFactory: (options: TLogsOptions): LoggerService => {
                if (options.isProduction) {
                    return new LogsProduction();
                }
                return new LogsDevelopment();
            },
            inject: [LogsToken.options],
        };
    }
}
