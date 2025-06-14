import { ConsoleLogger } from '@nestjs/common';
import { LogsUtilities } from './logs.utilities';

export class LogsDevelopment extends ConsoleLogger {
    public log(message: unknown, ...context: unknown[]): void {
        const scope = context.pop();
        const meta = context.map((doc) => LogsUtilities.stringify(doc));

        let msg = String(message);
        if (meta.length > 0) {
            msg = msg.concat(': ', meta.join('; '));
        }

        super.log(msg, scope);
    }

    public error(message: unknown, ...context: unknown[]): void {
        const scope = context.pop();
        const meta = context.map((doc) => LogsUtilities.stringify(doc));

        let msg = String(message);
        if (meta.length > 0) {
            msg = msg.concat(': ', meta.join('; '));
        }

        super.error(msg, scope);
    }

    public warn(message: unknown, ...context: unknown[]): void {
        const scope = context.pop();
        const meta = context.map((doc) => LogsUtilities.stringify(doc));

        let msg = String(message);
        if (meta.length > 0) {
            msg = msg.concat(': ', meta.join('; '));
        }

        super.warn(msg, scope);
    }

    public debug(message: unknown, ...context: unknown[]): void {
        const scope = context.pop();
        const meta = context.map((doc) => LogsUtilities.stringify(doc));

        let msg = String(message);
        if (meta.length > 0) {
            msg = msg.concat(': ', meta.join('; '));
        }

        super.debug(msg, scope);
    }

    public fatal(message: unknown, ...context: unknown[]): void {
        const scope = context.pop();
        const meta = context.map((doc) => LogsUtilities.stringify(doc));

        let msg = String(message);
        if (meta.length > 0) {
            msg = msg.concat(': ', meta.join('; '));
        }

        super.fatal(msg, scope);
    }

    public verbose(metrics: object, ...context: unknown[]): void {
        const scope = context.pop();

        const msg = LogsUtilities.stringify({
            ...metrics,
            timestamp: Date.now(),
        });

        super.verbose(msg, scope);
    }
}
