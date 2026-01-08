import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'
import { AppError } from './error.application'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  public toObj(val: unknown): unknown {
    if (typeof val === 'object' && val !== null) {
      const keys = Object.keys(val)
      if (keys.length > 0) {
        return structuredClone(val)
      }
    }
    return undefined
  }

  public catch(error: unknown, host: ArgumentsHost): unknown {
    const context = host.switchToHttp()

    const FastifyRequest = context.getRequest<FastifyRequest>()
    const FastifyReply = context.getResponse<FastifyReply>()

    const exception = AppError.init(error)

    this.logger.error({
      code: exception.code,
      text: exception.message,
      url: FastifyRequest.url,
      method: FastifyRequest.method,
      body: this.toObj(FastifyRequest.body),
      query: this.toObj(FastifyRequest.query),
      params: this.toObj(FastifyRequest.params),
      context: exception.context,
    })

    return FastifyReply
      .status(exception.status)
      .send({
        error: exception.toPublic(),
      })
  }
}
