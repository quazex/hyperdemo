import { CategoriesAnalyticsEntity } from '@models/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesAnalyticsService } from './module/business/business.handler';
import { CategoriesAnalyticsRepository } from './module/integration/integration.repository';
import { CategoriesAnalyticsController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CategoriesAnalyticsEntity,
        ]),
    ],
    providers: [
        CategoriesAnalyticsRepository,
        CategoriesAnalyticsService,
    ],
    controllers: [
        CategoriesAnalyticsController,
    ],
})
export class CategoriesAnalyticsModule {}
