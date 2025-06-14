import { Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';

@Injectable()
export class UptimeHealthIndicator {
    constructor(private readonly service: HealthIndicatorService) {}

    public isHealthy(key: string) {
        const indicator = this.service.check(key);

        const uptime = process.uptime();
        const isHealthy = uptime > 0;

        if (!isHealthy) {
            return indicator.down({ uptime });
        }

        return indicator.up();
    }
}
