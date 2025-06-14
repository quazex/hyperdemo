import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Exception } from './app.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    public catch(error: unknown, host: ArgumentsHost): unknown {
        const context = host.switchToHttp();

        const request = context.getRequest<FastifyRequest>();
        const response = context.getResponse<FastifyReply>();

        const exception = Exception.init(error, {
            url: request.url,
            method: request.method,
            body: request.body ?? null,
            query: request.query ?? null,
            params: request.params ?? null,
        });

        this.logger.error(exception.message, exception.meta);

        const status = exception.getStatus();
        const payload = exception.getResponse();

        return response.status(status).send(payload);
    }
}
