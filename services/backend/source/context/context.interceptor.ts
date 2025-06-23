import { AsyncLocalStorage } from 'node:async_hooks';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { InjectContextStorage } from './context.decorators';
import { TContextRequest } from './context.types';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
    constructor(@InjectContextStorage() private readonly storage: AsyncLocalStorage<TContextRequest>) {}

    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const request = context.switchToHttp().getRequest<FastifyRequest>();

        const data: TContextRequest = {
            user: request.user,
        };

        return this.storage.run(data, () => next.handle());
    }
}
