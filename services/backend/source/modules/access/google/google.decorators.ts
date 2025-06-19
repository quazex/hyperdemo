import { Inject } from '@nestjs/common';
import { GoogleTokens } from './google.tokens';

export const InjectGoogleOptions = (): ReturnType<typeof Inject> => {
    const token = GoogleTokens.getOptions();
    return Inject(token);
};

export const InjectGoogleClient = (): ReturnType<typeof Inject> => {
    const token = GoogleTokens.getClient();
    return Inject(token);
};
