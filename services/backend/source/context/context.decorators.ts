import { Inject } from '@nestjs/common';
import { ContextInjections } from './context.injections';

export const InjectContextStorage = (): ReturnType<typeof Inject> => {
    const token = ContextInjections.getStorage();
    return Inject(token);
};
