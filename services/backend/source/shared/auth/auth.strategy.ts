import { verifyToken, ClerkOptions } from '@clerk/backend';
import { JwtPayload } from '@clerk/types';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Strategy } from 'passport-custom';
import { InjectAuthOptions } from './auth.decorators';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'clerk') {
    constructor(
        @InjectAuthOptions() private readonly clerkOptions: ClerkOptions,
    ) {
        super();
    }

    public async validate(req: FastifyRequest): Promise<NonNullable<JwtPayload>> {
        const token = req.headers.authorization?.split(' ').at(-1);

        if (!token) {
            throw new Exception({
                status: HttpStatus.UNAUTHORIZED,
                message: 'Unauthorized',
                context: {
                    cause: 'No token provided',
                },
            });
        }

        try {
            const tokenPayload = await verifyToken(token, {
                secretKey: this.clerkOptions.secretKey,
                jwtKey: this.clerkOptions.jwtKey,
            });

            return tokenPayload;
        }
        catch (error) {
            const context = error instanceof Error
                ? error.message
                : undefined;

            throw new Exception({
                status: HttpStatus.UNAUTHORIZED,
                message: 'Unauthorized',
                context,
            });
        }
    }
}
