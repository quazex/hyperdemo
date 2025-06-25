import { ProductsDataEntity, ReviewsDataEntity } from '@domain/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsListService } from './module/business/business.handler';
import { ReviewsListRepository } from './module/integration/integration.repository';
import { ReviewsListController } from './module/transport/transport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductsDataEntity,
            ReviewsDataEntity,
        ]),
    ],
    providers: [
        ReviewsListRepository,
        ReviewsListService,
    ],
    controllers: [
        ReviewsListController,
    ],
})
export class ReviewsListModule {}
