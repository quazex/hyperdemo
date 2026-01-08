import { AsyncLocalStorage } from 'node:async_hooks'
import { DynamicModule, ValueProvider } from '@nestjs/common'
import { ContextInjections } from './context.injections'
import { ContextProvider } from './context.provider'
import { TContextRequest } from './context.types'

export class ContextModule {
  public static forRoot(): DynamicModule {
    const ContextStorageProvider: ValueProvider = {
      provide: ContextInjections.getStorage(),
      useValue: new AsyncLocalStorage<TContextRequest>(),
    }

    return {
      global: true,
      module: ContextModule,
      providers: [ContextStorageProvider, ContextProvider],
      exports: [ContextStorageProvider, ContextProvider],
    }
  }
}
