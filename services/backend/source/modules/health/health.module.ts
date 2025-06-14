import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { UptimeHealthIndicator } from './health.indicator';

@Module({
    imports: [
        TerminusModule.forRoot(),
    ],
    providers: [
        UptimeHealthIndicator,
    ],
    controllers: [
        HealthController,
    ],
})
export class HealthModule {}
