/* eslint-disable @typescript-eslint/naming-convention */
import { JwtPayload } from '@clerk/types';

declare module 'fastify' {
    export interface FastifyRequest {
        user: JwtPayload;
    }
}
