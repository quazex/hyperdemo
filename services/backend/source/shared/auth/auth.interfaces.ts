import { ClerkOptions } from '@clerk/backend';
import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common';

export interface TAuthOptionsFactory {
    createAuthOptions(): Promise<ClerkOptions> | ClerkOptions;
}

export interface TAuthAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
    useExisting?: Type<TAuthOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<ClerkOptions> | ClerkOptions;
}
