import { Dotenv, InjectDotenv } from '@hyperdemo/environment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FeaturesConfig {
  /**
     * Включает счетчики на каждый запрос списка
     * @default true
     */
  public readonly is_counter_enabled: boolean

  constructor(@InjectDotenv() env: Dotenv) {
    this.is_counter_enabled = env.get('FEATURE_COUNTER_ENABLED').default('true').asBoolStrict()
  }
}
