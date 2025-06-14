import { Logger } from '@nestjs/common';
import { get } from 'radash';

/* eslint-disable func-names */
export const LogsDiagnostics = function(): MethodDecorator {
    return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const name = get(target, 'constructor.name', LogsDiagnostics.name);
        const logger = get(target, 'logger', new Logger(name));

        const method = descriptor.value as (...args: unknown[]) => Promise<boolean>;

        const fn = async function(this: object, ...args: unknown[]): Promise<boolean> {
            const start = Date.now();

            const reply = await method.call(this, ...args);

            logger.verbose({
                label: 'hyperstat_diagnostics',
                provider: name,
                method: propertyKey.toString(),
                duration: Date.now() - start,
            });

            return reply;
        };

        Object.assign(descriptor, {
            value: fn,
        });

        return descriptor;
    };
};
