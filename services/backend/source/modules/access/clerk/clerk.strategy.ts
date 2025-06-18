import { User, verifyToken, ClerkClient, ClerkOptions } from '@clerk/backend';
import { Exception } from '@hyperdemo/nestjs/modules/exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FastifyRequest } from 'fastify';
import { Strategy } from 'passport-custom';
import { InjectClerkClient, InjectClerkOptions } from './clerk.decorators';

@Injectable()
export class ClerkStrategy extends PassportStrategy(Strategy, 'clerk') {
    constructor(
        @InjectClerkClient() private readonly clerkClient: ClerkClient,
        @InjectClerkOptions() private readonly clerkOptions: ClerkOptions,
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
                secretKey: this.clerkOptions.secretKey,
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
