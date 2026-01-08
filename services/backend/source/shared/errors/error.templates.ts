/* eslint-disable max-classes-per-file */
import { HttpStatus } from '@nestjs/common'
import { AppError } from './error.application'
import { ErrorCode } from './error.codes'
import { TErrorTemplate } from './error.types'

export class BadRequestError extends AppError {
  constructor(params?: TErrorTemplate) {
    super({
      status: HttpStatus.BAD_REQUEST,
      code: params?.code ?? ErrorCode.INVALID_PARAMETERS,
      details: params?.details,
      message: params?.message,
      context: params?.context,
    })
  }
}

export class UnauthorizedError extends AppError {
  constructor(params?: TErrorTemplate) {
    super({
      status: HttpStatus.UNAUTHORIZED,
      code: params?.code ?? ErrorCode.INVALID_PARAMETERS,
      message: params?.message,
      context: params?.context,
    })
  }
}

export class ForbiddenError extends AppError {
  constructor(params?: TErrorTemplate) {
    super({
      status: HttpStatus.FORBIDDEN,
      details: params?.details,
      code: params?.code ?? ErrorCode.INVALID_PARAMETERS,
      message: params?.message,
      context: params?.context,
    })
  }
}

export class NotFoundError extends AppError {
  constructor(params?: TErrorTemplate) {
    super({
      status: HttpStatus.NOT_FOUND,
      code: params?.code ?? ErrorCode.INVALID_PARAMETERS,
      message: params?.message,
      context: params?.context,
    })
  }
}

export class NotAcceptableError extends AppError {
  constructor(params?: TErrorTemplate) {
    super({
      status: HttpStatus.NOT_ACCEPTABLE,
      code: params?.code ?? ErrorCode.INVALID_PARAMETERS,
      message: params?.message,
      context: params?.context,
    })
  }
}
