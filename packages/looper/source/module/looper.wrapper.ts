import { Logger } from '@nestjs/common'
import { TLooperHandler } from '../types/handler.types'
import { TLooperWrapper } from '../types/wrapper.types'
import { LooperTimer } from './looper.timer'

export class LooperWrapper {
  #logger: Logger

  #timerIDLE: LooperTimer
  #timerFail: LooperTimer

  #running: boolean
  #handler: TLooperHandler
  #params: TLooperWrapper

  constructor(handler: TLooperHandler, params: TLooperWrapper) {
    this.#running = false
    this.#handler = handler
    this.#params = params

    this.#logger = new Logger(LooperWrapper.name)
    this.#timerIDLE = new LooperTimer(params.idleTimeout)
    this.#timerFail = new LooperTimer(params.failTimeout ?? params.idleTimeout)
  }

  public get name(): string {
    return this.#params.scope
  }

  public async start(): Promise<void> {
    this.#logger.log(`Start new Looper for ${this.#params.scope}`)

    this.#running = true

    while (this.#running) {
      try {
        const result = await this.#handler()

        if (typeof result !== 'boolean') {
          this.#logger.warn(`Looper method from scope "${this.#params.scope}" should return "boolean"`)
        }

        // Если есть еще работа, продолжаем сразу без задержки
        if (result === true) {
          continue
        }

        // Если работы нет, ждем минуту
        await this.#timerIDLE.wait()
      } catch (error) {
        this.#logger.warn(error)
        await this.#timerFail.wait()
      }
    }
  }

  public stop(): void {
    this.#running = false
    this.#timerIDLE.clear()
    this.#timerFail.clear()
  }
}
