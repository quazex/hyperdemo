import { BrandsAnalyticsEntity } from '@domain/database'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandsAnalyticsService } from './module/business/business.handler'
import { BrandsAnalyticsRepository } from './module/integration/integration.repository'
import { BrandsAnalyticsController } from './module/transport/transport.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BrandsAnalyticsEntity,
    ]),
  ],
  providers: [
    BrandsAnalyticsRepository,
    BrandsAnalyticsService,
  ],
  controllers: [
    BrandsAnalyticsController,
  ],
})
export class BrandsAnalyticsModule {}
