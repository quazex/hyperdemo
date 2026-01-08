import { Inject } from '@nestjs/common'
import { ClerkInjections } from './clerk.injections'

export const InjectClerkOptions = (): ReturnType<typeof Inject> => {
  const token = ClerkInjections.getOptions()
  return Inject(token)
}

export const InjectClerkClient = (): ReturnType<typeof Inject> => {
  const token = ClerkInjections.getClient()
  return Inject(token)
}
