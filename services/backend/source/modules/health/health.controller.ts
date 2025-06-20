import { LogsMetadata } from '@logs';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { UptimeHealthIndicator } from './health.indicator';

@LogsMetadata({
    skip: true,
})
@Controller()
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly uptime: UptimeHealthIndicator,
        private readonly database: TypeOrmHealthIndicator,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('health/readiness')
    @HealthCheck()
    public async readiness(): Promise<HealthCheckResult> {
        const result = await this.health.check([
            () => this.database.pingCheck('database'),
        ]);
        return result;
    }

    @HttpCode(HttpStatus.OK)
    @Get('health/liveness')
    @HealthCheck()
    public async liveness(): Promise<HealthCheckResult> {
        const result = await this.health.check([
            () => this.uptime.isHealthy('uptime'),
        ]);
        return result;
    }
}
