import { Inject } from '@nestjs/common';
import { ClerkTokens } from './clerk.tokens';

export const InjectClerkOptions = (): ReturnType<typeof Inject> => {
    const token = ClerkTokens.getOptions();
    return Inject(token);
};

export const InjectClerkClient = (): ReturnType<typeof Inject> => {
    const token = ClerkTokens.getClient();
    return Inject(token);
};
