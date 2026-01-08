import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { ClerkOptions } from '@clerk/backend'
import { TClerkOptionsFactory } from '@hyperdemo/clerk'
import { Dotenv, InjectDotenv } from '@hyperdemo/environment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ClerkConfig implements TClerkOptionsFactory {
  constructor(@InjectDotenv() private readonly env: Dotenv) {}

  public createClerkOptions(): ClerkOptions {
    const options: ClerkOptions = {
      publishableKey: this.env.get('CLERK_PUBLISHABLE_KEY').required().asString(),
      secretKey: this.env.get('CLERK_SECRET_KEY').required().asString(),
      jwtKey: undefined,
    }

    //
    // Try to load key file
    //
    const root = process.cwd()
    const path = resolve(root, 'public.pem')

    const isExists = existsSync(path)
    if (isExists) {
      options.jwtKey = readFileSync(path, 'utf8')
    }

    return options
  }
}
