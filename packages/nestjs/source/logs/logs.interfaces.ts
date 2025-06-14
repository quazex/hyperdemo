import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common';
import { TLogsOptions } from './logs.types';

export interface TLogsOptionsFactory {
    createLogsOptions(): Promise<TLogsOptions> | TLogsOptions;
}

export interface TLogsAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useExisting?: Type<TLogsOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<TLogsOptions> | TLogsOptions;
}
