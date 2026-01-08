import { Injectable } from '@nestjs/common'
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { TLooperHandler } from '../types/handler.types'
import { TLooperParams } from '../types/params.types'
import { LOOPER_METADATA_KEY } from './looper.tokens'
import { LooperWrapper } from './looper.wrapper'

@Injectable()
export class LooperDiscovery {
  constructor(
    private readonly reflector: Reflector,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  public explore(): LooperWrapper[] {
    const lopperWrappers: LooperWrapper[] = []

    const instanceWrappers: InstanceWrapper[] = [
      ...this.discoveryService.getControllers(),
      ...this.discoveryService.getProviders(),
    ]

    for (const { instance, metatype } of instanceWrappers) {
      const isClass = typeof instance?.constructor === 'function'

      if (!isClass || !instance || !metatype) {
        continue
      }

      const instancePrototype = Object.getPrototypeOf(instance)

      for (const method of this.metadataScanner.getAllMethodNames(instancePrototype)) {
        const handler = instancePrototype[method] as TLooperHandler
        const metadata = this.reflector.get<TLooperParams>(LOOPER_METADATA_KEY, handler)

        if (typeof handler === 'function' && metadata) {
          lopperWrappers[lopperWrappers.length] = new LooperWrapper(handler.bind(instance), {
            scope: metadata.scope ?? metatype.name,
            failTimeout: metadata.failTimeout ?? metadata.idleTimeout,
            idleTimeout: metadata.idleTimeout,
          })
        }
      }
    }

    return lopperWrappers
  }
}
