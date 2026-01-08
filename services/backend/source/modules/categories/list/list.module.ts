import { CategoriesStatisticsEntity } from '@domain/database'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesListService } from './module/business/business.handler'
import { CategoriesListRepository } from './module/integration/integration.repository'
import { CategoriesListController } from './module/transport/transport.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriesStatisticsEntity,
    ]),
  ],
  providers: [
    CategoriesListRepository,
    CategoriesListService,
  ],
  controllers: [
    CategoriesListController,
  ],
})
export class CategoriesListModule {}
