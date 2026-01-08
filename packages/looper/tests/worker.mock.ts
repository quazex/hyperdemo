import { setTimeout } from 'node:timers/promises'
import { Injectable } from '@nestjs/common'
import { Looper } from '@/index'

@Injectable()
export class TestingWorkerMock {
  @Looper({
    idleTimeout: 8_640_000, // 1 день
  })
  public async process(): Promise<boolean> {
    return await setTimeout(100, false)
  }
}
