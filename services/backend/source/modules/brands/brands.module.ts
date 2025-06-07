import { Module } from '@nestjs/common';
import { BrandsAnalyticsModule } from './analytics/analytics.module';

@Module({
    imports: [
        BrandsAnalyticsModule,
    ],
})
export class BrandsModule {}
