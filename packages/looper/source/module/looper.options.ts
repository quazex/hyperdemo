import { Provider, ValueProvider } from '@nestjs/common'
import { TLooperOptions } from '../types/options.types'
import { TLooperOptionsAsync, TLooperOptionsFactory } from './looper.interfaces'
import { LOOPER_OPTIONS_KEY } from './looper.tokens'

export class LooperOptions {
  public static getSync(params?: TLooperOptions): ValueProvider<TLooperOptions> {
    return {
      provide: LOOPER_OPTIONS_KEY,
      useValue: params ?? {},
    }
  }

  public static getAsync(options: TLooperOptionsAsync): Provider<TLooperOptions> {
    if (options.useFactory) {
      return {
        provide: LOOPER_OPTIONS_KEY,
        useFactory: options.useFactory,
        inject: options.inject,
      }
    }
    if (options.useExisting) {
      return {
        provide: LOOPER_OPTIONS_KEY,
        useFactory: async (factory: TLooperOptionsFactory): Promise<TLooperOptions> => {
          const options = await factory.createLooperOptions()
          return options
        },
        inject: [options.useExisting],
      }
    }
    throw new Error('Must provide useFactory or useClass')
  }
}
