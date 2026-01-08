import { HttpException, HttpExceptionBody, HttpStatus } from '@nestjs/common'
import { AxiosError } from 'axios'
import { DatabaseError } from 'pg'
import { ErrorCode } from './error.codes'
import { TErrorPublic, TErrorParams } from './error.types'

export class AppError {
  #status: HttpStatus
  #code: string
  #message?: string
  #context?: unknown
  #stack?: string
  #details?: unknown

  constructor(params: TErrorParams) {
    this.#status = params.status ?? HttpStatus.INTERNAL_SERVER_ERROR
    this.#code = params.code ?? ErrorCode.INVALID_PARAMETERS
    this.#message = params.message
    this.#context = params.context
    this.#stack = params.stack
    this.#details = params.details
  }

  public get status(): HttpStatus {
    return this.#status
  }

  public get code(): string {
    return this.#code
  }

  public set code(value: ErrorCode) {
    this.#code = value
  }

  public get message(): string | undefined {
    return this.#message
  }

  public set message(value: string) {
    this.#message = value
  }

  public get details(): unknown {
    return structuredClone(this.#details)
  }

  public set details(value: unknown) {
    this.#details = value
  }

  public get context(): unknown {
    return structuredClone(this.#context)
  }

  public set context(value: unknown) {
    this.#context = value
  }

  public get stack(): unknown {
    return this.#stack?.split('\n').map((row) => row.trim())
  }

  public set stack(value: string) {
    this.#stack = value
  }

  public toPublic(): TErrorPublic {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    }
  }

  public static init(error: unknown): AppError {
    if (error instanceof AppError) {
      return error
    }

    if (error instanceof DatabaseError) {
      return new AppError({
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Something goes wrong',
        context: {
          message: error.message,
          query: error.internalQuery,
        },
      })
    }

    if (error instanceof AxiosError) {
      const url = new URL(`${error.request.protocol}//${error.request.host}${error.request.path}`)

      const params: TErrorParams = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        code: ErrorCode.INTERNAL_ERROR,
        context: {
          message: error.message,
          url: url.toString(),
          status: error.response?.status,
          response: error.response?.data,
        },
      }

      if (typeof error.response?.status === 'number') {
        params.status = error.response.status

        if (error.response.status === HttpStatus.BAD_REQUEST) {
          params.code = ErrorCode.INVALID_PARAMETERS
        }
        if (error.response.status === HttpStatus.UNAUTHORIZED) {
          params.code = ErrorCode.UNAUTHORIZED
        }
      }

      return new AppError(params)
    }

    if (error instanceof HttpException) {
      const response = error.getResponse() as HttpExceptionBody

      const params: TErrorParams = {
        status: error.getStatus(),
        code: ErrorCode.INVALID_PARAMETERS,
        message: undefined,
        context: error.message,
        stack: error.stack,
      }

      if (params.status === HttpStatus.BAD_REQUEST) {
        if (Array.isArray(response.message)) {
          params.message = response.message.join('; ')
        }
        if (typeof response.message === 'string') {
          params.message = response.message
        }
        if (typeof response === 'string') {
          params.message = response
        }
      }

      return new AppError(params)
    }

    if (error instanceof AggregateError) {
      return new AppError({
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Something goes wrong',
        context: error.errors.join('; '),
        stack: error.stack,
      })
    }

    if (error instanceof Error) {
      return new AppError({
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Something goes wrong',
        context: error.message,
        stack: error.stack,
      })
    }

    if (typeof error === 'string') {
      return new AppError({
        code: ErrorCode.INTERNAL_ERROR,
        message: 'Something goes wrong',
        context: error,
      })
    }

    return new AppError({
      code: ErrorCode.INTERNAL_ERROR,
      message: 'Something goes wrong',
      context: error,
    })
  }
}
