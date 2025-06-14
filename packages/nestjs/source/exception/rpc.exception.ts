import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Exception } from './app.exception';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(RpcExceptionFilter.name);

    public catch(error: unknown, host: ArgumentsHost): Observable<unknown> {
        const context = host.switchToRpc();
        const payload = context.getData();

        const exception = Exception.init(error, payload);
        this.logger.error(exception.message, exception.meta);

        return of();
    }
}
