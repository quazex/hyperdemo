import { HttpStatus } from '@nestjs/common'

export interface TErrorParams {
  status?: HttpStatus
  code?: string
  message?: string
  context?: unknown
  stack?: string
  details?: unknown
}

export interface TErrorTemplate {
  code?: string
  message?: string
  context?: unknown
  details?: unknown
}

export interface TErrorPublic {
  code: string
  details?: unknown
  message?: string
}
