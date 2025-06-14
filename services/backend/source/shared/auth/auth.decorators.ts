import { Inject } from '@nestjs/common';
import { AuthTokens } from './auth.tokens';

export const InjectAuthOptions = (): ReturnType<typeof Inject> => {
    const token = AuthTokens.getOptions();
    return Inject(token);
};

export const InjectAuthClient = (): ReturnType<typeof Inject> => {
    const token = AuthTokens.getClient();
    return Inject(token);
};
