export interface ExceptionParams {
    scope?: string;
    message: string;
    status: number;
    context?: unknown;
    stack?: string;
}
