import { serialize } from 'v8';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { format } from 'bytes';
import { FastifyRequest, FastifyReply } from 'fastify';
import { Observable, tap } from 'rxjs';
import { LogsMetadata } from './requests.decorators';
import { TLogsMessage } from './requests.types';

@Injectable()
export class LogsRequestsInterceptor implements NestInterceptor {
    private readonly logger = new Logger('Requests');

    constructor(private readonly reflector: Reflector) {}

    public getSize(data: unknown): number {
        const buf = serialize(data);
        return buf.byteLength;
    }

    public print(payload: TLogsMessage): void {
        const entries = Object.entries({
            url: payload.url,
            method: payload.method,
            status: payload.status.toString(),
            size: format(payload.size),
            duration: `${payload.duration}ms`,
        });

        const pairs = entries.map((pair) => pair.join('='));
        const message = pairs.join('; ');

        this.logger.log(message);
    }

    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const startRequest = Date.now();

        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const reqSize = this.getSize(request.body);

        const metadataClass = this.reflector.get(LogsMetadata, context.getClass());
        const metadataHandler = this.reflector.get(LogsMetadata, context.getHandler());

        const skip = metadataHandler?.skip ?? metadataClass?.skip ?? false;

        return next.handle().pipe(
            tap((payload: unknown) => {
                if (skip === false) {
                    const reply = context.switchToHttp().getResponse<FastifyReply>();

                    if (payload instanceof StreamableFile) {
                        const stream = payload.getStream();

                        let resSize = 0;

                        stream.on('end', () => {
                            this.print({
                                url: request.originalUrl,
                                method: request.method,
                                status: reply.statusCode,
                                size: reqSize + resSize,
                                duration: Date.now() - startRequest,
                            });
                        });

                        stream.on('error', (error) => {
                            const exception = Exception.init(error);
                            this.logger.error(exception.message, exception.meta);
                        });

                        stream.on('data', (chunk) => {
                            if (Buffer.isBuffer(chunk)) {
                                resSize += chunk.byteLength;
                            }
                        });
                    }
                    else {
                        this.print({
                            url: request.originalUrl,
                            method: request.method,
                            status: reply.statusCode,
                            size: reqSize + this.getSize(payload),
                            duration: Date.now() - startRequest,
                        });
                    }
                }
            }),
        );
    }
}
