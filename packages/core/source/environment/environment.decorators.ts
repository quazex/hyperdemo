import { Inject } from '@nestjs/common';
import { EnvironmentTokens } from './environment.tokens';

export const InjectDotenv = (): ReturnType<typeof Inject> => {
    const token = EnvironmentTokens.getDotenv();
    return Inject(token);
};
