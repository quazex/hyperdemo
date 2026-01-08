import { DynamicModule } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { TLooperOptions } from '../types/options.types'
import { LooperDiscovery } from './looper.discovery'
import { TLooperOptionsAsync } from './looper.interfaces'
import { LooperOptions } from './looper.options'
import { LooperProvider } from './looper.provider'

export class LooperModule {
  public static forRoot(params?: TLooperOptions): DynamicModule {
    const OptionsProvider = LooperOptions.getSync(params)

    const dynamicModule: DynamicModule = {
      module: LooperModule,
      imports: [
        DiscoveryModule,
      ],
      providers: [
        OptionsProvider,
        LooperDiscovery,
        LooperProvider,
      ],
      exports: [
        LooperProvider,
      ],
    }

    return dynamicModule
  }

  public static forRootAsync(params: TLooperOptionsAsync): DynamicModule {
    const OptionsProvider = LooperOptions.getAsync(params)

    const dynamicModule: DynamicModule = {
      global: params.isGlobal,
      module: LooperModule,
      imports: [
        DiscoveryModule,
      ],
      providers: [
        OptionsProvider,
        LooperDiscovery,
        LooperProvider,
      ],
      exports: [
        LooperProvider,
      ],
    }

    if (Array.isArray(params.imports)) {
      dynamicModule.imports?.push(...params.imports)
    }

    return dynamicModule
  }
}
