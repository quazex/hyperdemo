import { Inject } from '@nestjs/common';
import { AuthTokens } from './auth.tokens';

export const InjectAuth = (): ReturnType<typeof Inject> => {
    const token = AuthTokens.getClient();
    return Inject(token);
};
