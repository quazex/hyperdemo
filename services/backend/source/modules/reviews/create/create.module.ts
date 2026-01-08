import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReviewsCreateService } from './module/business/business.handler'
import { ReviewsCreateRepository } from './module/integration/integration.repository'
import { ReviewsCreateController } from './module/transport/transport.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsDataEntity,
      ReviewsDataEntity,
    ]),
  ],
  providers: [
    ReviewsCreateRepository,
    ReviewsCreateService,
  ],
  controllers: [
    ReviewsCreateController,
  ],
})
export class ReviewsCreateModule {}
