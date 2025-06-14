import { DynamicModule, Global, Module } from '@nestjs/common';
import { TLogsAsyncOptions } from './logs.interfaces';
import { LogsProviders } from './logs.providers';
import { TLogsOptions } from './logs.types';

@Global()
@Module({})
export class LogsModule {
    public static forRoot(options: TLogsOptions): DynamicModule {
        const optionsProvider = LogsProviders.getOptions(options);
        const clientProvider = LogsProviders.getClient();

        const dynamicModule: DynamicModule = {
            module: LogsModule,
            providers: [
                optionsProvider,
                clientProvider,
            ],
            exports: [
                clientProvider,
            ],
        };
        return dynamicModule;
    }


    public static forRootAsync(asyncOptions: TLogsAsyncOptions): DynamicModule {
        const optionsProvider = LogsProviders.getAsyncOptions(asyncOptions);
        const clientProvider = LogsProviders.getClient();

        const dynamicModule: DynamicModule = {
            module: LogsModule,
            imports: asyncOptions.imports,
            providers: [
                optionsProvider,
                clientProvider,
            ],
            exports: [
                clientProvider,
            ],
        };

        return dynamicModule;
    }
}
