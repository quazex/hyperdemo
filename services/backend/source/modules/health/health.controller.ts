import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { UptimeHealthIndicator } from './health.indicator';

@Controller()
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly uptime: UptimeHealthIndicator,
        private readonly database: TypeOrmHealthIndicator,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Get('health')
    @HealthCheck()
    public async check(): Promise<HealthCheckResult> {
        const result = await this.health.check([
            () => this.uptime.isHealthy('uptime'),
            () => this.database.pingCheck('database'),
        ]);
        return result;
    }
}
