import { BeforeApplicationShutdown, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { TLooperOptions } from '../types/options.types'
import { LooperDiscovery } from './looper.discovery'
import { LOOPER_OPTIONS_KEY } from './looper.tokens'
import { LooperWrapper } from './looper.wrapper'

@Injectable()
export class LooperProvider implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly loopers: Map<string, LooperWrapper>

  constructor(
    @Inject(LOOPER_OPTIONS_KEY) private readonly looperOptions: TLooperOptions,
    @Inject(LooperDiscovery) private readonly looperDiscovery: LooperDiscovery,
  ) {
    this.loopers = new Map()
  }

  public onApplicationBootstrap(): void {
    if (this.looperOptions.autoStart === true) {
      this.start()
    }
  }

  public beforeApplicationShutdown(): void {
    for (const looper of this.loopers.values()) {
      looper.stop()
    }
  }

  public start(): void {
    for (const looper of this.looperDiscovery.explore()) {
      this.loopers.set(looper.name, looper)
      looper.start()
    }
  }
}
