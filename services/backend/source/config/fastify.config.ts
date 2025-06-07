import { randomUUID } from 'crypto';
import { FastifyServerOptions } from 'fastify';

export const FastifyConfig: FastifyServerOptions = {
    genReqId: (): string => randomUUID().toString(),
};
