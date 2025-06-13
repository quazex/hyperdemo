/* eslint-disable @typescript-eslint/naming-convention */
import { User } from '@clerk/backend';

declare module 'fastify' {
    export interface FastifyRequest {
        user: User;
    }
}
