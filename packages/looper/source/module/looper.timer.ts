import { clearTimeout, setTimeout } from 'node:timers'

export class LooperTimer {
  #timer: NodeJS.Timeout
  #delay: number
  #stopped: boolean

  constructor(delay: number) {
    this.#delay = delay
    this.#stopped = false
  }

  public async wait(): Promise<void> {
    if (this.#stopped === false) {
      await new Promise<void>((resolve) => {
        this.#timer = setTimeout(resolve, this.#delay)
      })
    }
  }

  public clear(): void {
    clearTimeout(this.#timer)
    this.#stopped = true
  }
}
