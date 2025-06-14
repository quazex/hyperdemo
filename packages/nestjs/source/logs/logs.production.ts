import { LoggerService } from '@nestjs/common';
import { TLogsProduction } from './logs.types';

export class LogsProduction implements LoggerService {
    private print(log: TLogsProduction): void {
        const payload = JSON.stringify(log);
        process.stdout.write(payload);
        process.stdout.write('\n');
    }

    /**
     * Basic
     */
    public log(message: unknown, ...args: unknown[]): void {
        const scope = args.pop();

        this.print({
            level: 'log',
            scope,
            message: String(message),
            meta: args.at(0),
            timestamp: new Date().toISOString(),
        });
    }

    public error(message: unknown, ...args: unknown[]): void {
        const scope = args.pop();

        this.print({
            level: 'error',
            scope,
            message: String(message),
            meta: args.at(-1),
            timestamp: new Date().toISOString(),
        });
    }

    public warn(message: unknown, ...args: unknown[]): void {
        const scope = args.pop();

        this.print({
            level: 'warn',
            scope,
            message: String(message),
            meta: args.at(0),
            timestamp: new Date().toISOString(),
        });
    }

    public debug(message: unknown, ...args: unknown[]): void {
        const scope = args.pop();

        this.print({
            level: 'debug',
            scope,
            message: String(message),
            meta: args.at(0),
            timestamp: new Date().toISOString(),
        });
    }

    public fatal(message: unknown, ...args: unknown[]): void {
        const scope = args.pop();

        this.print({
            level: 'fatal',
            scope,
            message: String(message),
            meta: args.at(0),
            timestamp: new Date().toISOString(),
        });
    }

    public verbose(metrics: object): void {
        const payload = JSON.stringify({
            ...metrics,
            timestamp: Date.now(),
        });

        process.stdout.write(payload);
        process.stdout.write('\n');
    }
}
