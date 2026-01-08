import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'
import { TLooperOptions } from '../types/options.types'

export interface TLooperOptionsFactory {
  createLooperOptions(): Promise<TLooperOptions> | TLooperOptions
}

export interface TLooperOptionsAsync extends Pick<ModuleMetadata, 'imports'> {
  inject?: Array<InjectionToken | OptionalFactoryDependency>
  useExisting?: Type<TLooperOptionsFactory>
  useFactory?: (...args: any[]) => Promise<TLooperOptions> | TLooperOptions
  isGlobal?: boolean
}
