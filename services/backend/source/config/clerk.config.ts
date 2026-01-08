import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { ClerkOptions } from '@clerk/backend'
import { Injectable } from '@nestjs/common'
import { TClerkOptionsFactory } from '@shared/clerk'
import { Environment } from 'environment'

@Injectable()
export class ClerkConfig implements TClerkOptionsFactory {
  public createClerkOptions(): ClerkOptions {
    const options: ClerkOptions = {
      publishableKey: Environment.Clerk.publishableKey,
      secretKey: Environment.Clerk.secretKey,
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
