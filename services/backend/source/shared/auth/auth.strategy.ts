import { User, verifyToken, ClerkClient } from '@clerk/backend';
import { AuthConfig } from '@config';
import { Exception } from '@hyperdemo/core/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Strategy } from 'passport-custom';
import { InjectAuth } from './auth.decorators';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'clerk') {
    constructor(
        @InjectAuth() private readonly clerkClient: ClerkClient,
        private readonly authConfig: AuthConfig,
    ) {
        super();
    }

    public async validate(req: FastifyRequest): Promise<User> {
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
                secretKey: this.authConfig.secretKey,
            });

            const user = await this.clerkClient.users.getUser(tokenPayload.sub);
            return user;
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
