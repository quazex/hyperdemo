import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NestInterceptor,
    StreamableFile,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { catchError, Observable, tap } from 'rxjs';
import { Exception } from '../exception/app.exception';
import { LogsUtilities } from './logs.utilities';

@Injectable()
export class LogsFastifyInterceptor implements NestInterceptor {
    private readonly logger = new Logger('RequestsLogs');

    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const startRequest = Date.now();

        const request = context.switchToHttp().getRequest<FastifyRequest>();
        const reqSize = LogsUtilities.getSizeBytes(request.body);

        return next.handle().pipe(
            catchError((error) => {
                const log = {
                    label: 'hyperstat_requests',
                    url: request.originalUrl,
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    size: 0,
                    duration: Date.now() - startRequest,
                };

                if (error instanceof HttpException) {
                    const res = error.getResponse();

                    log.size = LogsUtilities.getSizeBytes(res);
                    log.status = error.getStatus();
                }

                this.logger.verbose(log);
                throw error;
            }),
            tap((payload: unknown) => {
                const reply = context.switchToHttp().getResponse<FastifyReply>();

                if (payload instanceof StreamableFile) {
                    const stream = payload.getStream();

                    let resSize = 0;

                    stream.on('end', () => {
                        this.logger.log('Handle request', {
                            url: request.originalUrl,
                            method: request.method,
                            status: reply.statusCode,
                            size: reqSize + resSize,
                            duration: Date.now() - startRequest,
                        });
                        this.logger.verbose({
                            label: 'hyperstat_requests',
                            url: request.originalUrl,
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
                    this.logger.log('Handle request', {
                        url: request.originalUrl,
                        method: request.method,
                        status: reply.statusCode,
                        size: reqSize + LogsUtilities.getSizeBytes(payload),
                        duration: Date.now() - startRequest,
                    });
                    this.logger.verbose({
                        label: 'hyperstat_requests',
                        url: request.originalUrl,
                        status: reply.statusCode,
                        size: reqSize + LogsUtilities.getSizeBytes(payload),
                        duration: Date.now() - startRequest,
                    });
                }
            }),
        );
    }
}
