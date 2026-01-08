import { JwtPayload } from '@clerk/types';

declare module 'fastify' {
  export interface FastifyRequest {
    user: JwtPayload;
  }
}
