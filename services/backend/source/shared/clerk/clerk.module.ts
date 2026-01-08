import { ClerkOptions } from '@clerk/backend'
import { DynamicModule } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ClerkGuard } from './clerk.guard'
import { TClerkAsyncOptions } from './clerk.interfaces'
import { ClerkProviders } from './clerk.providers'
import { ClerkStrategy } from './clerk.strategy'

export class ClerkModule {
  public static forRoot(config: ClerkOptions): DynamicModule {
    const optionsProvider = ClerkProviders.getOptions(config)
    const clientProvider = ClerkProviders.getClient()

    const dynamicModule: DynamicModule = {
      global: true,
      module: ClerkModule,
      imports: [
        PassportModule.register({}),
      ],
      providers: [
        optionsProvider,
        clientProvider,
        ClerkStrategy,
        ClerkGuard,
      ],
      exports: [
        clientProvider,
        ClerkStrategy,
        ClerkGuard,
      ],
    }
    return dynamicModule
  }

  public static forRootAsync(asyncOptions: TClerkAsyncOptions): DynamicModule {
    const optionsProvider = ClerkProviders.getAsyncOptions(asyncOptions)
    const clientProvider = ClerkProviders.getClient()

    const dynamicModule: DynamicModule = {
      global: true,
      module: ClerkModule,
      imports: [
        PassportModule.register({}),
      ],
      providers: [
        optionsProvider,
        clientProvider,
        ClerkStrategy,
        ClerkGuard,
      ],
      exports: [
        clientProvider,
        ClerkStrategy,
        ClerkGuard,
      ],
    }

    if (Array.isArray(asyncOptions.imports)) {
      dynamicModule.imports?.push(...asyncOptions.imports)
    }

    return dynamicModule
  }
}
