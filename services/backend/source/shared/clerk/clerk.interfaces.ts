import { ClerkOptions } from '@clerk/backend'
import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'

export interface TClerkOptionsFactory {
  createClerkOptions(): Promise<ClerkOptions> | ClerkOptions
}

export interface TClerkAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: Array<InjectionToken | OptionalFactoryDependency>
  useExisting?: Type<TClerkOptionsFactory>

  useFactory?: (...args: any[]) => Promise<ClerkOptions> | ClerkOptions
}
