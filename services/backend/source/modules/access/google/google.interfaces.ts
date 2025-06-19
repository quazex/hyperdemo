import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common';
import { TGoogleOptions } from './google.types';

export interface TGoogleOptionsFactory {
    createGoogleOptions(): Promise<TGoogleOptions> | TGoogleOptions;
}

export interface TGoogleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useExisting?: Type<TGoogleOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<TGoogleOptions> | TGoogleOptions;
}
