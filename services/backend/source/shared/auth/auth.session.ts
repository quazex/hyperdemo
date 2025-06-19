import { JwtPayload } from '@clerk/types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const Session = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): NonNullable<JwtPayload> => {
        const request = ctx.switchToHttp().getRequest<FastifyRequest>();
        return request.user;
    },
);
