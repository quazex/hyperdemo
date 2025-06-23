import { AsyncLocalStorage } from 'node:async_hooks';
import { Exception } from '@hyperdemo/exceptions';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectContextStorage } from './context.decorators';
import { TContextRequest } from './context.types';

@Injectable()
export class ContextProvider {
    constructor(@InjectContextStorage() private readonly storage: AsyncLocalStorage<TContextRequest>) {}

    public getStore(): TContextRequest {
        const store = this.storage.getStore();
        if (!store) {
            throw new Exception({
                status: HttpStatus.UNAUTHORIZED,
                message: 'Unauthorized',
                context: {
                    cause: 'Context was not found',
                },
            });
        }
        return store;
    }
}
