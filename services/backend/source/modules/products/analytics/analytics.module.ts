import { ProductsAnalyticsEntity } from '@models/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsAnalyticsService } from './module/business/business.handler';
import { ProductsAnalyticsRepository } from './module/integration/integration.repository';
import { ProductsAnalyticsController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductsAnalyticsEntity,
        ]),
    ],
    providers: [
        ProductsAnalyticsRepository,
        ProductsAnalyticsService,
    ],
    controllers: [
        ProductsAnalyticsController,
    ],
})
export class ProductsAnalyticsModule {}
