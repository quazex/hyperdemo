import { LogLevel } from '@nestjs/common';

export interface TLogsOptions {
    isProduction: boolean;
}

export interface TLogsProduction {
    level: LogLevel;
    scope?: unknown;
    message: string;
    meta: unknown;
    timestamp: string;
}
