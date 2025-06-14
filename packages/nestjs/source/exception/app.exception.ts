import { HttpException, HttpExceptionBody, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { ExceptionParams } from './types.exception';

export class Exception extends HttpException {
    #scope?: string;
    #context: unknown;

    constructor(params: ExceptionParams) {
        super({ message: params.message }, params.status, {
            cause: params.context,
        });
        this.#scope = params.scope;
        this.#context = params.context;
    }

    public get scope(): string | undefined {
        return this.#scope;
    }

    public set scope(value: unknown) {
        if (typeof value === 'string' && value.length > 0) {
            this.#scope = value;
        }
    }

    public get context(): unknown {
        return this.#context;
    }

    public set context(value: unknown) {
        this.#context = value;
    }

    public get meta(): unknown {
        return {
            status: this.getStatus(),
            context: structuredClone(this.#context),
            // stack: this.stack?.split('\n').map((row) => row.trim()),
        };
    }

    public static init(error: unknown, context?: unknown): Exception {
        if (error instanceof Exception) {
            return error;
        }

        if (error instanceof QueryFailedError) {
            return new Exception({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something goes wrong',
                context: {
                    message: error.message,
                    query: error.query,
                },
            });
        }

        if (error instanceof HttpException) {
            const response = error.getResponse() as HttpExceptionBody;
            const status = error.getStatus();

            if (Array.isArray(response.message)) {
                return new Exception({
                    status,
                    message: response.message.join('; '),
                    context,
                    stack: error.stack,
                });
            }
            if (typeof response.message === 'string') {
                return new Exception({
                    status,
                    message: response.message,
                    context,
                    stack: error.stack,
                });
            }
            if (typeof response === 'string') {
                return new Exception({
                    status,
                    message: response,
                    context,
                    stack: error.stack,
                });
            }
        }

        if (error instanceof Error) {
            return new Exception({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
                context,
                stack: error.stack,
            });
        }

        if (typeof error === 'string') {
            return new Exception({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                context,
                message: error,
            });
        }

        return new Exception({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            context,
            message: 'Unknown error',
        });
    }
}
