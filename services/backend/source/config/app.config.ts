import { Injectable } from '@nestjs/common'
import { Environment } from 'environment'
import { DateTime } from 'luxon'

@Injectable()
export class AppConfig {
  public get timezone(): string {
    return Environment.App.timezone
  }

  public get isDev(): boolean {
    return Environment.App.environment === 'development'
  }

  public get isProd(): boolean {
    return Environment.App.environment === 'production'
  }

  public get now(): DateTime {
    return DateTime.local({ zone: this.timezone })
  }
}
